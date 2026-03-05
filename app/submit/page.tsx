import KnowledgeForm from "@/components/KnowledgeForm";

export const metadata = {
  title: "Submit Knowledge | BabyDay Registry",
};

export default function SubmitPage() {
  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">
        Submit Knowledge
      </h1>
      <p className="text-sm text-gray-500 mb-6">
        Contribute child-health knowledge. Your submission will be hashed and
        registered on the Ethereum blockchain.
      </p>
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <KnowledgeForm />
      </div>
    </div>
  );
}
