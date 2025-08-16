import React from "react";

const Flow = () => {
  return (
    <section id="flow" className="w-full py-16 text-black bg-gray-100">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-5xl font-bold ">
          How It <span className="text-blue-500">Works</span>
        </h2>
        {/* Small supporting sentence */}
        <p className="text-center text-gray-600 text-lg mt-2 mb-8">
          Watch how{" "}
          <span className="text-blue-600">creators can amplify your reach</span>{" "}
          in just a <span className="text-blue-600">few simple steps.</span>
        </p>
        {/* Image */}
        <img
          src="/screenshots/FinalFlow.png"
          alt="How It Works"
          className="mx-auto rounded-lg shadow-lg mb-4"
        />
      </div>
    </section>
  );
};

export default Flow;
