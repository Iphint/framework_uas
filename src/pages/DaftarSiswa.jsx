import React, {  } from 'react';
import Navbar from '../component/Navbar';
import ListSiswa from '../component/ListSiswa';

const DaftarSiswa = () => {
  return (
    <div>
      <Navbar />
      <div className="bg-white min-h-screen mx-40">
        <header className="bg-white pt-14">
          <h1 className="text-2xl font-bold">Student App</h1>
          <p className="text-gray-500 mt-4">Refresh halaman jika data belom muncul!!</p>
        </header>    
        <main className="py-8">
          <ListSiswa />
        </main>
      </div>
    </div>
  );
};

export default DaftarSiswa;
