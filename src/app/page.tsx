"use client";

import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({ name: "", email: "", description: "" });
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/startup", {
      method: "POST",
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setSubmitted(true);
      setForm({ name: "", email: "", description: "" });
    }
  }

  return (
    <main className="max-w-xl mx-auto mt-20 p-4">
      <h1 className="text-2xl font-bold mb-4">Startup Creator Match</h1>

      {submitted ? (
        <p className="text-green-600">Thanks! We’ll reach out soon.</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full p-2 border rounded"
            placeholder="Your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            className="w-full p-2 border rounded"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <textarea
            className="w-full p-2 border rounded"
            placeholder="Tell us about your startup"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </form>
      )}
    </main>
  );
}
