import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import gql from 'graphql-tag';

const GET_STUDENTS = gql`
  query GetStudents {
    table_mhs(order_by: {id: asc}) {
      id
      nama
      prodi
      angkatan
      nim
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

  const { loading, error, data, refetch } = useQuery(GET_STUDENTS);
  const [addStudent] = useMutation(ADD_STUDENT, {
    onCompleted: () => refetch(),
  });
  const [updateStudent] = useMutation(UPDATE_STUDENT, {
    refetchQueries: [{ query: GET_STUDENTS }],
  });
  const [deleteStudent] = useMutation(DELETE_STUDENT, {
    refetchQueries: [{ query: GET_STUDENTS }],
  });

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
    } catch (error) {
      console.error('Error:', error);
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
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteStudent({ variables: { id } });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setName(student.nama);
    setNim(student.nim.toString());
    setProdi(student.prodi);
    setAngkatan(student.angkatan.toString());
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-4 mt-7 text-center">
        Daftar Mahasiswa
      </h1>
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
            <th className="px-4 py-2">id</th>
            <th className="px-4 py-2">Nama</th>
            <th className="px-4 py-2">NIM</th>
            <th className="px-4 py-2">Prodi</th>
            <th className="px-4 py-2">Angkatan</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.table_mhs.map((student) => (
            <tr key={student.id} className="mb-2">
              <td className="px-4 py-2 text-center">{student.id}</td>
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
    </div>
  );
};

export default Admin;