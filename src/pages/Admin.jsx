import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import Swal from 'sweetalert2';

const GET_STUDENTS = gql`
  query GetStudents($page: Int!, $pageSize: Int!) {
    table_mhs(order_by: { id: asc }, limit: $pageSize, offset: $page) {
      id
      nama
      prodi
      angkatan
      nim
    }
    table_mhs_aggregate {
      aggregate {
        count
      }
    }
  }
`;


const ADD_STUDENT = gql`
  mutation AddStudent(
    $name: String!
    $nim: Int!
    $prodi: String!
    $angkatan: Int!
  ) {
    insert_table_mhs_one(
      object: { nama: $name, nim: $nim, prodi: $prodi, angkatan: $angkatan }
    ) {
      id
      nama
      prodi
      angkatan
      nim
    }
  }
`;

const UPDATE_STUDENT = gql`
  mutation UpdateStudent(
    $id: Int!
    $name: String!
    $nim: Int!
    $prodi: String!
    $angkatan: Int!
  ) {
    update_table_mhs_by_pk(
      pk_columns: { id: $id }
      _set: { nama: $name, nim: $nim, prodi: $prodi, angkatan: $angkatan }
    ) {
      id
      nama
      prodi
      angkatan
      nim
    }
  }
`;

const DELETE_STUDENT = gql`
  mutation DeleteStudent($id: Int!) {
    delete_table_mhs_by_pk(id: $id) {
      id
    }
  }
`;

const Admin = () => {
  const [name, setName] = useState('');
  const [nim, setNim] = useState('');
  const [prodi, setProdi] = useState('');
  const [angkatan, setAngkatan] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // Number of items per page

  const { loading, error, data, refetch } = useQuery(GET_STUDENTS, {
    variables: {
      page: (currentPage - 1) * pageSize,
      pageSize: pageSize,
    },
  });
  
  const [addStudent] = useMutation(ADD_STUDENT, {
    onCompleted: () => {
      refetch();
      setCurrentPage(1); // Reset to the first page after adding a student
    },
  });
  const [updateStudent] = useMutation(UPDATE_STUDENT, {
    refetchQueries: [{ query: GET_STUDENTS }],
  });
  const [deleteStudent] = useMutation(DELETE_STUDENT, {
    refetchQueries: [{ query: GET_STUDENTS }],
  });
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
    }
  }, []);

  const handleLogout = () => {
    const token = localStorage.getItem('token');
    if (token) {
      Swal.fire({
        title: 'Are you sure?',
        text: "Apakah anda ingin logout ?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, logout!'
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
      });
    }
  };

  const handleAdd = async () => {
    try {
      await addStudent({
        variables: {
          name,
          nim: parseInt(nim),
          prodi,
          angkatan: parseInt(angkatan),
        },
      });
      setName('');
      setNim('');
      setProdi('');
      setAngkatan('');
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Data successfully added',
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'field data harus terisi semua!!!',
      });
    }
  };

  const handleUpdate = async () => {
    try {
      await updateStudent({
        variables: {
          id: selectedStudent.id,
          name,
          nim: parseInt(nim),
          prodi,
          angkatan: parseInt(angkatan),
        },
      });
      setSelectedStudent(null);
      setName('');
      setNim('');
      setProdi('');
      setAngkatan('');
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your data has been updated',
        showConfirmButton: false,
        timer: 1500
      })
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to delete this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteStudent({ variables: { id } });
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          );
        } catch (error) {
          console.error('Error:', error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          });
        }
      }
    });
  };

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setName(student.nama);
    setNim(student.nim.toString());
    setProdi(student.prodi);
    setAngkatan(student.angkatan.toString());
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  if (error) return <p>Error: {error.message}</p>;

  const totalItems = data.table_mhs_aggregate.aggregate.count;
  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-4 mt-7 text-center">
        Daftar Mahasiswa
      </h1>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded ml-4"
        type="button"
        onClick={handleLogout}
      >
        Logout
      </button>
      <form className="mb-14 w-1/2 mx-auto">
        <div className="mb-4">
          <input
            className="border border-gray-300 px-4 py-2 w-full rounded"
            type="text"
            placeholder="Nama"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            className="border border-gray-300 px-4 py-2 w-full rounded"
            type="text"
            placeholder="NIM"
            value={nim}
            onChange={(e) => setNim(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <select
            className="border border-gray-300 px-4 py-2 w-full rounded"
            value={prodi}
            onChange={(e) => setProdi(e.target.value)}
          >
            <option value="">Pilih Program Studi</option>
            <option value="Teknik Informatika">Teknik Informatika</option>
            <option value="Sistem Informasi">Sistem Informasi</option>
            <option value="Manajemen Informatika">Manajemen Informatika</option>
          </select>
        </div>
        <div className="mb-4">
          <select
            className="border border-gray-300 px-4 py-2 w-full rounded"
            value={angkatan}
            onChange={(e) => setAngkatan(e.target.value)}
          >
            <option value="">Pilih Angkatan</option>
            <option value="2019">2019</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
          </select>
        </div>
        {!selectedStudent ? (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            type="button"
            onClick={handleAdd}
          >
            Tambah Mahasiswa
          </button>
        ) : (
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            type="button"
            onClick={handleUpdate}
          >
            Update Mahasiswa
          </button>
        )}
      </form>
      <table className="w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">No</th>
            <th className="px-4 py-2">Nama</th>
            <th className="px-4 py-2">NIM</th>
            <th className="px-4 py-2">Prodi</th>
            <th className="px-4 py-2">Angkatan</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.table_mhs.map((student, i) => (
            <tr key={student.id} className="mb-2">
              <td className="px-4 py-2 text-center">{i + 1}</td>
              <td className="px-4 py-2 text-center">{student.nama}</td>
              <td className="px-4 py-2 text-center">{student.nim}</td>
              <td className="px-4 py-2 text-center">{student.prodi}</td>
              <td className="px-4 py-2 text-center">{student.angkatan}</td>
              <td className="px-4 py-2 text-center">
                <button
                  className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                  type="button"
                  onClick={() => handleEdit(student)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  type="button"
                  onClick={() => handleDelete(student.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center items-center mt-4">
        <button
          className={`bg-gray-500 text-white px-4 py-2 rounded ${
            currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          type="button"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="mx-4 text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className={`bg-gray-500 text-white px-4 py-2 rounded ${
            currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          type="button"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Admin;