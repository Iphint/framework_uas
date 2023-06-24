import React from 'react';
import Navbar from '../component/Navbar';
import ListSiswa from '../component/ListSiswa';
import Footer from '../component/Footer';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

const DaftarSiswa = () => {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Oops...',
        text: 'Tolong login sebagai mahasiswa kampus STIMATA!',
        showConfirmButton: false,
        timer: 2000,
      });
      setTimeout(() => {
        window.location.replace('/loginsiswa');
      }, 2000);
    }
  }, []);
  return (
    <div>
      <Navbar />
      <div className="bg-white min-h-screen mx-40 h-full">
        <header className="bg-white pt-14">
          <h1 className="text-2xl font-bold">Student App</h1>
          <p className="text-gray-500 mt-4">
            Refresh halaman jika data belom muncul!!
          </p>
        </header>
        <main className="py-8">
          <ListSiswa />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default DaftarSiswa;
