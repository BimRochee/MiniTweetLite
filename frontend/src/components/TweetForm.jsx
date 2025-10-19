import React, { useState } from 'react';
import { createTweet } from '../api/tweets.js';

const TweetForm = ({ onTweetCreated }) => {
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
    <div className="bg-white border-b border-gray-200 p-4">
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Tweet Input */}
        <div className="flex space-x-3">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">U</span>
            </div>
          </div>

          {/* Input Field */}
          <div className="flex-1">
            <textarea
              value={content}
              onChange={handleInputChange}
              placeholder="What's happening?"
              className="w-full p-3 border-0 resize-none focus:outline-none focus:ring-0 text-gray-900 placeholder-gray-500"
              rows={3}
              maxLength={280}
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Character Count and Submit Button */}
        <div className="flex justify-between items-center">
          <div className={`text-sm ${getCharacterColor()}`}>
            {280 - content.length} characters remaining
          </div>
          
          <button
            type="submit"
            disabled={isLoading || !content.trim() || content.length > 280}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-2 rounded-full text-sm font-semibold transition-colors"
          >
            {isLoading ? 'Posting...' : 'Tweet'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TweetForm;
