import React, { useState } from 'react';
import './index.css';

function App() {
  const [prompt, setPrompt] = useState('');
  const [palette, setPalette] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [popover, setPopover] = useState(null);
  const [copyMessage, setCopyMessage] = useState('');

  const handleGeneratePalette = async () => {
    if (loading) return;

    setLoading(true);
    setError('');
    setPalette([]);

    try {
      const response = await fetch('http://localhost:8000/api/generate-palette', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (data.palette) {
        setPalette(data.palette);
      } else {
        setError(data.error || 'Unexpected response format');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while generating the palette');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyToClipboard = (colour) => {
    navigator.clipboard.writeText(colour).then(() => {
      setCopyMessage('Copied!');
    });
  };

  const handleMouseEnter = (colour) => {
    setPopover(colour);
    setCopyMessage('');
  };

  const handleMouseLeave = () => {
    setPopover(null);
    setCopyMessage('');
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-indigo-600 mb-6">WebMuse</h1>

      <div className="flex items-center bg-white border border-gray-300 rounded-lg shadow-sm w-full max-w-md">
        <input
          type="text"
          placeholder="Type your prompt here..."
          className="flex-1 p-3 focus:outline-none focus:ring focus:ring-indigo-200 rounded-l-lg"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={loading}
        />
        <button
          className={`px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-r-lg flex items-center justify-center ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={handleGeneratePalette}
          disabled={loading}
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            'Generate'
          )}
        </button>
      </div>

      <div className="mt-6 w-full max-w-md">
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg shadow-sm">
            <p>{error}</p>
          </div>
        )}

        {palette.length > 0 && (
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="text-lg font-bold text-gray-700">Generated colour Palette:</h2>
            <div className="mt-2 flex">
              {palette.map((colour, index) => (
                <div
                  key={index}
                  className="w-12 h-12 relative cursor-pointer"
                  style={{ backgroundColor: colour }}
                  onClick={() => handleCopyToClipboard(colour)}
                  onMouseEnter={() => handleMouseEnter(colour)}
                  onMouseLeave={handleMouseLeave}
                >
                  {popover === colour && (
                    <div
                      className="absolute z-10 inline-block w-32 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-100"
                      style={{ top: '-35px', left: '50%', transform: 'translateX(-50%)' }}
                    >
                      <div className="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg">
                        <h3 className="font-semibold text-gray-900">
                          {copyMessage || colour}
                        </h3>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
