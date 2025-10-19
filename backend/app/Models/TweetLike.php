<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TweetLike extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'tweet_id'
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the user that liked the tweet.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the tweet that was liked.
     */
    public function tweet(): BelongsTo
    {
        return $this->belongsTo(Tweet::class);
    }
}
