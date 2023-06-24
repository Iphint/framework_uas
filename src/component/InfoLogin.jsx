import React from 'react';
import {
  Drawer,
  Button,
  Typography,
  IconButton,
} from '@material-tailwind/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const AdminInfo = () => {
  const [open, setOpen] = React.useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  const sendEmail = () => {
    window.location.href = 'mailto:zaynm7719@gmail.com';
  };

  const sendWhatsApp = () => {
    const phoneNumber = '+6281357639361';
    const message = 'Halo, saya membutuhkan bantuan untuk akses data mahasiswa.';
  
    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <React.Fragment>
      <span className="text-red-700 cursor-pointer hover:text-green-500" onClick={openDrawer}>Administrator</span>
      <Drawer open={open} onClose={closeDrawer} className="p-4">
        <div className="mb-6 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
            Administrator helpdesk
          </Typography>
          <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
            <XMarkIcon strokeWidth={2} className="h-5 w-5" />
          </IconButton>
        </div>
        <Typography color="gray" className="mb-8 pr-4 font-normal">
          Pesan dari Administrator: "Halo Mahasiswa, Kami ingin mengingatkan
          Anda bahwa jika Anda mengalami masalah saat mencoba untuk login ke
          akun mahasiswa Anda, kami di sini untuk membantu Anda. Kami memahami
          bahwa login yang lancar adalah kunci untuk akses ke berbagai layanan
          penting di platform kami. Jangan ragu untuk menghubungi kami jika Anda
          menghadapi kesulitan saat login. Kami siap memberikan bantuan dan
          panduan yang Anda butuhkan. Tim kami terlatih dan siap untuk menjawab
          pertanyaan Anda, memecahkan masalah, dan memastikan bahwa Anda dapat
          login dengan sukses.
        </Typography>
        <div className="flex gap-2">
          <Button size="sm" onClick={sendWhatsApp}>Whatsapp</Button>
          <Button size="sm" variant="outlined" onClick={sendEmail}>
            Email
          </Button>
        </div>
      </Drawer>
    </React.Fragment>
  );
};

export default AdminInfo;
