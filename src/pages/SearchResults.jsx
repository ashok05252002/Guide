import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Play, Clock, ArrowRight } from 'lucide-react';
import { useSearch } from '../context/SearchContext';
import { searchSteps } from '../utils/stepData';

const SearchResults = () => {
  const { searchQuery } = useSearch();
  const results = searchSteps(searchQuery);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Search Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Search className="w-6 h-6 text-pistachio-500" />
              <h1 className="text-2xl md:text-3xl font-sf font-light text-gray-900 dark:text-white">
                Search Results
              </h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              {results.length > 0 ? (
                <>Found <span className="font-semibold">{results.length}</span> results for "<span className="font-semibold">{searchQuery}</span>"</>
              ) : (
                <>No results found for "<span className="font-semibold">{searchQuery}</span>"</>
              )}
            </p>
          </div>

          {/* Results */}
          {results.length > 0 ? (
            <div className="space-y-6">
              {results.map((result, index) => (
                <motion.div
                  key={`${result.module}-${result.stepNumber}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <span className="px-3 py-1 bg-pistachio-100 dark:bg-pistachio-900 text-pistachio-700 dark:text-pistachio-300 text-sm font-medium rounded-full capitalize">
                          {result.module.replace('-', ' ')}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Step {result.stepNumber}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {result.title}
                      </h3>
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                        {result.description}
                      </p>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center">
                          <Play className="w-4 h-4 mr-1" />
                          Video Guide
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {result.duration}
                        </div>
                      </div>
                    </div>
                    
                    <Link
                      to={`/guide/${result.module}/${result.stepNumber}`}
                      className="ml-6 flex items-center px-4 py-2 bg-pistachio-400 hover:bg-pistachio-500 text-white rounded-xl transition-colors"
                    >
                      Go to Step
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No results found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Try searching with different keywords or check out our popular modules below.
              </p>
              <Link
                to="/"
                className="inline-flex items-center px-6 py-3 bg-pistachio-400 hover:bg-pistachio-500 text-white rounded-xl transition-colors"
              >
                Browse All Modules
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default SearchResults;
