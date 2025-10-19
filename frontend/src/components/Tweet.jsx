import React, { useState } from 'react';
import { toggleLike, deleteTweet } from '../api/tweets.js';
import { useAuth } from '../contexts/AuthContext.jsx';

const Tweet = ({ tweet, onTweetDeleted, onTweetUpdated }) => {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(tweet.is_liked || false);
  const [likesCount, setLikesCount] = useState(tweet.likes_count || 0);
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleLike = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      const response = await toggleLike(tweet.id);
      setIsLiked(response.tweet.is_liked);
      setLikesCount(response.tweet.likes_count);
      
      if (onTweetUpdated) {
        onTweetUpdated(tweet.id, response.tweet);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      await deleteTweet(tweet.id);
      if (onTweetDeleted) {
        onTweetDeleted(tweet.id);
      }
    } catch (error) {
      console.error('Error deleting tweet:', error);
    } finally {
      setIsLoading(false);
      setShowDeleteConfirm(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) {
      return `${diffInSeconds}s`;
    } else if (diffInSeconds < 3600) {
      return `${Math.floor(diffInSeconds / 60)}m`;
    } else if (diffInSeconds < 86400) {
      return `${Math.floor(diffInSeconds / 3600)}h`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const isOwner = user?.id === tweet.user_id;

  return (
    <div className="bg-white border-b border-gray-200 p-4 hover:bg-gray-50 transition-colors">
      <div className="flex space-x-3">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">
              {tweet.user?.name?.charAt(0)?.toUpperCase() || '?'}
            </span>
          </div>
        </div>

        {/* Tweet Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <h3 className="text-sm font-semibold text-gray-900">
                {tweet.user?.name || 'Unknown User'}
              </h3>
              <span className="text-sm text-gray-500">
                @{tweet.user?.email?.split('@')[0] || 'unknown'}
              </span>
              <span className="text-sm text-gray-500">·</span>
              <span className="text-sm text-gray-500">
                {formatDate(tweet.created_at)}
              </span>
            </div>
            
            {/* Delete button for tweet owner */}
            {isOwner && (
              <div className="flex items-center space-x-2">
                {showDeleteConfirm ? (
                  <>
                    <button
                      onClick={handleDelete}
                      disabled={isLoading}
                      className="text-red-600 hover:text-red-700 text-sm font-medium disabled:opacity-50"
                    >
                      {isLoading ? 'Deleting...' : 'Confirm'}
                    </button>
                    <button
                      onClick={() => setShowDeleteConfirm(false)}
                      className="text-gray-500 hover:text-gray-700 text-sm font-medium"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="text-gray-400 hover:text-red-600 text-sm"
                    title="Delete tweet"
                  >
                    🗑️
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Tweet Text */}
          <div className="mt-1">
            <p className="text-gray-900 text-sm leading-relaxed">
              {tweet.content}
            </p>
          </div>

          {/* Tweet Actions */}
          <div className="mt-3 flex items-center space-x-6">
            {/* Like Button */}
            <button
              onClick={handleLike}
              disabled={isLoading}
              className={`flex items-center space-x-1 text-sm font-medium transition-colors disabled:opacity-50 ${
                isLiked 
                  ? 'text-red-600 hover:text-red-700' 
                  : 'text-gray-500 hover:text-red-600'
              }`}
            >
              <span className="text-base">
                {isLiked ? '❤️' : '🤍'}
              </span>
              <span>{likesCount}</span>
            </button>

            {/* Reply Button (placeholder) */}
            <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 text-sm font-medium transition-colors">
              <span className="text-base">💬</span>
              <span>Reply</span>
            </button>

            {/* Share Button (placeholder) */}
            <button className="flex items-center space-x-1 text-gray-500 hover:text-green-600 text-sm font-medium transition-colors">
              <span className="text-base">📤</span>
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
