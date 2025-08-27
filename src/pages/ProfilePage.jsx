import { useState } from "react";
import { User, Mail, Phone, MapPin, Save, LogOut, Camera, Edit3, Check, X } from "lucide-react";

const mockUser = {
  username: "Rizqi Okta Syabani",
  email: "rizkyokta981@gmail.com",
  phone: "812345678901",
  address: "Jl. Sudirman No. 123, Jakarta Selatan, DKI Jakarta 12190",
  countryCode: "+62"
};

const ProfilePage = () => {
  const [profile, setProfile] = useState(mockUser);
  const [isEditing, setIsEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState(mockUser);
  const [isSaving, setIsSaving] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => {
    setTempProfile(profile);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setTempProfile(profile);
    setIsEditing(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setProfile(tempProfile);
    setIsEditing(false);
    setIsSaving(false);
    console.log("Profil berhasil disimpan:", tempProfile);
  };

  const handleLogout = () => {
    // Remove auth token and redirect
    localStorage.removeItem("authToken");
    window.location.href = "/login";
  };

  const currentProfile = isEditing ? tempProfile : profile;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Profil Saya</h1>
            <p className="text-gray-600">Kelola informasi profil dan preferensi akun Anda</p>
          </div>

          {/* Profile Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
            {/* Cover Section */}
            <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600 relative">
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            </div>

            {/* Profile Info */}
            <div className="relative px-8 pb-8">
              {/* Avatar */}
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between -mt-16 mb-6">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gradient-to-br from-blue-400 to-indigo-500">
                    <img
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(profile.username)}&background=4f46e5&color=ffffff&size=128&font-size=0.4`}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button className="absolute bottom-2 right-2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors">
                    <Camera className="w-4 h-4 text-gray-600" />
                  </button>
                </div>

                <div className="mt-4 sm:mt-0">
                  {!isEditing ? (
                    <button
                      onClick={handleEdit}
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Edit3 className="w-4 h-4 mr-2" />
                      Edit Profil
                    </button>
                  ) : (
                    <div className="flex space-x-3">
                      <button
                        onClick={handleCancel}
                        className="inline-flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Batal
                      </button>
                      <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                      >
                        {isSaving ? (
                          <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <Check className="w-4 h-4 mr-2" />
                        )}
                        {isSaving ? "Menyimpan..." : "Simpan"}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* User Info */}
              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{profile.username}</h2>
                  <p className="text-gray-600 mt-1">{profile.joinDate}</p>
                </div>

                {/* Quick Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Mail className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-sm font-medium text-gray-900 truncate">{profile.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Phone className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Telepon</p>
                      <p className="text-sm font-medium text-gray-900">
                        {profile.phone ? `${profile.countryCode} ${profile.phone}` : "Belum diisi"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Alamat</p>
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {profile.address || "Belum diisi"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Edit Form */}
          {isEditing && (
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Edit Informasi Profil</h3>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={currentProfile.username}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Masukkan nama lengkap"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={currentProfile.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="name@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Nomor Telepon
                  </label>
                  <div className="flex">
                    <select
                      name="countryCode"
                      value={currentProfile.countryCode}
                      onChange={handleChange}
                      className="px-4 py-3 border border-gray-300 border-r-0 rounded-l-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                    >
                      <option value="+62">🇮🇩 +62</option>
                      <option value="+1">🇺🇸 +1</option>
                      <option value="+44">🇬🇧 +44</option>
                      <option value="+65">🇸🇬 +65</option>
                      <option value="+60">🇲🇾 +60</option>
                    </select>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={currentProfile.phone}
                      onChange={handleChange}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-r-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="812345678901"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                    Alamat Lengkap
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={currentProfile.address}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    placeholder="Masukkan alamat lengkap Anda..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* Logout Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Pengaturan Akun</h3>
            <div className="border-t pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-medium text-gray-900">Keluar dari Akun</h4>
                  <p className="text-sm text-gray-600 mt-1">Anda akan dialihkan ke halaman login</p>
                </div>
                <button
                  onClick={() => setShowLogoutConfirm(true)}
                  className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  Keluar
                </button>
              </div>
            </div>
          </div>

          {/* Logout Confirmation Modal */}
          {showLogoutConfirm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl p-8 max-w-md w-full">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Konfirmasi Keluar</h3>
                <p className="text-gray-600 mb-6">Apakah Anda yakin ingin keluar dari akun?</p>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setShowLogoutConfirm(false)}
                    className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-xl hover:bg-gray-400 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
                  >
                    Ya, Keluar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;