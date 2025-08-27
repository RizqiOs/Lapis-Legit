import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Terima kasih! Pesan Anda telah dikirim.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
          
          {/* Formulir Kontak */}
          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">Kirim Pesan Langsung</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Alamat Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                  Subjek
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Pesan Anda
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium shadow"
              >
                Kirim Pesan
              </button>
            </form>
          </div>

          {/* Informasi Kontak */}
          <div className="space-y-6 sm:space-y-8">
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">Informasi Kontak</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <FaMapMarkerAlt className="text-2xl text-gray-600 mr-4 mt-1" />
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">Alamat</h3>
                    <p className="text-gray-600 mt-1 leading-relaxed">
                      Jl. Teknologi No. 45, Kawasan Industri Digital<br />
                      Jakarta Selatan, DKI Jakarta<br />
                      12620
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaPhoneAlt className="text-2xl text-gray-600 mr-4 mt-1" />
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">Telepon</h3>
                    <p className="text-gray-600 mt-1">+62 812 3456 7890 (WhatsApp)</p>
                    <p className="text-gray-600">+62 21 5555 4444 (Kantor)</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Media Sosial</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <a
                      href="https://instagram.com/perusahaan"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
                    >
                      <FaInstagram className="text-3xl text-pink-600 mr-3" />
                      <span className="text-gray-800 font-medium">Instagram: @perusahaan</span>
                    </a>
                    <a
                      href="https://twitter.com/perusahaan"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
                    >
                      <FaTwitter className="text-3xl text-blue-400 mr-3" />
                      <span className="text-gray-800 font-medium">Twitter: @perusahaan</span>
                    </a>
                    <a
                      href="https://linkedin.com/company/perusahaan"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
                    >
                      <FaLinkedin className="text-3xl text-blue-700 mr-3" />
                      <span className="text-gray-800 font-medium">LinkedIn: Perusahaan</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Lokasi (Placeholder Peta) */}
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Lokasi Kami</h3>
              <div className="bg-gradient-to-br from-blue-50 to-gray-100 h-48 rounded-md flex items-center justify-center text-gray-500 border border-gray-200">
                <span className="text-center">📍 Peta Interaktif (Google Maps)</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm">
          <p>© {new Date().getFullYear()} Perusahaan Anda. Hak Cipta Dilindungi.</p>
        </div>
      </footer>
    </div>
  );
};

export default Contact;