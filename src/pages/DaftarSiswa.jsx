import React, {  } from 'react';
import Navbar from '../component/Navbar';
import ListSiswa from '../component/ListSiswa';
import Footer from '../component/Footer'

const DaftarSiswa = () => {
  return (
    <div>
      <Navbar />
      <div className="bg-white min-h-screen mx-40 h-full">
        <header className="bg-white pt-14">
          <h1 className="text-2xl font-bold">Student App</h1>
          <p className="text-gray-500 mt-4">Refresh halaman jika data belom muncul!!</p>
        </header>    
        <main className="py-8">
          <ListSiswa />
        </main>
      </div>
      <Footer/>
    </div>
  );
};

export default DaftarSiswa;
