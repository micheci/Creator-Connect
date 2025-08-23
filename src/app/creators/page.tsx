// app/creators/page.tsx
import Link from "next/link";

export default function CreatorsPage() {
  return (
    <main className="min-h-screen flex flex-col items-center bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 pt-24">
      {/* Hero Section */}
      <div className="text-center max-w-2xl mb-10 px-6">
        <h1 className="font-[var(--font-montaga)] text-6xl tracking-tight leading-[1em] mb-6 text-black">
          Start <span className="text-purple-600">Earning Money</span> from Your
          Content
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Get discovered by startups looking for creators like you. Sign up,
          share your social links, and showcase your profile to businesses ready
          to collaborate.
        </p>
        <Link href="/creators/signup">
          <button className="bg-purple-600 hover:bg-purple-700 text-white text-lg px-8 py-3 rounded-xl transition duration-200">
            Sign Up as a Creator
          </button>
        </Link>
        <p className="text-sm text-gray-600 mt-2">
          AI-powered matching with startups coming soon!
        </p>
      </div>

      {/* How it works */}
      <section className="w-full py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-10 text-black">
            How It Works for Creators
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="p-6 rounded-xl shadow-md bg-purple-50">
              <h3 className="text-xl text-black font-semibold mb-2">
                1. Sign Up
              </h3>
              <p className="text-gray-600">
                Provide your social links — no need to manually enter stats.
              </p>
            </div>
            <div className="p-6 rounded-xl shadow-md bg-yellow-50">
              <h3 className="text-xl text-black font-semibold mb-2">
                2. Be Discovered
              </h3>
              <p className="text-gray-600">
                Your profile is added to our database so startups can find you.
              </p>
            </div>
            <div className="p-6 rounded-xl shadow-md bg-pink-50">
              <h3 className="text-xl font-semibold mb-2 text-black">
                3. Collaborate & Earn
              </h3>
              <p className="text-gray-600">
                Start landing collaborations with businesses that fit your
                audience.
              </p>
              <p className="mt-2 text-sm text-gray-500 italic">
                AI matching coming soon!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center">
        <h2 className="text-4xl font-bold mb-4">Ready to Start Earning?</h2>
        <p className="mb-8 text-lg">
          Sign up now and let startups discover your content instantly.
        </p>
        <Link href="/creators/signup">
          <button className="bg-white text-purple-700 hover:bg-gray-100 px-8 py-3 rounded-xl text-lg font-semibold transition duration-200">
            Join as a Creator
          </button>
        </Link>
        <p className="mt-4 text-sm text-white/80">
          AI-powered matching with startups coming soon!
        </p>
      </section>
    </main>
  );
}
