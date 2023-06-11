/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from 'react';

const Login = () => {
  // State untuk input username dan password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Handle submit form login
  const handleLogin = (e) => {
    e.preventDefault();

    // Mengatur username dan password secara lokal
    const localUsername = 'admin'; // Ubah dengan username yang diinginkan
    const localPassword = '1234'; // Ubah dengan password yang diinginkan

    // Memeriksa apakah username dan password yang dimasukkan sama dengan yang diatur secara lokal
    if (username === localUsername && password === localPassword) {
      // Simpan token di local storage atau state aplikasi (jika diperlukan)
      const token = '123213hbuhbjsfjdb2378324bhj32jclke47'; // Ubah dengan token yang diinginkan
      localStorage.setItem('token', token);

      // Redirect ke halaman utama setelah berhasil login
      window.location.href = '/admin';
      console.log('Login berhasil, token:', token);
    } else {
      console.error('Error: Invalid username or password');
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
              {/* Input fields */}
              <div className="mb-6">
                <label htmlFor="username" className="block mb-2 text-sm" placeholder='masukan username'>
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary-500"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="mb-6">
                <label htmlFor="password" className="block mb-2 text-sm" placeholder='masukan password'>
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* Login button */}
              <div className="mb-6">
                <button
                  type="submit"
                  className="w-full px-4 py-2 text-sm font-medium text-black uppercase bg-slate-200 rounded-md hover:bg-slate-300 focus:outline-none focus:bg-primary-600"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
