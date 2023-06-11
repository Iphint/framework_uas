/* eslint-disable jsx-a11y/img-redundant-alt */
import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LOGIN_USER = gql`
  mutation LoginUser($username: String!, $password: String!) {
    mahasiswa(username: $username, password: $password) {
      token
    }
  }
`;

const Login = () => {
  // State untuk input username dan password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Mutation untuk login
  const [loginUser, { loading, error }] = useMutation(LOGIN_USER);

  // Handle submit form login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser({
        variables: { username, password },
      });
      const token = data.mahasiswa.token;
      // Simpan token di local storage atau state aplikasi
      localStorage.setItem('token', token);
      // Redirect ke halaman utama setelah berhasil login
      window.location.href = '/';
      console.log('Login berhasil, token:', token);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <section className="h-screen p-40">
      <div className="h-full">
        {/* Left column container with background */}
        <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
          <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="w-full"
              alt="Sample image"
            />
          </div>

          {/* Right column container */}
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
            <form onSubmit={handleLogin}>
              {/* Sign in section */}
              <div className="flex flex-row items-center justify-center lg:justify-start">
                <p className="mb-0 mr-4 text-lg">Sign in with</p>

                {/* Facebook */}
                <button
                  type="button"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                  className="mx-1 h-9 w-9 rounded-full bg-primary uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] active:outline-none active:ring-0 active:ring-primary-500 active:border-transparent active:border-[0px] active:border-primary-500"
                >
                  <span className="icon icon-md">
                    <img
                      src="https://img.icons8.com/color/48/000000/facebook.png"
                      alt="Facebook icon"
                    />
                  </span>
                </button>

                {/* Twitter */}
                <button
                  type="button"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                  className="mx-1 h-9 w-9 rounded-full bg-primary uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] active:outline-none active:ring-0 active:ring-primary-500 active:border-transparent active:border-[0px] active:border-primary-500"
                >
                  <span className="icon icon-md">
                    <img
                      src="https://img.icons8.com/color/48/000000/twitter.png"
                      alt="Twitter icon"
                    />
                  </span>
                </button>

                {/* LinkedIn */}
                <button
                  type="button"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                  className="mx-1 h-9 w-9 rounded-full bg-primary uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] active:outline-none active:ring-0 active:ring-primary-500 active:border-transparent active:border-[0px] active:border-primary-500"
                >
                  <span className="icon icon-md">
                    <img
                      src="https://img.icons8.com/color/48/000000/linkedin.png"
                      alt="LinkedIn icon"
                    />
                  </span>
                </button>
              </div>

              {/* Separator */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm leading-5">
                  <span className="px-2 text-gray-500 bg-white">
                    Or sign in with email
                  </span>
                </div>
              </div>

              {/* Username input */}
              <div className="mb-3">
                <label htmlFor="username" className="block text-sm font-medium">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="w-full px-4 py-2 text-base placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              {/* Password input */}
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-4 py-2 text-base placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* Error message */}
              {error && (
                <div className="text-red-500 mb-6">
                  {error.message}
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                className="w-full px-4 py-2 text-lg font-semibold text-white uppercase bg-primary border border-transparent rounded-md hover:bg-primary-600 focus:outline-none focus:border-primary-700 focus:ring-primary-500 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Log In'}
              </button>

              {/* Sign up link */}
              <p className="mt-6 text-center text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/signup" className="text-primary">
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;