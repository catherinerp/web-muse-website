import React, { useState } from 'react';
import './index.css';

function App() {
  const [prompt, setPrompt] = useState('');
  const [palette, setPalette] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [popover, setPopover] = useState(null);
  const [copyMessage, setCopyMessage] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [progress, setProgress] = useState(0);

  const defaultColors = {
    background: '#F3F4F6',
    primary: '#4F46E5',
    text: '#333333',
    buttonBg: '#6366F1',
    buttonHover: '#4C51BF',
  };

  const handleGeneratePalette = async () => {
    if (loading) return;

    console.log('Generating palette with prompt:', prompt);
    setLoading(true);
    setError('');
    setPalette([]);
    setStatusMessage('Generating your color palette...');
    setProgress(25);

    try {
      const response = await fetch('http://localhost:8000/api/generate-palette', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      console.log('Response status:', response.status);
      setProgress(50);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response data:', data);
      setProgress(75);

      if (data && data.palette) {
        const convertedPalette = data.palette.map(color => `rgb(${color.join(', ')})`);
        console.log('Converted palette:', convertedPalette);
        setPalette(convertedPalette);
        setStatusMessage('Palette generated successfully!');
      } else {
        throw new Error(data.error || 'Unexpected response format');
      }
    } catch (error) {
      console.error('Error:', error);
      setError(error.message || 'An error occurred while generating the palette');
      setStatusMessage('Error generating palette. Try again.');
    } finally {
      setLoading(false);
      setProgress(100);
      setTimeout(() => setProgress(0), 500);
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
      {/* Conditionally render the top navigation bar when palette is available */}
      {palette.length > 0 && (
        <div className="w-full bg-gray-800 text-white p-4">
          <div className="flex justify-between items-center max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold">WebMuse</h1>
            <div className="flex space-x-2">
              {palette.map((color, index) => (
                <div
                  key={index}
                  className="w-8 h-8 rounded-full"
                  style={{ backgroundColor: color }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Conditionally render the Lorem Ipsum body text when palette is available */}
      {palette.length > 0 && (
        <div className="mt-8 text-center text-gray-700 max-w-3xl px-4">
          <p className="text-lg mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet accumsan arcu. Vivamus sit amet sagittis purus. Integer sit amet laoreet turpis. Phasellus euismod vitae nunc vel ullamcorper. Nullam ullamcorper nisi at velit vehicula, vel vestibulum nisi malesuada. Integer non neque eget velit cursus dignissim. Nam posuere magna eu eros efficitur, ut maximus felis aliquam. Integer sit amet pretium magna. Aliquam erat volutpat. Cras ultricies urna et turpis aliquet, id tincidunt felis aliquet.
          </p>
        </div>
      )}
      <h1 className="text-4xl font-bold text-indigo-600 mb-6">WebMuse</h1>
      {/* Prompt Input */}
      <div className="flex items-center bg-white border border-gray-300 rounded-lg shadow-sm w-full max-w-md mt-6">
        <input
          type="text"
          placeholder="Type your prompt here..."
          className="flex-1 p-3 focus:outline-none focus:ring focus:ring-violet-200 rounded-l-lg"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={loading}
        />
        <button
          className={`px-4 py-3 font-bold text-white rounded-r-lg flex items-center justify-center ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          style={{
            backgroundColor: defaultColors.buttonBg,
            hover: { backgroundColor: defaultColors.buttonHover }
          }}
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

      {/* Error or Palette Display */}
      {progress > 0 && (
        <div className="w-full max-w-md mt-4 bg-gray-200 rounded-full h-2.5">
          <div
            className="h-2.5 rounded-full bg-violet-400 transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}

      {/* Status Message */}
      {statusMessage && (
        <p className="mt-2 text-gray-700 font-semibold">{statusMessage}</p>
      )}

      <div className="mt-6 w-full max-w-md">
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg shadow-sm">
            <p>{error}</p>
          </div>
        )}

        {/*Generated Colour Palette */}
        {palette.length > 0 && (
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="text-lg font-bold text-gray-700">Generated Colour Palette:</h2>
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
