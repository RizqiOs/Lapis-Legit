// src/pages/Register.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (!nama || !email || !password) {
      alert('Semua field harus diisi.');
      return;
    }

    alert('Registrasi berhasil!');
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-200 via-blue-200 to-blue-300 p-4">
      <div className="bg-white shadow-2xl rounded-xl w-full max-w-md overflow-hidden">
        {/* Header Form */}
        <div className="bg-sky-400 text-white py-6 text-center text-2xl font-bold">
          Buat Akun Baru
        </div>

        {/* Form */}
        <form onSubmit={handleRegister} className="px-8 py-6 space-y-4">
          <div>
            <label className="block mb-1 text-sm text-gray-700 font-medium">Nama Lengkap</label>
            <input
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              placeholder="Masukkan nama lengkap"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-300"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-700 font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-300"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-700 font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-300"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-sky-500 text-white font-semibold py-2 rounded-md hover:bg-sky-600 transition duration-300"
          >
            Daftar Sekarang
          </button>
        </form>

        {/* Link ke Login */}
        <div className="text-center text-sm text-gray-600 pb-6">
          Sudah punya akun?{' '}
          <span
            onClick={() => navigate('/login')}
            className="text-sky-600 hover:underline cursor-pointer"
          >
            Login di sini
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
