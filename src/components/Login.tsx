import React, { useState } from 'react';
import { LogIn, UserPlus, Zap, AlertCircle } from 'lucide-react';
import { signInWithEmailAndPassword, signInWithGoogle, signUpWithEmailAndPassword } from '../services/auth';
import { FirebaseError } from 'firebase/app';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';
import FuturisticBackground from './FuturisticBackground';

const Login: React.FC = () => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [error, setError] = useState('');
  const { theme } = useTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (mode === 'signup' && password !== verifyPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      if (mode === 'login') {
        await signInWithEmailAndPassword(email, password);
      } else {
        await signUpWithEmailAndPassword(email, password);
      }
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  const bgColor = theme === 'dark' ? 'bg-gradient-to-b from-gray-900 via-gray-800 to-black' : 'bg-gradient-to-b from-sky-100 via-white to-sky-50';
  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-900';

  return (
    <div className={`min-h-screen flex items-center justify-center ${bgColor} ${textColor} relative overflow-hidden`}>
      <FuturisticBackground />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 p-10 rounded-2xl shadow-2xl relative z-10 backdrop-blur-lg bg-opacity-30"
        style={{ backgroundColor: theme === 'dark' ? 'rgba(17, 24, 39, 0.7)' : 'rgba(255, 255, 255, 0.7)' }}
      >
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>
        <div>
          <h1 className="text-4xl font-bold flex items-center justify-center bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-teal-400">
            <Zap className="mr-2" size={36} color={theme === 'dark' ? '#38bdf8' : '#0284c7'} />
            <span>Ubiq AI</span>
          </h1>
          <h2 className="mt-6 text-center text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-teal-400 to-sky-600">
            {mode === 'login' ? 'Sign in to your account' : 'Create a new account'}
          </h2>
          <p className="mt-2 text-center text-sm" style={{ color: theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)' }}>
            {mode === 'login' ? 'Enter the future of content generation' : 'Join the future of content generation'}
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center p-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <AlertCircle className="flex-shrink-0 w-5 h-5 mr-2" />
              <span className="sr-only">Error</span>
              <div className="text-sm font-medium">
                {error}
              </div>
            </motion.div>
          )}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm ${mode === 'login' ? 'rounded-b-md' : ''}`}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {mode === 'signup' && (
              <div>
                <label htmlFor="verify-password" className="sr-only">Verify Password</label>
                <input
                  id="verify-password"
                  name="verify-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                  placeholder="Verify Password"
                  value={verifyPassword}
                  onChange={(e) => setVerifyPassword(e.target.value)}
                />
              </div>
            )}
          </div>

          <div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-600 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                {mode === 'login' ? <LogIn className="h-5 w-5 text-sky-300 group-hover:text-sky-400" aria-hidden="true" /> : <UserPlus className="h-5 w-5 text-sky-300 group-hover:text-sky-400" aria-hidden="true" />}
              </span>
              {mode === 'login' ? 'Sign in' : 'Sign up'}
            </motion.button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 text-gray-500" style={{ backgroundColor: theme === 'dark' ? 'rgba(17, 24, 39, 0.7)' : 'rgba(255, 255, 255, 0.7)' }}>
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGoogleSignIn}
              className="w-full inline-flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google logo" className="w-5 h-5 mr-2" />
              Sign in with Google
            </motion.button>
          </div>
        </div>

        <div className="text-center mt-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => {
              setMode(mode === 'login' ? 'signup' : 'login');
              setError('');
              setVerifyPassword('');
            }}
            className="text-sm bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-teal-400 hover:from-sky-500 hover:to-teal-500"
          >
            {mode === 'login' ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;