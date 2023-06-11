import { gql, useQuery } from '@apollo/client';
import React, { useState } from 'react';

const GET_STUDENTS = gql`
  query GetStudents {
    table_mhs(order_by: { angkatan: asc }) {
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
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(7);

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
    setCurrentPage(1); // Reset current page to 1 when filtering
  };

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = searchTerm ? filteredStudents : data?.table_mhs;
  const currentStudentsSlice = currentStudents?.slice(indexOfFirstStudent, indexOfLastStudent);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  if (error) return <p>Error: {error.message}</p>;

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
      {currentStudentsSlice && currentStudentsSlice.length > 0 ? (
        <div>
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
              {currentStudentsSlice.map((student, index) => (
                <tr key={student.id} className="mb-3">
                  <td className="px-4 py-2 text-center">{indexOfFirstStudent + index + 1}</td>
                  <td className="px-4 py-2 text-center">{student.nama}</td>
                  <td className="px-4 py-2 text-center">{student.nim}</td>
                  <td className="px-4 py-2 text-center">{student.prodi}</td>
                  <td className="px-4 py-2 text-center">{student.angkatan}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            studentsPerPage={studentsPerPage}
            totalStudents={currentStudents?.length}
            currentPage={currentPage}
            paginate={paginate}
          />
        </div>
      ) : (
        <div className="bg-gray-200 p-8 text-center">
          <p className="text-2xl font-bold text-gray-600">Data not found</p>
          <p className="text-gray-500">Data yang diinputkan tidak cocok dengan data dalam database.</p>
        </div>
      )}
    </div>
  );
};

const Pagination = ({ studentsPerPage, totalStudents, currentPage, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalStudents / studentsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="mt-4">
      <ul className="flex justify-center">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`px-3 py-1 cursor-pointer ${
              currentPage === number ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-600'
            }`}
            onClick={() => paginate(number)}
          >
            {number}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default ListSiswa;
