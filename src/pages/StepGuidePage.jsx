import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Home, Play, Pause, Menu, X, CheckCircle, Clock } from 'lucide-react';
import { generateStepData } from '../utils/stepData';

const StepGuidePage = () => {
  const { module, step } = useParams();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(300); // 5 minutes default

  const stepData = generateStepData(module, parseInt(step));
  const allSteps = generateStepData(module).steps;
  
  const currentStepIndex = parseInt(step) - 1;
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === allSteps.length - 1;

  const handlePrevious = () => {
    if (!isFirstStep) {
      navigate(`/guide/${module}/${currentStepIndex}`);
    }
  };

  const handleNext = () => {
    if (!isLastStep) {
      navigate(`/guide/${module}/${currentStepIndex + 2}`);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    // Simulate video progress
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            setIsPlaying(false);
            return duration;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  const Breadcrumb = () => (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
      <Link to="/" className="hover:text-pistachio-500 transition-colors">Home</Link>
      <ChevronRight className="w-4 h-4" />
      <Link to="/" className="hover:text-pistachio-500 transition-colors capitalize">
        {module.replace('-', ' ')}
      </Link>
      <ChevronRight className="w-4 h-4" />
      <span className="text-gray-900 dark:text-white">Step {step}</span>
    </nav>
  );

  const Sidebar = () => (
    <div className={`${sidebarOpen ? 'block' : 'hidden'} lg:block w-full lg:w-80 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-full overflow-y-auto`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6 lg:hidden">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Steps</h3>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-2">
          {allSteps.map((stepItem, index) => (
            <Link
              key={index}
              to={`/guide/${module}/${index + 1}`}
              className={`flex items-center p-3 rounded-xl transition-colors ${
                index === currentStepIndex
                  ? 'bg-pistachio-100 dark:bg-pistachio-900 text-pistachio-700 dark:text-pistachio-300'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                index < currentStepIndex 
                  ? 'bg-pistachio-500 text-white' 
                  : index === currentStepIndex
                  ? 'bg-pistachio-400 text-white'
                  : 'bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400'
              }`}>
                {index < currentStepIndex ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium">{stepItem.title}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{stepItem.duration}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );

  const ProgressTracker = () => (
    <div className="sticky top-20 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 lg:px-8 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Step {step} of {allSteps.length}
            </span>
            <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-pistachio-400 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStepIndex + 1) / allSteps.length * 100}%` }}
              />
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-white dark:bg-gray-900">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 lg:relative lg:z-auto">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <ProgressTracker />
        
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Breadcrumb />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Step Header */}
              <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-sf font-light text-gray-900 dark:text-white mb-4">
                  {stepData.title}
                </h1>
                <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {stepData.duration}
                  </div>
                  <div className="w-1 h-1 bg-gray-400 rounded-full" />
                  <span className="capitalize">{module.replace('-', ' ')} Module</span>
                </div>
              </div>

              {/* Video Player */}
              <div className="mb-8">
                <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-lg">
                  <div className="aspect-video relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                      >
                        {isPlaying ? (
                          <Pause className="w-8 h-8 text-white" />
                        ) : (
                          <Play className="w-8 h-8 text-white ml-1" />
                        )}
                      </button>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
                      <div className="flex items-center space-x-4">
                        <span className="text-white text-sm">{formatTime(currentTime)}</span>
                        <div className="flex-1 bg-white/20 rounded-full h-1">
                          <div 
                            className="bg-pistachio-400 h-1 rounded-full transition-all duration-300"
                            style={{ width: `${(currentTime / duration) * 100}%` }}
                          />
                        </div>
                        <span className="text-white text-sm">{formatTime(duration)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step Description */}
              <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                  {stepData.description}
                </p>
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                  What you'll learn:
                </h3>
                <ul className="space-y-2">
                  {stepData.objectives.map((objective, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-pistachio-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{objective}</span>
                    </li>
                  ))}
                </ul>

                {stepData.keyPoints && (
                  <div className="bg-pistachio-50 dark:bg-pistachio-900/20 rounded-xl p-6 mt-8">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Key Points to Remember:
                    </h4>
                    <ul className="space-y-2">
                      {stepData.keyPoints.map((point, index) => (
                        <li key={index} className="text-gray-700 dark:text-gray-300">
                          • {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Navigation Footer */}
        <div className="sticky bottom-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-4 sm:px-6 lg:px-8 py-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <button
              onClick={handlePrevious}
              disabled={isFirstStep}
              className={`flex items-center px-6 py-3 rounded-xl font-medium transition-colors ${
                isFirstStep
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Previous
            </button>

            <Link
              to="/"
              className="p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Home className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </Link>

            <button
              onClick={handleNext}
              disabled={isLastStep}
              className={`flex items-center px-6 py-3 rounded-xl font-medium transition-colors ${
                isLastStep
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'bg-pistachio-400 hover:bg-pistachio-500 text-white'
              }`}
            >
              Next
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepGuidePage;
