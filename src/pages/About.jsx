import React from "react";

const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-green-100 to-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 font-serif mb-6">
            Tentang Lapis Legit Kedaton
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Menyajikan kelezatan lapis legit tradisional dengan resep turun-temurun,
            dibuat dengan cinta dan bahan-bahan terbaik untuk momen spesial Anda.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-gray-800 font-serif text-center mb-8">
            Kisah Kami
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gray-600 text-lg leading-relaxed text-justify">
                Lapis Legit Kedaton didirikan dengan semangat untuk melestarikan
                warisan kuliner Indonesia. Berawal dari resep keluarga yang telah
                diwariskan selama tiga generasi, kami menghadirkan lapis legit
                dengan cita rasa autentik yang memadukan kelembutan tekstur dan
                kekayaan rasa. Setiap lapisan kue kami dibuat dengan tangan oleh
                pengrajin terampil, menggunakan bahan-bahan premium seperti mentega
                asli, telur segar, dan rempah-rempah pilihan.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mt-4 text-justify">
                Kami percaya bahwa setiap gigitan harus membawa kehangatan dan
                kenangan akan rumah. Itulah mengapa kami berkomitmen untuk
                menjaga kualitas dan tradisi dalam setiap kue yang kami buat.
              </p>
            </div>
            <div>
              <img
                src="https://source.unsplash.com/600x400/?traditional-cake"
                alt="Lapis Legit Preparation"
                className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-md hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-gray-800 font-serif text-center mb-10">
            Nilai Kami
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 text-center">
              <h4 className="text-xl font-semibold text-gray-800 mb-3">
                Kualitas Terjamin
              </h4>
              <p className="text-gray-600">
                Kami hanya menggunakan bahan-bahan terbaik untuk memastikan
                setiap kue memiliki rasa dan tekstur yang sempurna.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 text-center">
              <h4 className="text-xl font-semibold text-gray-800 mb-3">
                Tradisi Autentik
              </h4>
              <p className="text-gray-600">
                Setiap kue dibuat dengan resep turun-temurun, menjaga cita rasa
                asli lapis legit Indonesia.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 text-center">
              <h4 className="text-xl font-semibold text-gray-800 mb-3">
                Pelayanan Tulus
              </h4>
              <p className="text-gray-600">
                Kami berkomitmen untuk memberikan pengalaman terbaik bagi pelanggan,
                dari pemesanan hingga pengiriman.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
