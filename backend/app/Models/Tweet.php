<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Tweet extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'content',
        'likes_count'
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the user that owns the tweet.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the likes for the tweet.
     */
    public function likes(): HasMany
    {
        return $this->hasMany(TweetLike::class);
    }

    /**
     * Check if a user has liked this tweet.
     */
    public function isLikedBy($userId): bool
    {
        return $this->likes()->where('user_id', $userId)->exists();
    }

    /**
     * Scope to get tweets with user information.
     */
    public function scopeWithUser($query)
    {
        return $query->with('user:id,name,email');
    }

    /**
     * Scope to get tweets ordered by creation date (newest first).
     */
    public function scopeLatest($query)
    {
        return $query->orderBy('created_at', 'desc');
    }
}
