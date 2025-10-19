import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import api from './api/api.js'

function App() {
  const [count, setCount] = useState(0)
  const [apiStatus, setApiStatus] = useState('Not tested')

  const testAPI = async () => {
    try {
      const response = await api.get('/');
      setApiStatus('API connected successfully!');
      console.log('API Response:', response.data);
    } catch (error) {
      setApiStatus('API connection failed: ' + error.message);
      console.error('API Error:', error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="flex space-x-4 mb-8">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo hover:opacity-80 transition-opacity" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react hover:opacity-80 transition-opacity" alt="React logo" />
        </a>
      </div>
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Vite + React + Tailwind</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <button 
          onClick={() => setCount((count) => count + 1)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors mr-4"
        >
          count is {count}
        </button>
        <button 
          onClick={testAPI}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition-colors"
        >
          Test API Connection
        </button>
        <p className="mt-4 text-gray-600">
          API Status: <span className="font-semibold">{apiStatus}</span>
        </p>
        <p className="mt-2 text-gray-600">
          Edit <code className="bg-gray-100 px-2 py-1 rounded">src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="mt-8 text-gray-500">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
