import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { getTweets } from '../api/tweets.js';
import TweetForm from './TweetForm.jsx';
import Tweet from './Tweet.jsx';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const handleLogout = async () => {
    setLogoutLoading(true);
    await logout();
    setLogoutLoading(false);
  };

  const loadTweets = async (page = 1, append = false) => {
    try {
      setError('');
      const response = await getTweets(page);
      
      if (response.success) {
        const newTweets = response.tweets;
        if (append) {
          setTweets(prev => [...prev, ...newTweets]);
        } else {
          setTweets(newTweets);
        }
        
        setCurrentPage(page);
        setHasMore(page < response.pagination.last_page);
      } else {
        setError('Failed to load tweets');
      }
    } catch (error) {
      console.error('Error loading tweets:', error);
      setError('Failed to load tweets. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTweetCreated = (newTweet) => {
    setTweets(prev => [newTweet, ...prev]);
  };


  const handleTweetUpdated = (tweetId, updatedTweet) => {
    setTweets(prev => 
      prev.map(tweet => 
        tweet.id === tweetId 
          ? { ...tweet, ...updatedTweet }
          : tweet
      )
    );
  };

  const loadMoreTweets = () => {
    if (!loading && hasMore) {
      loadTweets(currentPage + 1, true);
    }
  };

  useEffect(() => {
    loadTweets();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Logout Loading Modal */}
      {logoutLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-2 border-gray-300 border-t-black mb-4"></div>
            <p className="text-black font-medium">Logging out...</p>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className="flex items-center justify-between"
            style={{
              height: '64px'
            }}
          >
          <div className="flex items-center">
            <h1 
              style={{
                width: '123px',
                height: '17px',
                fontFamily: 'Poppins, sans-serif',
                fontWeight: '700',
                fontSize: '24px',
                lineHeight: '100%',
                letterSpacing: '-2%',
                color: '#121419'
              }}
            >
              MiniTweet
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            {/* User Profile Image */}
            <div 
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '18px',
                backgroundColor: '#E5E7EB',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#6B7280',
                fontSize: '16px',
                fontWeight: '600'
              }}
            >
              {user?.name ? user.name[0].toUpperCase() : 'U'}
            </div>
            
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              disabled={logoutLoading}
              style={{
                width: '112px',
                height: '40px',
                paddingTop: '8px',
                paddingRight: '16px',
                paddingBottom: '8px',
                paddingLeft: '12px',
                gap: '8px',
                borderRadius: '8px',
                backgroundColor: 'transparent',
                color: '#121419',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '15px',
                fontWeight: '500',
                lineHeight: '20px',
                letterSpacing: '0%',
                cursor: logoutLoading ? 'not-allowed' : 'pointer',
                transition: 'color 0.2s ease',
                opacity: logoutLoading ? '0.6' : '1'
              }}
              onMouseEnter={(e) => !logoutLoading && (e.target.style.color = '#EF4444')}
              onMouseLeave={(e) => !logoutLoading && (e.target.style.color = '#121419')}
            >
              {/* Logout Icon */}
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                style={{ marginRight: '8px' }}
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16,17 21,12 16,7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Logout
            </button>
          </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tweet Form */}
        <TweetForm onTweetCreated={handleTweetCreated} />

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 p-4 m-4 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
            <button
              onClick={() => loadTweets()}
              className="mt-2 text-sm text-red-600 hover:text-red-700 underline"
            >
              Try again
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading && tweets.length === 0 && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-black"></div>
            <span className="ml-2 text-black font-medium">Loading tweets...</span>
          </div>
        )}

        {/* Tweets Feed */}
        <div className="bg-white">
          {tweets.length === 0 && !loading && !error && (
            <div className="p-8 text-center">
              <p className="text-gray-500 text-lg">No tweets yet!</p>
              <p className="text-gray-400 text-sm mt-2">Be the first to share something!</p>
            </div>
          )}

                  {tweets.map((tweet) => (
                    <Tweet
                      key={tweet.id}
                      tweet={tweet}
                      onTweetUpdated={handleTweetUpdated}
                    />
                  ))}

              {/* Load More Button */}
              {hasMore && tweets.length > 0 && (
                <div className="p-4 text-center">
                  <button
                    onClick={loadMoreTweets}
                    disabled={loading}
                    className="bg-black hover:bg-gray-800 disabled:bg-gray-400 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors flex items-center justify-center mx-auto"
                    style={{ minWidth: '120px' }}
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                        Loading...
                      </>
                    ) : (
                      'Load More'
                    )}
                  </button>
                </div>
              )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
