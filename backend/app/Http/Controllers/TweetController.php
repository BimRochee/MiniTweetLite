<?php

namespace App\Http\Controllers;

use App\Models\Tweet;
use App\Models\TweetLike;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class TweetController extends Controller
{
    /**
     * Get all tweets with user information and like status
     */
    public function index(Request $request): JsonResponse
    {
        $tweets = Tweet::withUser()
            ->latest()
            ->paginate(10);

        // Add like status for authenticated user
        if (Auth::check()) {
            $tweets->getCollection()->transform(function ($tweet) {
                $tweet->is_liked = $tweet->isLikedBy(Auth::id());
                return $tweet;
            });
        }

        return response()->json([
            'success' => true,
            'tweets' => $tweets->items(),
            'pagination' => [
                'current_page' => $tweets->currentPage(),
                'last_page' => $tweets->lastPage(),
                'per_page' => $tweets->perPage(),
                'total' => $tweets->total(),
            ]
        ]);
    }

    /**
     * Create a new tweet
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'content' => 'required|string|max:280|min:1',
        ]);

        $tweet = Tweet::create([
            'user_id' => Auth::id(),
            'content' => $request->content,
        ]);

        $tweet->load('user:id,name,email');

        return response()->json([
            'success' => true,
            'message' => 'Tweet created successfully',
            'tweet' => $tweet
        ], 201);
    }

    /**
     * Like or unlike a tweet
     */
    public function toggleLike(Request $request, Tweet $tweet): JsonResponse
    {
        $user = Auth::user();
        $existingLike = TweetLike::where('user_id', $user->id)
            ->where('tweet_id', $tweet->id)
            ->first();

        DB::transaction(function () use ($existingLike, $user, $tweet) {
            if ($existingLike) {
                // Unlike the tweet
                $existingLike->delete();
                $tweet->decrement('likes_count');
            } else {
                // Like the tweet
                TweetLike::create([
                    'user_id' => $user->id,
                    'tweet_id' => $tweet->id,
                ]);
                $tweet->increment('likes_count');
            }
        });

        // Refresh the tweet to get updated likes count
        $tweet->refresh();

        return response()->json([
            'success' => true,
            'message' => $existingLike ? 'Tweet unliked successfully' : 'Tweet liked successfully',
            'tweet' => [
                'id' => $tweet->id,
                'likes_count' => $tweet->likes_count,
                'is_liked' => !$existingLike
            ]
        ]);
    }

    /**
     * Get a specific tweet with user information
     */
    public function show(Tweet $tweet): JsonResponse
    {
        $tweet->load('user:id,name,email');

        // Add like status for authenticated user
        if (Auth::check()) {
            $tweet->is_liked = $tweet->isLikedBy(Auth::id());
        }

        return response()->json([
            'success' => true,
            'tweet' => $tweet
        ]);
    }

    /**
     * Delete a tweet (only by the author)
     */
    public function destroy(Tweet $tweet): JsonResponse
    {
        if ($tweet->user_id !== Auth::id()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized to delete this tweet'
            ], 403);
        }

        $tweet->delete();

        return response()->json([
            'success' => true,
            'message' => 'Tweet deleted successfully'
        ]);
    }
}
