import React, { useState } from 'react';
import { createTweet } from '../api/tweets.js';
import { useAuth } from '../contexts/AuthContext.jsx';

const TweetForm = ({ onTweetCreated }) => {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!content.trim()) {
      setError('Please enter some content for your tweet.');
      return;
    }

    if (content.length > 280) {
      setError('Tweet must be 280 characters or less.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await createTweet(content.trim());
      
      if (response.success) {
        setContent('');
        if (onTweetCreated) {
          onTweetCreated(response.tweet);
        }
      } else {
        setError(response.message || 'Failed to create tweet.');
      }
    } catch (error) {
      console.error('Error creating tweet:', error);
      setError('Failed to create tweet. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setContent(e.target.value);
    if (error) {
      setError('');
    }
  };

  const getCharacterColor = () => {
    const remaining = 280 - content.length;
    if (remaining < 20) return 'text-red-500';
    if (remaining < 50) return 'text-yellow-500';
    return 'text-gray-400';
  };

  return (
    <div 
      className="bg-white p-4 w-full max-w-4xl mx-auto"
      style={{
        minHeight: '210px'
      }}
    >
      {/* Inner Container */}
      <div 
        className="w-full"
        style={{
          minHeight: '162px',
          position: 'relative'
        }}
      >
        <form onSubmit={handleSubmit}>
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Avatar */}
          <div 
            style={{
              position: 'absolute',
              top: '0px',
              left: '0px',
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
               {user?.name ? user.name[0].toUpperCase() : 'U'}
             </span>
          </div>

          {/* Input Field */}
          <textarea
            value={content}
            onChange={handleInputChange}
            placeholder="What's happening?"
            className="border-0 resize-none focus:outline-none focus:ring-0 text-gray-900 placeholder-gray-500 w-full"
            style={{
              position: 'absolute',
              top: '0px',
              left: '52px',
              right: '120px',
              minHeight: '104px',
              borderRadius: '8px',
              background: '#12141917',
              padding: '12px'
            }}
            maxLength={280}
            disabled={isLoading}
          />

          {/* Character Count */}
          <div 
            className={`text-sm ${getCharacterColor()}`}
            style={{
              position: 'absolute',
              bottom: '21px',
              left: '52px'
            }}
          >
            {280 - content.length} characters remaining
          </div>
          
          {/* Tweet Button */}
          <button
            type="submit"
            disabled={isLoading || !content.trim() || content.length > 280}
            style={{
              position: 'absolute',
              bottom: '0px',
              right: '0px',
              width: '101.99433898925781px',
              height: '37.000267028808594px',
              paddingTop: '8px',
              paddingRight: '16px',
              paddingBottom: '8px',
              paddingLeft: '12px',
              gap: '8px',
              borderRadius: '8px',
              background: '#121419',
              color: '#FFFFFF',
              border: 'none',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background-color 0.2s ease'
            }}
            onMouseEnter={(e) => !e.target.disabled && (e.target.style.background = '#000000')}
            onMouseLeave={(e) => !e.target.disabled && (e.target.style.background = '#121419')}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                Posting...
              </>
            ) : (
              <>
                {/* Tweet Icon - Airplane/Send */}
                <svg 
                  width="20.994342803955078" 
                  height="21.000267028808594" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="#FFFFFF" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  style={{ marginRight: '8px' }}
                >
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22,2 15,22 11,13 2,9 22,2"/>
                </svg>
                Tweet
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TweetForm;
