"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const steps = ["productUrl", "description", "keywords", "niches"];

const niches = [
  "🤖 AI",
  "💪 Fitness",
  "📣 Marketing",
  "🎨 Design",
  "🛍️ Ecom",
  "✈️ Travel",
  "👾 Gaming",
  "📊 Finance",
  "🎵 Music",
  "👗 Fashion",
  "💄 Beauty",
  "💼 Career",
  "🧠 Mental Health",
  "🎬 Editing",
];

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    product_url: "",
    description: "",
    target_keywords: "",
    target_niches: [] as string[],
  });

  const router = useRouter();

  const handleNext = () => {
    if (step < steps.length - 1) setStep(step + 1);
    else handleSubmit();
  };
  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const toggleNiche = (niche: string) => {
    setForm((prev) => ({
      ...prev,
      target_niches: prev.target_niches.includes(niche)
        ? prev.target_niches.filter((n) => n !== niche)
        : [...prev.target_niches, niche],
    }));
  };

  const handleSubmit = async () => {
    const cleanedKeywords = form.target_keywords
      .split(",")
      .map((k) => k.trim().toLowerCase());

    const cleanedNiches = form.target_niches.map((niche) =>
      niche
        .replace(/[^\p{L}\p{N}\s]/gu, "")
        .toLowerCase()
        .trim()
    );

    await fetch("/api/startup/onboarding", {
      method: "PUT",
      body: JSON.stringify({
        ...form,
        target_keywords: cleanedKeywords,
        target_niches: cleanedNiches,
      }),
    });

    router.push("/matches");
  };

  return (
    <main className="max-w-xl mx-auto mt-20 p-4">
      <h1 className="text-2xl font-bold mb-4">Startup Onboarding</h1>

      {step === 0 && (
        <div>
          <p className="mb-2 font-semibold">Your product’s website or URL:</p>
          <input
            type="url"
            value={form.product_url}
            onChange={(e) => setForm({ ...form, product_url: e.target.value })}
            className="w-full p-2 border rounded"
            placeholder="https://example.com"
            required
          />
        </div>
      )}

      {step === 1 && (
        <div>
          <p className="mb-2 font-semibold">Brief product description:</p>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full p-2 border rounded"
            placeholder="Tell us what your product does..."
            rows={4}
            required
          />
        </div>
      )}

      {step === 2 && (
        <div>
          <p className="mb-2 font-semibold">
            Target keywords (comma-separated):
          </p>
          <input
            value={form.target_keywords}
            onChange={(e) =>
              setForm({ ...form, target_keywords: e.target.value })
            }
            className="w-full p-2 border rounded"
            placeholder="e.g. AI, productivity, startup tools"
          />
        </div>
      )}

      {step === 3 && (
        <div>
          <p className="mb-2 font-semibold">Choose your target niches:</p>
          <div className="flex flex-wrap gap-2">
            {niches.map((niche) => (
              <button
                key={niche}
                onClick={() => toggleNiche(niche)}
                className={`px-3 py-1 rounded border ${
                  form.target_niches.includes(niche)
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }`}
              >
                {niche}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 flex justify-between">
        {step > 0 && (
          <button
            onClick={handleBack}
            className="bg-gray-300 text-black px-4 py-2 rounded"
          >
            Back
          </button>
        )}

        <button
          onClick={handleNext}
          className="bg-blue-600 text-white px-4 py-2 rounded ml-auto"
        >
          {step === steps.length - 1 ? "Finish" : "Next"}
        </button>
      </div>
    </main>
  );
}
