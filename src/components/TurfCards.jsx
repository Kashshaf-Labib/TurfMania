import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const TurfCards = ({ headline, turfs }) => {
  return (
    <div className="my-16 relative">
      <h2 className="text-5xl text-center font-bold my-5 text-green-700">
        {headline}
      </h2>
      <div className="ml-10 mr-10">
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 3, spaceBetween: 30 },
            1024: { slidesPerView: 4, spaceBetween: 40 },
          }}
          modules={[Pagination]}
          className="swiper-wrapper"
        >
          {turfs.map(turf => (
            <SwiperSlide key={turf._id} className="swiper-slide">
              <Link
                to={`/turf/${turf._id}`}
                className="block rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300"
              >
                <img
                  className="w-full h-64 object-cover"
                  src={turf.imageURL}
                  alt={turf.name}
                />
                <div className="p-4">
                  <h1 className="text-xl font-bold text-gray-800 mb-2">
                    {turf.name}
                  </h1>
                  <p className="text-sm text-gray-600">{turf.location}</p>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TurfCards;
