import React, { useState } from 'react';
import Navbar from '../component/NavAdmin';
import { gql, useMutation, useQuery } from '@apollo/client';
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
    $images: String!
    $sosmed: String!
    $status: String!
  ) {
    insert_table_mhs_one(
      object: {
        nama: $name
        nim: $nim
        prodi: $prodi
        angkatan: $angkatan
        images: $images
        sosmed: $sosmed
        status: $status
      }
    ) {
      id
      nama
      prodi
      angkatan
      nim
    }
  }
`;

const Form = () => {
  const [name, setName] = useState('');
  const [nim, setNim] = useState('');
  const [prodi, setProdi] = useState('');
  const [angkatan, setAngkatan] = useState('');
  const [images, setImages] = useState('');
  const [sosmed, setSosmed] = useState('');
  const [status, setStatus] = useState('');

  const { refetch } = useQuery(GET_STUDENTS);

  const [addStudent] = useMutation(ADD_STUDENT, {
    onCompleted: () => {
      refetch();
    },
  });

  const handleAdd = () => {
    if (name && nim && prodi && angkatan && images && sosmed && status) {
      addStudent({
        variables: {
          name: name,
          nim: parseInt(nim),
          prodi: prodi,
          angkatan: parseInt(angkatan),
          images: images,
          sosmed: sosmed,
          status: status,
        },
      });
      setName('');
      setNim('');
      setProdi('');
      setAngkatan('');
      setImages('');
      setSosmed('');
      setStatus('');

      Swal.fire('Success', 'Data berhasil ditambahkan', 'success');
    } else {
      Swal.fire('Error', 'Harap lengkapi semua input', 'error');
    }
  };

  return (
    <div className="flex">
      <Navbar />
      <div className="max-w-fit mt-10 flex justify-center h-1/20 bg-white">
        <h1 className="text-2xl font-bold mb-4 mt-7 mx-24">
          Form input data Mahasiswa
        </h1>
        <form className="mb-14 w-1/2 mx-24">
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
              <option value="S1 Teknik Informatika">S1 Teknik Informatika</option>
              <option value="S1 Sistem Informasi">S1 Sistem Informasi</option>
              <option value="D3 Manajemen Informatika">
                D3 Manajemen Informatika
              </option>
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
          <div className="mb-4">
            <input
              className="border border-gray-300 px-4 py-2 w-full rounded"
              type="text"
              placeholder="Images URL"
              value={images}
              onChange={(e) => setImages(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              className="border border-gray-300 px-4 py-2 w-full rounded"
              type="text"
              placeholder="Link linkedin"
              value={sosmed}
              onChange={(e) => setSosmed(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <select
              className="border border-gray-300 px-4 py-2 w-full rounded"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">Pilih Status</option>
              <option value="Sudah Lulus">Sudah Lulus</option>
              <option value="Masih Aktif">Masih Aktif</option>
            </select>
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            type="button"
            onClick={handleAdd}
          >
            Tambah Mahasiswa
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
