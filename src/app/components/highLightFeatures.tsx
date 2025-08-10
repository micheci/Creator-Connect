import {
  FaUsers,
  FaEnvelopeOpenText,
  FaSearch,
  FaRobot,
  FaHandshake,
} from "react-icons/fa";

export default function Highlights() {
  const features = [
    {
      icon: <FaUsers className="text-indigo-500 text-4xl" />,
      title: "Creators Without the Chase",
      description: "Skip the cold DMs — find your perfect match instantly.",
    },
    {
      icon: <FaEnvelopeOpenText className="text-green-500 text-4xl" />,
      title: "Ditch the Inbox Overload",
      description: "Say goodbye to long email chains and ghosted replies.",
    },
    {
      icon: <FaSearch className="text-pink-500 text-4xl" />,
      title: "Search-Free Discovery",
      description: "No hashtags, no endless scroll — just results.",
    },
    {
      icon: <FaRobot className="text-yellow-500 text-4xl" />,
      title: "Automated Outreach & Follow-Up",
      description: "Your AI rep works while you sleep.",
    },
    {
      icon: <FaHandshake className="text-blue-500 text-4xl" />,
      title: "From Search to Onboard",
      description: "Matches, outreach, and closing — all in one place.",
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 py-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {features.map((feature, idx) => (
        <div
          key={idx}
          className="bg-white shadow-lg rounded-2xl p-6 text-center hover:shadow-xl transition-transform duration-300 hover:-translate-y-2"
        >
          <div className="mb-4 flex justify-center">{feature.icon}</div>
          <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
          <p className="text-gray-600">{feature.description}</p>
        </div>
      ))}
    </section>
  );
}
