import api from './api.js';

// Get all tweets
export const getTweets = async (page = 1) => {
  const response = await api.get(`/tweets?page=${page}`);
  return response.data;
};

// Create a new tweet
export const createTweet = async (content) => {
  const response = await api.post('/tweets', { content });
  return response.data;
};

// Get a specific tweet
export const getTweet = async (id) => {
  const response = await api.get(`/tweets/${id}`);
  return response.data;
};

// Like or unlike a tweet
export const toggleLike = async (tweetId) => {
  const response = await api.post(`/tweets/${tweetId}/like`);
  return response.data;
};

// Delete a tweet
export const deleteTweet = async (tweetId) => {
  const response = await api.delete(`/tweets/${tweetId}`);
  return response.data;
};
