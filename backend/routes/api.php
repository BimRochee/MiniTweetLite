<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TweetController;

// Public authentication routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/refresh', [AuthController::class, 'refresh']);

    // Tweet routes
    Route::get('/tweets', [TweetController::class, 'index']);
    Route::post('/tweets', [TweetController::class, 'store']);
    Route::get('/tweets/{tweet}', [TweetController::class, 'show']);
    Route::delete('/tweets/{tweet}', [TweetController::class, 'destroy']);
    Route::post('/tweets/{tweet}/like', [TweetController::class, 'toggleLike']);
});
