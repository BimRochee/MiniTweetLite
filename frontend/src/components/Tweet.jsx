import React, { useState } from 'react';
import { toggleLike } from '../api/tweets.js';
import { useAuth } from '../contexts/AuthContext.jsx';

const Tweet = ({ tweet, onTweetUpdated }) => {
  const [isLiked, setIsLiked] = useState(tweet.is_liked || false);
  const [likesCount, setLikesCount] = useState(tweet.likes_count || 0);
  const [isLoading, setIsLoading] = useState(false);

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


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) {
      return `${diffInSeconds}s ago`;
    } else if (diffInSeconds < 3600) {
      return `${Math.floor(diffInSeconds / 60)}m ago`;
    } else if (diffInSeconds < 86400) {
      return `${Math.floor(diffInSeconds / 3600)}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };


  return (
    <div 
      className="bg-white hover:bg-gray-50 transition-colors w-full"
      style={{
        minHeight: '172px',
        padding: '16px'
      }}
    >
      {/* Inner Container */}
      <div 
        className="w-full"
        style={{
          minHeight: '124px',
          position: 'relative'
        }}
      >
        <div className="flex space-x-3">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div 
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '20px',
                backgroundColor: '#3B82F6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <span style={{ color: '#FFFFFF', fontWeight: '600', fontSize: '16px' }}>
                {tweet.user?.name?.charAt(0)?.toUpperCase() || '?'}
              </span>
            </div>
          </div>

          {/* Tweet Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <h3 
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: '600',
                    fontSize: '13px',
                    lineHeight: '16px',
                    letterSpacing: '-0.5%',
                    color: '#111827'
                  }}
                >
                  {tweet.user?.name || 'Unknown User'}
                </h3>
                <span className="text-sm text-gray-500">
                  {formatDate(tweet.created_at)}
                </span>
              </div>
              
            </div>
          </div>
        </div>

        {/* Tweet Text */}
        <div className="mt-3 ml-[4px] pr-4">
          <p className="text-gray-900 text-sm leading-relaxed break-words">
            {tweet.content}
          </p>
        </div>

        {/* Tweet Actions */}
        <div className="mt-3 ml-[4px] flex items-center space-x-6">
          {/* Like Button */}
          <button
            onClick={handleLike}
            disabled={isLoading}
            className={`flex items-center space-x-1 text-sm font-medium transition-colors disabled:opacity-50 ${
              isLiked 
                ? 'text-red-600 hover:text-red-700' 
                : 'text-gray-500 hover:text-red-600'
            }`}
            style={{
              width: '24px',
              height: '24px',
              backgroundColor: 'transparent',
              border: 'none',
              padding: '0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent"></div>
            ) : (
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill={isLiked ? "red" : "white"} 
                stroke={isLiked ? "red" : "black"} 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
              </svg>
            )}
            <span 
              style={{
                color: '#1B2328',
                fontFamily: 'Inter, sans-serif',
                fontWeight: '500',
                fontSize: '15px',
                lineHeight: '20px',
                letterSpacing: '0%'
              }}
            >
              {likesCount}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
