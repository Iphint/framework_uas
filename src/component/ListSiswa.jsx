import { gql, useQuery } from '@apollo/client';
import React, { useState } from 'react';

const GET_STUDENTS = gql`
  query GetStudents {
    table_mhs(order_by: {angkatan: asc}) {
      id
      nama
      prodi
      angkatan
      nim
    }
  }
`;

const ListSiswa = () => {
  const { loading, error, data } = useQuery(GET_STUDENTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [isDataFound, setIsDataFound] = useState(true);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    filterStudents(value);
  };

  const filterStudents = (value) => {
    const filteredData = data?.table_mhs.filter(
      (student) =>
        student.nama.toLowerCase().includes(value.toLowerCase()) ||
        String(student.nim).toLowerCase().includes(value.toLowerCase()) ||
        String(student.angkatan).toLowerCase().includes(value.toLowerCase())
    );
    setFilteredStudents(filteredData);
    setIsDataFound(filteredData && filteredData.length > 0);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  if (error) return <p>Error: {error.message}</p>;

  const students = searchTerm ? filteredStudents : data?.table_mhs;

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Daftar Mahasiswa</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Cari nama atau NIM mahasiswa..."
          className="border border-gray-300 rounded px-4 py-2"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      {students && students.length > 0 ? (
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">No</th>
              <th className="px-4 py-2">Nama</th>
              <th className="px-4 py-2">NIM</th>
              <th className="px-4 py-2">Prodi</th>
              <th className="px-4 py-2">Angkatan</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student,i) => (
              <tr key={student.id} className="mb-3">
                <td className="px-4 py-2 text-center">{i + 1}</td>
                <td className="px-4 py-2 text-center">{student.nama}</td>
                <td className="px-4 py-2 text-center">{student.nim}</td>
                <td className="px-4 py-2 text-center">{student.prodi}</td>
                <td className="px-4 py-2 text-center">{student.angkatan}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="bg-gray-200 p-8 text-center">
          <p className="text-2xl font-bold text-gray-600">Data not found</p>
          <p className="text-gray-500">Data yang di inputkan tidak mencocoki data dalam database.</p>
        </div>
      )}
    </div>
  );
};

export default ListSiswa;
