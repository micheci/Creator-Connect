import { useEffect } from "react";

declare global {
  interface Window {
    twttr?: {
      widgets: {
        load: () => void;
      };
    };
  }
}

export default function SocialProof() {
  useEffect(() => {
    if (!window.twttr) {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      document.body.appendChild(script);
    } else {
      window.twttr.widgets.load();
    }
  }, []);

  return (
    <section className="max-w-5xl mx-auto px-4">
      <h2 className="text-4xl sm:text-5xl text-black font-bold text-center mb-2">
        What people are <span className="text-blue-600">saying</span>
      </h2>
      <p className="text-center text-gray-600 mb-6 text-sm sm:text-base">
        <span className="text-blue-600">Real tweets</span> from users and the
        community.
      </p>

      {/* Responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <blockquote className="twitter-tweet">
          <a href="https://twitter.com/maoxai_/status/1952696079301927205"></a>
        </blockquote>

        <blockquote className="twitter-tweet">
          <a href="https://twitter.com/fritz1707/status/1944077334958559574"></a>
        </blockquote>

        <blockquote className="twitter-tweet">
          <a href="https://twitter.com/TeeDevh/status/1909616447770575071"></a>
        </blockquote>

        <blockquote className="twitter-tweet">
          <a href="https://twitter.com/Ox_Vee/status/1947699143545131285"></a>
        </blockquote>

        <blockquote className="twitter-tweet">
          <a href="https://twitter.com/ivesparrowai/status/1935315451321475232"></a>
        </blockquote>

        <blockquote className="twitter-tweet">
          <a href="https://twitter.com/vivek7405/status/1819914285083943423"></a>
        </blockquote>
      </div>
    </section>
  );
}
