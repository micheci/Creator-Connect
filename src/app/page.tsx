"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import HighlightFeatures from "./components/highLightFeatures";
import SocialProof from "./components/socialProof";
import Cta from "./components/cta";
import Flow from "./components/flow";
import Footer from "./components/footer";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";

export default function Home() {
  const tiktokVideos = [
    "/videos/tiktok1.mp4",
    "/videos/tiktok2.mp4",
    "/videos/tiktok3.mp4",
    "/videos/tiktok4.mp4",
    "/videos/tiktok5.mp4",
    "/videos/tiktok6.mp4",
    "/videos/tiktok7.mp4",
    "/videos/tiktok8.mp4",
    "/videos/tiktok9.mp4",
    "/videos/tiktok10.mp4",
    "/videos/tiktok11.mp4",
  ];

  return (
    <div>
      <div className="w-full h-3 bg-black shadow-md"></div>

      <main className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 pt-24">
        {/* Hero Section */}
        <div className="text-center max-w-2xl mb-4">
          <h1 className="text-6xl text-black font-extrabold mb-6 leading-tight">
            Find the Right <span className="text-blue-600">Creators</span> in
            Minutes
          </h1>

          <p className="text-lg text-gray-700 mb-8">
            Stop wasting hours scrolling. Instantly discover{" "}
            <span className="text-blue-600 font-medium">
              creators who fit your niche
            </span>{" "}
            and get{" "}
            <span className="text-blue-600 font-medium">
              AI-crafted outreach messages
            </span>{" "}
            ready to send today. Soon, our AI matching engine will pair you with{" "}
            <span className="text-blue-600 font-medium">
              your perfect brand partners
            </span>{" "}
            automatically.
          </p>

          <Link id="top" href="/login">
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-3 rounded-xl transition duration-200">
              Start Finding Creators
            </button>
          </Link>

          <p className="text-sm text-gray-600 mb-2">
            Browse{" "}
            <span className="font-semibold text-blue-600">
              1000+ verified profiles
            </span>
          </p>
        </div>

        {/* Swiper Carousel */}
        <div className="w-full max-w-screen-2xl mx-auto">
          <Swiper
            modules={[Autoplay]}
            slidesPerView={5}
            centeredSlides={true}
            spaceBetween={50}
            loop={true}
            autoplay={true}
            allowTouchMove={false}
          >
            {tiktokVideos.map((src, index) => (
              <SwiperSlide key={index}>
                <div className="rounded-xl h-72 w-48 flex items-center justify-center">
                  <video
                    src={src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="rounded-xl w-full h-full object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}

            <style jsx>{`
              .swiper-slide {
                transition: transform 0.3s ease;
                transform: scale(1);
              }
              .swiper-slide-active {
                transform: scale(1.05);
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
    </div>
  );
}
