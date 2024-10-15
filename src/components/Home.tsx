import React, { useState, useEffect } from 'react';
import { Zap, LogOut, Search, History, Sparkles, Image as ImageIcon, Video as VideoIcon, X } from 'lucide-react';
import { searchPixabay, PixabayResult, PixabayResponse } from '../services/pixabay';
import FuturisticBackground from './FuturisticBackground';
import ThemeToggle from './ThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

interface HomeProps {
  onLogout: () => void;
}

const Home: React.FC<HomeProps> = ({ onLogout }) => {
  const [query, setQuery] = useState('');
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');
  const [results, setResults] = useState<PixabayResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const { theme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = async () => {
    if (query.trim() === '') return;
    setLoading(true);
    try {
      const response = await searchPixabay(query, mediaType, 1);
      setResults(response.hits);
      setHasMore(response.totalHits > response.hits.length);
      setPage(1);
      setSearchHistory(prevHistory => [query, ...prevHistory.slice(0, 4)]);
    } catch (error) {
      console.error('Error searching Pixabay:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const response = await searchPixabay(query, mediaType, page + 1);
      setResults(prevResults => [...prevResults, ...response.hits]);
      setHasMore(response.totalHits > results.length + response.hits.length);
      setPage(prevPage => prevPage + 1);
    } catch (error) {
      console.error('Error loading more results:', error);
    } finally {
      setLoading(false);
    }
  };

  const bgColor = theme === 'dark' ? 'bg-gradient-to-b from-gray-900 via-gray-800 to-black' : 'bg-gradient-to-b from-sky-100 via-white to-sky-50';
  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const headerFooterBg = theme === 'dark' ? 'bg-gray-900' : 'bg-white';

  return (
    <div className={`flex flex-col min-h-screen relative overflow-hidden ${bgColor} ${textColor}`}>
      <FuturisticBackground />
      
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md bg-opacity-70 ${isScrolled ? headerFooterBg : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-teal-400">
            <Zap className="mr-2" size={36} color={theme === 'dark' ? '#38bdf8' : '#0284c7'} />
            <span>Ubiq</span>
          </h1>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={onLogout}
              className="hover:bg-sky-700 transition-colors duration-200 flex items-center bg-gradient-to-r from-sky-500 to-teal-500 text-white px-4 py-2 rounded-lg"
            >
              <LogOut size={20} className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 mt-16 mb-16">
        <div className="w-full max-w-3xl">
          <div className="mb-8 text-center">
            <h2 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-teal-400 to-sky-600">How can Ubiq AI help you today?</h2>
            <p className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Search for images or videos to inspire your next project</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center mb-6">
            <div className="relative flex-grow w-full sm:w-auto mb-4 sm:mb-0">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Enter your search query"
                className={`w-full px-6 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-sky-500 text-lg ${theme === 'dark' ? 'bg-gray-800 text-white border-sky-500' : 'bg-white text-gray-900 border-gray-300'}`}
              />
              <button
                onClick={() => setShowHistory(!showHistory)}
                className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${theme === 'dark' ? 'text-sky-400 hover:text-sky-300' : 'text-sky-600 hover:text-sky-500'} transition-colors duration-200`}
              >
                <History size={24} />
              </button>
            </div>
            <button
              onClick={handleSearch}
              className="w-full sm:w-auto px-8 py-3 rounded-lg flex items-center justify-center transition-all duration-200 text-lg font-semibold ml-0 sm:ml-4 bg-gradient-to-r from-sky-500 to-teal-500 text-white hover:from-sky-600 hover:to-teal-600 transform hover:scale-105"
            >
              <Sparkles size={24} className="mr-2" />
              Generate
            </button>
          </div>

          <div className="flex justify-center space-x-6 mb-8">
            <button
              onClick={() => setMediaType('image')}
              className={`px-6 py-3 rounded-lg flex items-center transition-all duration-200 text-lg font-semibold ${mediaType === 'image' ? 'bg-gradient-to-r from-sky-500 to-teal-500 text-white' : theme === 'dark' ? 'bg-gray-800 text-sky-400' : 'bg-gray-200 text-sky-600'} hover:from-sky-600 hover:to-teal-600 hover:text-white transform hover:scale-105`}
            >
              <ImageIcon size={24} className="mr-2" />
              Images
            </button>
            <button
              onClick={() => setMediaType('video')}
              className={`px-6 py-3 rounded-lg flex items-center transition-all duration-200 text-lg font-semibold ${mediaType === 'video' ? 'bg-gradient-to-r from-sky-500 to-teal-500 text-white' : theme === 'dark' ? 'bg-gray-800 text-sky-400' : 'bg-gray-200 text-sky-600'} hover:from-sky-600 hover:to-teal-600 hover:text-white transform hover:scale-105`}
            >
              <VideoIcon size={24} className="mr-2" />
              Videos
            </button>
          </div>

          {/* Search history dropdown */}
          <AnimatePresence>
            {showHistory && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`mb-6 p-4 rounded-lg shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-teal-400">Recent Searches</h3>
                  <button onClick={() => setShowHistory(false)} className={`${theme === 'dark' ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800'} transition-colors duration-200`}>
                    <X size={20} />
                  </button>
                </div>
                <ul>
                  {searchHistory.map((item, index) => (
                    <li
                      key={index}
                      className={`cursor-pointer p-2 hover:bg-sky-600 rounded transition-colors duration-200 ${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-white'}`}
                      onClick={() => {
                        setQuery(item);
                        setShowHistory(false);
                      }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Results grid */}
        <div className="w-full max-w-7xl mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {results.map((result) => (
              <motion.div
                key={result.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 ${theme === 'dark' ? 'bg-gradient-to-b from-gray-800 to-gray-900' : 'bg-white'}`}
              >
                {mediaType === 'image' ? (
                  <img src={result.webformatURL} alt={result.tags} className="w-full h-48 object-cover" />
                ) : (
                  <video src={result.videos?.small.url} className="w-full h-48 object-cover" controls />
                )}
                <div className={`p-4 ${theme === 'dark' ? 'bg-gradient-to-b from-gray-900 to-black' : 'bg-gray-50'}`}>
                  <p className="text-sm truncate bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-teal-400">{result.tags}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Load more button */}
          {hasMore && (
            <div className="mt-12 text-center">
              <button
                onClick={loadMore}
                className="px-8 py-3 rounded-lg transition-all duration-200 text-lg font-semibold bg-gradient-to-r from-sky-500 to-teal-500 text-white hover:from-sky-600 hover:to-teal-600 transform hover:scale-105"
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md bg-opacity-70 ${isScrolled ? headerFooterBg : 'bg-transparent'}`}>
        <div className="container mx-auto text-center py-4">
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            &copy; {new Date().getFullYear()} Ubiq. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;