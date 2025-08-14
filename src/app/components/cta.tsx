import React from "react";

const Flow = () => {
  return (
    <section className="w-full py-20 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-4xl font-bold mb-6 leading-snug">
          Get <span className="text-blue-400">More Sales</span>,
          <span className="text-blue-400"> More Views</span>, and{" "}
          <span className="text-blue-400"> More Customers</span> — All Through
          Creators Who <span className="text-blue-400">Promote You</span>
        </h2>

        {/* Subheading */}
        <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-10">
          We connect you with the{" "}
          <span className="text-blue-400 font-semibold">right influencers</span>
          who can put your product in front of thousands of buyers instantly.
          Forget the cold outreach — let them{" "}
          <span className="text-blue-400 font-semibold">
            do the selling for you
          </span>
          .
        </p>

        {/* Call to Action */}
        <div className="mt-10">
          <a
            href="/signup"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold text-xl px-8 py-4 rounded-lg shadow-lg transition duration-200"
          >
            Start Finding Creators Today 🚀
          </a>
          <p className="mt-3 text-gray-400 text-sm">
            Sign up in seconds. No credit card required.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Flow;
