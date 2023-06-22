import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import Swal from 'sweetalert2';
import Navbar from '../component/NavAdmin';
import { gql } from 'graphql-tag';
import Chart from 'chart.js/auto';
import ReactPaginate from 'react-paginate';

const GET_STUDENTS = gql`
  query GetStudents($page: Int!, $pageSize: Int!) {
    table_mhs(order_by: { id: asc }, limit: $pageSize, offset: $page) {
      id
      nama
      prodi
      angkatan
      nim
      status
      images
      sosmed
    }
    table_mhs_aggregate {
      aggregate {
        count
      }
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
    $status: String!
    $images: String!
    $sosmed: String!
  ) {
    update_table_mhs_by_pk(
      pk_columns: { id: $id }
      _set: {
        nama: $name
        nim: $nim
        prodi: $prodi
        angkatan: $angkatan
        status: $status
        images: $images
        sosmed: $sosmed
      }
    ) {
      id
      nama
      prodi
      angkatan
      nim
      status
      images
      sosmed
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
  const [status, setStatus] = useState('');
  const [images, setImages] = useState('');
  const [sosmed, setSosmed] = useState('');
  const [angkatan, setAngkatan] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 7; // Number of items per page

  const { loading, error, data } = useQuery(GET_STUDENTS, {
    variables: {
      page: (currentPage - 1) * pageSize,
      pageSize: pageSize,
    },
  });

  const handlePageChange = (selected) => {
    const page = selected.selected + 1;
    setCurrentPage(page);
  };

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

  const handleUpdate = () => {
    if (
      selectedStudent &&
      name &&
      nim &&
      prodi &&
      angkatan &&
      status &&
      images &&
      sosmed
    ) {
      updateStudent({
        variables: {
          id: selectedStudent.id,
          name: name,
          nim: parseInt(nim),
          prodi: prodi,
          angkatan: parseInt(angkatan),
          status: status,
          images: images,
          sosmed: sosmed,
        },
      })
        .then(() => {
          setName('');
          setNim('');
          setProdi('');
          setAngkatan('');
          setStatus('');
          setImages('');
          setSosmed('');
          setSelectedStudent(null);
          Swal.fire('Success', 'Data berhasil diupdate', 'success');
          setCurrentPage(1); // Reset to the first page after update
        })
        .catch((error) => {
          Swal.fire('Error', `Data gagal diupdate: ${error.message}`, 'error');
        });
    } else {
      Swal.fire('Error', 'Harap lengkapi semua input', 'error');
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Apakah anda ingin menghapus mahasiswa ini?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteStudent({
          variables: {
            id: id,
          },
        });
      }
    });
  };

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setName(student.nama);
    setNim(student.nim);
    setProdi(student.prodi);
    setAngkatan(student.angkatan);
    setStatus(student.status);
    setImages(student.images);
    setSosmed(student.sosmed);
  };

  useEffect(() => {
    let chart = null;
    if (data) {
      const { table_mhs } = data;
      const students = table_mhs;

      // Count the number of students in each program
      const programCounts = {};
      students.forEach((student) => {
        const { prodi } = student;
        if (programCounts[prodi]) {
          programCounts[prodi] += 1;
        } else {
          programCounts[prodi] = 1;
        }
      });
      // Destroy previous chart if it exists
      if (chart) {
        chart.destroy();
      }

      // Create the chart
      const chartCanvas = document.getElementById('chartCanvas');
      const chartData = {
        labels: Object.keys(programCounts),
        datasets: [
          {
            label: 'Number of Students',
            data: Object.values(programCounts),
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(255, 99, 132, 0.6)',
            ],
            borderWidth: 1,
            borderColor: '#777',
            hoverBorderWidth: 3,
            hoverBorderColor: '#000',
          },
        ],
      };

      chart = new Chart(chartCanvas, {
        type: 'bar',
        data: chartData,
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              precision: 0,
            },
          },
        },
      });
    }
  }, [data]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="flex">
      <Navbar />
      <div className="container flex flex-col mx-auto p-4">
        <div className="w-1/2 mx-auto">
          <h1 className="text-2xl font-bold mb-4">Data Mahasiswa</h1>
          <table className="w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Nama</th>
                <th className="px-4 py-2">NIM</th>
                <th className="px-4 py-2">Program Studi</th>
                <th className="px-4 py-2">Angkatan</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Sosmed</th>
                <th className="px-4 py-2">Linkedin</th>
                <th className="px-4 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.table_mhs.map((student) => (
                <tr key={student.id}>
                  <td className="border px-4 py-2">{student.nama}</td>
                  <td className="border px-4 py-2">{student.nim}</td>
                  <td className="border px-4 py-2">{student.prodi}</td>
                  <td className="border px-4 py-2">{student.angkatan}</td>
                  <td className="border px-4 py-2">{student.status}</td>
                  <td className="border px-4 py-2">{student.images}</td>
                  <td className="border px-4 py-2">{student.sosmed}</td>
                  <td className="px-4 py-2 flex items-center">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                      onClick={() => handleEdit(student)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                      onClick={() => handleDelete(student.id)}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
       {/* Pagination */}
       <div className="flex justify-center mt-4">
          <ReactPaginate
            previousLabel={'Previous'}
            nextLabel={'Next'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={Math.ceil(data.table_mhs_aggregate.aggregate.count / pageSize)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageChange}
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
            forcePage={currentPage} // Add this line
          />
        </div>
        <div className="w-1/2 mx-auto">
          {selectedStudent && (
            <div className="mt-8">
            <h1 className="text-2xl font-bold mb-4">Edit Mahasiswa</h1>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block font-bold mb-1" htmlFor="name">
                  Nama
                </label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="block font-bold mb-1" htmlFor="nim">
                  NIM
                </label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                  type="number"
                  id="nim"
                  value={nim}
                  onChange={(e) => setNim(e.target.value)}
                />
              </div>
              <div>
                <label className="block font-bold mb-1" htmlFor="prodi">
                  Program Studi
                </label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                  id="prodi"
                  value={prodi}
                  onChange={(e) => setProdi(e.target.value)}
                >
                  <option value="">Pilih Program Studi</option>
                  <option value="S1 Teknik Informatika">S1 Teknik Informatika</option>
                  <option value="S1 Sistem Informasi">S1 Sistem Informasi</option>
                  <option value="D3 Manajemen Informatika">D3 Manajemen Informatika</option>
                </select>
              </div>
              <div>
                <label className="block font-bold mb-1" htmlFor="angkatan">
                  Angkatan
                </label>
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
              <div>
                <label className="block font-bold mb-1" htmlFor="status">
                  Status
                </label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="">Pilih Status</option>
                  <option value="Masih Aktif">Masih Aktif</option>
                  <option value="Sudah Lulus">Sudah Lulus</option>
                </select>
              </div>
              <div>
                <label className="block font-bold mb-1" htmlFor="images">
                  Images
                </label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                  type="text"
                  id="images"
                  value={images}
                  onChange={(e) => setImages(e.target.value)}
                />
              </div>
              <div>
                <label className="block font-bold mb-1" htmlFor="sosmed">
                  Sosmed
                </label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                  type="text"
                  id="sosmed"
                  value={sosmed}
                  onChange={(e) => setSosmed(e.target.value)}
                />
              </div>
              <div className="col-span-3">
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleUpdate}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
          )}
        </div>
        <div className="w-1/2 mx-auto">
          <h1 className="text-2xl font-bold mt-8 mb-4">Grafik Program Studi</h1>
          <canvas id="chartCanvas" className="w-1/2 h-64"></canvas>
        </div>
      </div>
    </div>
  );
};

export default Admin;
