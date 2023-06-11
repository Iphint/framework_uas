import React, { useEffect, useState } from 'react';
import Navbar from '../component/Navbar';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Proses pengiriman data formulir atau tindakan lainnya di sini
    console.log(formData);
    // Reset formulir setelah pengiriman berhasil
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitted(true);

    const scriptURL =
      'https://script.google.com/macros/s/AKfycbyDN9RBkLhPu9XziK2PqCwxniTJtgPaf1tr0G_wEO9eICnfFoxNlFv95uBOQ-bqIFz4/exec';
    const form = new FormData();
    form.append('name', formData.name);
    form.append('email', formData.email);
    form.append('message', formData.message);

    fetch(scriptURL, { method: 'POST', body: form })
      .then((response) => {
        console.log('Success!', response);
        // Tampilkan konfirmasi setelah pengiriman berhasil
        setIsSubmitted(true);
      })
      .catch((error) => {
        console.error('Error!', error.message);
        // Setel kembali state jika terjadi kesalahan
        setIsSubmitted(false);
      });
  };

  useEffect(() => {
    let timeout;
    if (isSubmitted) {
      timeout = setTimeout(() => {
        setIsSubmitted(false);
      }, 4000);
    }

    return () => clearTimeout(timeout);
  }, [isSubmitted]);

  return (
    <div>
      <Navbar />
      <div className="max-w-md mx-auto my-10 bg-white shadow p-8">
        <h2 className="text-xl font-bold mb-4">Contact Form</h2>
        {isSubmitted ? (
          <p className="text-green-500 mb-4 text-center">
          <svg
            className="mx-auto h-12 w-12 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span className="font-bold">Message sent successfully!!!</span>
        </p>
        ) : null}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-bold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-gray-700 font-bold mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;