import React, { useState } from 'react';
import { Card, Input, Button, Typography } from '@material-tailwind/react';
import AdminInfo from './InfoLogin';
import { GraphQlClient } from '../api/Graph';
import { gql } from '@apollo/client';
import { useEffect } from 'react';

const FormLoginSiswa = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const LOGIN_QUERY = gql`
        query GetStudent($email: String!, $password: String!) {
          table_mhs(
            where: { email: { _eq: $email }, password: { _eq: $password } }
          ) {
            id
            email
            angkatan
            images
            nama
            nim
            password
            prodi
            sosmed
            status
          }
        }
      `;

      const { data, errors } = await GraphQlClient.query({
        query: LOGIN_QUERY,
        variables: { email, password },
      });

      if (errors) {
        setError('Invalid email or password');
        return;
      }

      const student = data.table_mhs[0];
      if (student) {
        // Login successful
        console.log('Login successful', student);
        localStorage.setItem(
          'token',
          'vvisidfnu2312i3ui23b12b313bu123biu1u3b1iu3bu'
        );
        localStorage.setItem('name', student.nama);
        localStorage.setItem('images', student.images);
        window.location.replace('/daftarsiswa');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      console.error('Error occurred during login:', error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      window.location.replace('/daftarsiswa');
    }
  }, []);

  return (
    <div className="flex justify-center flex-col items-center h-screen">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Login Mahasiswa
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Masukkan detail Anda untuk login.
        </Typography>
        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={handleSubmit}
        >
          <div className="mb-4 flex flex-col gap-6">
            <Input
              size="lg"
              label="Email"
              value={email}
              onChange={handleEmailChange}
            />
            <Input
              type="password"
              size="lg"
              label="Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <Button type="submit" className="mt-6" fullWidth>
            Login
          </Button>
          {error && (
            <Typography color="red" className="mt-4 text-center font-normal">
              {error}
            </Typography>
          )}
          <Typography color="gray" className="mt-4 text-center font-normal">
            Sudah memiliki akun? Hubungi kami saja.
          </Typography>
        </form>
      </Card>
      <AdminInfo />
    </div>
  );
};

export default FormLoginSiswa;
