"use client";
import React, { useState, useEffect } from "react";

const steps = [
  {
    imgs: ["/steps/step1.png"],
    text: "Step 1: Sign Up – get started in seconds",
  },
  {
    imgs: ["/steps/Step21.png"],
    text: "Step 2a: Onboarding – describe your startup",
  },
  { imgs: ["/steps/Step2b.png"], text: "Step 2b: Tell us your keywords" },
  { imgs: ["/steps/Step2c.png"], text: "Step 2c: Tell us your niches" },
  {
    imgs: ["/steps/step45.png"],
    text: "Step 3: Our AI matches you with the right creators to promote your product",
  },
  {
    imgs: ["/steps/step4.png"],
    text: "Step 4: Auto-generate a message and send a DM instantly",
  },
  { imgs: [], text: "" }, // Step 5 / CTA
];

const Flow = () => {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const flowSection = document.getElementById("flow-wrapper");
      if (!flowSection) return;

      const rect = flowSection.getBoundingClientRect();
      const scrollTop = -rect.top;
      const sectionHeight = flowSection.offsetHeight - window.innerHeight;

      if (scrollTop >= 0 && scrollTop <= sectionHeight) {
        const stepHeight = sectionHeight / steps.length;
        const currentStep = Math.floor(scrollTop / stepHeight);
        setStepIndex(Math.min(currentStep, steps.length - 1));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const bgColor = stepIndex === 6 ? "bg-gray-900" : "bg-gray-100";
  const textColor = stepIndex === 6 ? "text-white" : "text-black";

  return (
    <section className="w-full transition-colors duration-700">
      <div id="flow-wrapper" className="relative h-[600vh] md:h-[450vh]">
        <div
          className={`sticky top-0 flex flex-col items-center justify-start min-h-screen px-6 pt-12 gap-6 transition-colors duration-700 ${bgColor}`}
        >
          {/* Header */}
          <h2
            className={`text-5xl font-bold text-center transition-opacity duration-700 ${textColor}`}
            style={{ opacity: stepIndex === 6 ? 0 : 1 }}
          >
            How It <span className="text-blue-500">Works</span>
          </h2>

          {/* Step Text */}
          <div className="relative w-full flex flex-col items-center justify-center mb-6 min-h-[100px]">
            {steps.map((step, i) => {
              if (i === 6) return null;
              return (
                <p
                  key={i}
                  className={`absolute text-center transition-opacity duration-700 text-2xl md:text-4xl font-bold ${textColor}`}
                  style={{
                    opacity: stepIndex === i ? 1 : 0,
                    maxWidth: "85%",
                    whiteSpace: "normal",
                  }}
                >
                  {step.text}
                </p>
              );
            })}
          </div>

          {/* Images */}
          <div className="relative w-full flex justify-center items-start mt-2">
            {steps.map((step, i) =>
              step.imgs.length > 0 ? (
                <div
                  key={i}
                  className="absolute flex gap-6 justify-center items-start transition-opacity duration-700"
                  style={{ opacity: stepIndex === i ? 1 : 0 }}
                >
                  {step.imgs.map((img, j) => (
                    <img
                      key={j}
                      src={img}
                      alt={`Step ${i}-${j}`}
                      className="mx-auto rounded-xl shadow-lg object-cover transition-opacity duration-700"
                      style={{
                        marginTop: "-20px",
                        maxHeight:
                          i === 5 ? "400px" : i === 4 ? "450px" : "none",
                        width: "90%",
                        maxWidth:
                          i === 4 ? "600px" : i === 5 ? "400px" : "100%",
                        height: "auto",
                      }}
                    />
                  ))}
                </div>
              ) : null
            )}
          </div>

          {/* Step 5 CTA */}
          {stepIndex === 6 && (
            <div className="absolute top-1/4 left-0 w-full flex flex-col items-center justify-start px-6">
              <p className="text-5xl md:text-7xl font-extrabold text-center text-white mb-4">
                Step 5
              </p>
              <p
                className="text-6xl md:text-8xl font-extrabold text-center text-blue-400 tracking-tight"
                style={{ fontFamily: "'Chewy', cursive" }}
              >
                Stop Waiting, Start Growing
              </p>
              <p
                className="text-7xl md:text-9xl font-black mt-6 tracking-wide text-center text-blue-300"
                style={{ fontFamily: "'Chewy', cursive" }}
              >
                MORE SALES TODAY
              </p>

              {/* Sign Up Button */}
              <button className="mt-12 px-8 py-4 text-2xl md:text-3xl font-bold text-white bg-blue-500 rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300">
                Get More Customers
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Flow;
