import React from 'react';
import { Link } from 'react-router-dom';

const Jumbotron = () => {
  const jumbotronStyle = {
    backgroundImage: "url('https://images.unsplash.com/photo-1525921429624-479b6a26d84d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29sbGVnZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60')",
    height: '100vh',
  };

  const overlayStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  };

  const buttonStyle = {
    borderRadius: '8px',
    border: '2px solid #F3F4F6',
    padding: '10px 20px',
    fontSize: '14px',
    fontWeight: '500',
    textTransform: 'uppercase',
    color: '#F3F4F6',
    transition: 'all 0.3s ease-in-out',
  };
  return (
    <div>
      <header>
        {/* <!-- Navbar --> */}
        <nav
          className="relative flex w-full items-center justify-between bg-white  text-neutral-600 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 dark:text-neutral-200 md:flex-wrap md:justify-start"
          data-te-navbar-ref
        ></nav>
        <div
          className="relative overflow-hidden bg-cover bg-no-repeat p-12 text-center"
          style={jumbotronStyle}
        >
          <div
            className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
            style={overlayStyle}
          >
            <div className="flex h-full items-center justify-center">
              <div className="text-white">
                <h2 className="mb-4 text-4xl font-semibold">
                  STMIK PPKIA PRADNYA PARAMITA{' '}
                </h2>
                <h4 className="mb-2 text-xl font-semibold">MALANG</h4>
                <p className="mb-6 text-xl font-semibold">
                  Jl. Laksda Adi Sucipto No.249a, Pandanwangi, Kec. Blimbing,
                  Kota Malang, Jawa Timur 65126
                </p>
                <Link to={'/notfound'}>
                  <button
                    type="button"
                    className="rounded border-2 border-neutral-50 px-7 pb-[8px] pt-[10px] text-sm font-medium uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out hover:border-neutral-100 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-neutral-100 focus:border-neutral-100 focus:text-neutral-100 focus:outline-none focus:ring-0 active:border-neutral-200 active:text-neutral-200 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                    style={buttonStyle}
                  >
                    browse here
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Jumbotron;
