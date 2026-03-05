import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-10">
      {/* Hero */}
      <section className="text-center py-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          BabyDay Digital Public Goods Registry
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Verifying and attributing trusted child-health knowledge through
          blockchain technology.
        </p>
      </section>

      {/* What is BabyDay */}
      <section className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          What is BabyDay?
        </h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          BabyDay is a parenting support platform focused on newborn and early
          childhood care. We connect parents with trusted, expert-vetted
          guidance on newborn health, feeding, development milestones, and more.
          In a world flooded with unverified information, BabyDay ensures every
          piece of knowledge is authentic, attributed, and tamper-proof.
        </p>
      </section>

      {/* Why Blockchain */}
      <section className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Why Blockchain for Public Goods?
        </h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          Digital public goods — freely available knowledge resources — must be
          trustworthy and attributable. Traditional databases can be altered
          without trace. Blockchain provides:
        </p>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-start gap-2">
            <span className="text-blue-500 font-bold mt-0.5">✓</span>
            <span>
              <strong>Content integrity</strong> — a SHA-256 hash of every
              knowledge entry is stored on-chain, making any modification
              immediately detectable.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 font-bold mt-0.5">✓</span>
            <span>
              <strong>Transparent attribution</strong> — contributor identity
              and timestamp are permanently recorded.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 font-bold mt-0.5">✓</span>
            <span>
              <strong>Tamper-resistant verification</strong> — anyone can
              independently verify that a piece of content matches its
              on-chain record.
            </span>
          </li>
        </ul>
      </section>

      {/* How it works */}
      <section className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          How the Demo Works
        </h2>
        <ol className="space-y-3">
          {[
            "Contributor submits child-health knowledge content",
            "A SHA-256 cryptographic hash is generated from the content",
            "The hash is sent to the KnowledgeRegistry smart contract on Ethereum",
            "Content is stored off-chain in SQLite for fast retrieval",
            "Anyone can paste content and verify its hash against the registry",
          ].map((step, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-semibold text-xs">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </section>

      {/* CTA */}
      <section className="flex flex-wrap gap-3 justify-center">
        <Link
          href="/submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          Submit Knowledge →
        </Link>
        <Link
          href="/registry"
          className="bg-white text-blue-600 border border-blue-600 px-6 py-3 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors"
        >
          View Registry →
        </Link>
        <Link
          href="/verify"
          className="bg-white text-gray-700 border border-gray-300 px-6 py-3 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          Verify Content →
        </Link>
      </section>
    </div>
  );
}
