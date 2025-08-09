import { useState } from "react";
import { Link } from "react-router-dom";

const mockUser = {
  username: "Rizqi_Okta_Syabani",
  email: "rizkyokta981@gmail.com",
  phone: "",
  address: "",
};

const ProfilePage = () => {
  const [profile, setProfile] = useState(mockUser);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Perubahan disimpan:", profile);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4">
      <div className="max-w-3xl mx-auto flex flex-col space-y-6">
        {/* Avatar & Info User */}
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
          <img
            src="https://ui-avatars.com/api/?name=Rizqi+Okta+Syabani&background=random"
            alt="Avatar"
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <p className="text-lg font-semibold">{profile.username}</p>
            <p className="text-sm text-gray-600">{profile.email}</p>
          </div>
        </div>

        {/* Form Profil */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit}>
            <h2 className="text-xl font-semibold mb-4">Profil Saya</h2>

            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nama
              </label>
              <input
                type="text"
                id="name"
                name="username"
                value={profile.username}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Telepon
              </label>
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
                <select
                  id="countryCode"
                  name="countryCode"
                  className="border border-gray-300 rounded-lg p-2 sm:w-28 mb-2 sm:mb-0"
                >
                  <option value="+62">+62</option>
                  <option value="+1">+1</option>
                  <option value="+44">+44</option>
                </select>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  className="p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Alamat
              </label>
              <textarea
                id="address"
                name="address"
                value={profile.address}
                onChange={handleChange}
                rows="4"
                className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Simpan Perubahan
            </button>
          </form>
        </div>

        {/* Tombol Logout */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <button
            onClick={() => {
              localStorage.removeItem("authToken");
              window.location.href = "/login";
            }}
            className="w-full flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
            </svg>
            Keluar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
