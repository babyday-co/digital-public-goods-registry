import VerifyForm from "@/components/VerifyForm";

export const metadata = {
  title: "Verify Knowledge | BabyDay Registry",
};

export default function VerifyPage() {
  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">
        Verify Knowledge
      </h1>
      <p className="text-sm text-gray-500 mb-6">
        Paste any content below to check whether it matches a record in the
        registry. The SHA-256 hash of your input will be compared against
        on-chain entries.
      </p>
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <VerifyForm />
      </div>
    </div>
  );
}
