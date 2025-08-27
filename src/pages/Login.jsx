// src/pages/Login.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Email dan password harus diisi.");
      return;
    }

    alert("Login berhasil!");
    navigate("/");
  };

  const handleGoogleLogin = () => {
    alert("Fitur login Google belum terhubung.");
  };

  const handleFacebookLogin = () => {
    alert("Fitur login Facebook belum terhubung.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-200 via-blue-200 to-blue-300 p-4">
      <div className="bg-white shadow-2xl rounded-xl w-full max-w-md overflow-hidden">
        {/* Header Form */}
        <div className="bg-sky-400 text-white py-6 text-center text-2xl font-bold">
          Login
        </div>

        {/* Form Login */}
        <form onSubmit={handleLogin} className="px-8 py-6 space-y-4">
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-300"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-300"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-sky-500 text-white font-semibold py-2 rounded-md hover:bg-sky-600 transition"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center mt-2">
          <Link to="/forgot-password" className="text-sky-600 hover:underline">
            Lupa password?
          </Link>
        </p>

        {/* Opsi Login Sosial */}
        <div className="px-8">
          <div className="my-4 text-center text-sm text-gray-600">
            atau login dengan
          </div>

          <div className="flex flex-col space-y-2">
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
            >
              <i className="fab fa-google mr-2"></i> Google
            </button>
            <button
              onClick={handleFacebookLogin}
              className="w-full flex items-center justify-center bg-blue-800 text-white py-2 rounded hover:bg-blue-900 transition"
            >
              <i className="fab fa-facebook mr-2"></i> Facebook
            </button>
          </div>
        </div>

        {/* Navigasi ke Register */}
        <div className="text-center text-sm text-gray-600 py-6">
          Belum punya akun?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-sky-600 hover:underline cursor-pointer"
          >
            Daftar di sini
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
