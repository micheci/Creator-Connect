"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import HighlightFeatures from "./components/highLightFeatures";
import SocialProof from "./components/socialProof";
import Cta from "./components/cta";
import Flow from "./components/flow";
import Footer from "./components/footer";

export default function Home() {
  // Sample cards content
  const cards = [
    { id: 1, title: "Creator A" },
    { id: 2, title: "Creator B" },
    { id: 3, title: "Creator C" },
    { id: 4, title: "Creator D" },
    { id: 5, title: "Creator E" },
    { id: 6, title: "Creator A" },
    { id: 7, title: "Creator B" },
    { id: 8, title: "Creator C" },
    { id: 9, title: "Creator D" },
    { id: 10, title: "Creator E" },
    { id: 11, title: "Creator A" },
    { id: 12, title: "Creator B" },
    { id: 13, title: "Creator C" },
    { id: 14, title: "Creator D" },
    { id: 15, title: "Creator E" },
    { id: 16, title: "Creator E" },
    { id: 17, title: "Creator A" },
    { id: 18, title: "Creator B" },
    { id: 19, title: "Creator C" },
    { id: 20, title: "Creator D" },
    { id: 21, title: "Creator 12" },
  ];

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 ">
      <div className="text-center max-w-2xl mb-4">
        <h1 className="text-6xl text-black font-extrabold mb-6 leading-tight">
          Instantly Match With Your{" "}
          <span className="text-blue-600">Ideal Creators</span>
        </h1>

        <p className="text-lg text-gray-700 mb-8">
          It&apos;s{" "}
          <span className="text-blue-600 font-medium">super easy</span> and{" "}
          <span className="text-blue-600 font-medium">fun</span> — discover{" "}
          <span className="text-blue-600 font-medium">niche creators</span> and
          let our <span className="text-blue-600 font-medium">AI</span> handle
          the outreach for you.
        </p>

        {/* Button */}
        <Link id="top" href="/login">
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-3 rounded-xl transition duration-200 mb-3">
            Find Creators
          </button>
        </Link>

        {/* Small text under button */}
        <p className="text-sm text-gray-600 mt-1">
          Browse{" "}
          <span className="font-semibold text-blue-600">1000+ creators</span>
        </p>
      </div>

      {/* Swiper Carousel */}
      <div className="w-full max-w-screen-2xl mx-auto">
        {" "}
        <Swiper
          slidesPerView={6}
          centeredSlides={true}
          spaceBetween={180}
          loop={true}
        >
          {cards.map(({ id, title }) => (
            <SwiperSlide key={id}>
              <div className="card rounded-xl bg-white shadow-lg p-6 h-72 w-48 flex items-center justify-center transition-transform duration-300">
                <h3 className="text-xl font-semibold text-center">{title}</h3>
              </div>
            </SwiperSlide>
          ))}

          {/* Custom CSS via JSX style tag */}
          <style jsx>{`
            .swiper-slide {
              transition: transform 0.3s ease;
              transform: scale(1);
            }
            .swiper-slide-active {
              transform: scale(1.2);
              z-index: 10;
            }
          `}</style>
        </Swiper>
      </div>

      <HighlightFeatures />
      <SocialProof />
      <Flow />
      <Cta />
      <Footer />
    </main>
  );
}
