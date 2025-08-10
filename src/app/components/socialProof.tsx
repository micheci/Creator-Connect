import { useEffect } from "react";

export default function SocialProof() {
  useEffect(() => {
    // If the Twitter script is not loaded, add it
    if (!window.twttr) {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      document.body.appendChild(script);
    } else {
      // If script is already loaded, trigger a re-parse
      window.twttr.widgets.load();
    }
  }, []);

  return (
    <div>
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
  );
}
