import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import login from '../images/login.png';

function Copyright() {
  return (
    <p className="text-sm text-gray-500 text-center mt-8">
      {'Copyright © '}
      <a href="/" className="text-gray-600 hover:text-primary-600">
        Scent of Water Parish
      </a>{' '}
      {new Date().getFullYear()}
      {'.'}
    </p>
  );
}

class SignInSide extends Component {
  handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const username = formData.get('username');
    const password = formData.get('password');
  
    // Check if username and password are correct
    if (username === 'SOW-Admin' && password === 'SOW12345') {
      // Redirect to admin route
      window.location.href = '/admin';
    } else {
      // Display message for invalid credentials
      alert('Invalid credentials. Please try again.');
    }
  };

  render() {
    return (
      <div className="min-h-screen flex">
        {/* Left side - Background Image */}
        <div 
          className="hidden sm:block sm:w-1/3 md:w-7/12 bg-cover bg-center"
          style={{ backgroundImage: `url(${login})` }}
        />

        {/* Right side - Login Form */}
        <div className="w-full sm:w-2/3 md:w-5/12 bg-white px-6 py-12 flex items-center justify-center">
          <div className="w-full max-w-md space-y-8">
            {/* Lock Icon */}
            <div className="mx-auto w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
              <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>

            <h1 className="text-2xl font-bold text-center text-gray-900">
              Admin Sign in
            </h1>

            <form className="mt-8 space-y-6" onSubmit={this.handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter your username"
                    autoComplete="username"
                    autoFocus
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
              >
                Sign In
              </button>

              <div className="text-center">
                <Link
                  to="/"
                  className="text-sm text-primary-600 hover:text-primary-500"
                >
                  Return Home
                </Link>
              </div>

              <Copyright />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignInSide;
