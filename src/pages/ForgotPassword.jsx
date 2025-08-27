// src/pages/ForgotPassword.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Di sini nanti kamu bisa kirim ke backend atau Firebase
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-sky-100 to-sky-200 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-sky-600 mb-6">Reset Password</h2>

        {submitted ? (
          <div className="text-center text-green-600">
            Link reset password telah dikirim ke <strong>{email}</strong>
            <p className="mt-4">
              <Link to="/login" className="text-sky-600 hover:underline">Kembali ke login</Link>
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <label className="block text-sm font-medium mb-1" htmlFor="email">Masukkan Email</label>
            <input
              type="email"
              id="email"
              className="w-full border rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-sky-400"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-sky-500 text-white py-2 rounded hover:bg-sky-600 transition"
            >
              Kirim Link Reset
            </button>
            <p className="text-sm text-center mt-4">
              <Link to="/login" className="text-sky-600 hover:underline">Batal dan kembali ke login</Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
