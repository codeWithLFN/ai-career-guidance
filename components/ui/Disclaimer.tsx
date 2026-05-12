import { FC } from "react";

const Disclaimer: FC = () => {
  return (
    <div className="w-full max-w-3xl mx-auto bg-gray-100 border border-gray-300 rounded-lg p-6 shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Disclaimer</h2>
      <p className="text-sm text-gray-700 leading-relaxed">
        By uploading your document, you consent to its analysis using Artificial Intelligence (AI) tools. 
        The purpose of this analysis is to generate career-related recommendations and insights tailored 
        to your academic performance, skills, interests, and traits.
      </p>
      <ul className="list-disc list-inside text-sm text-gray-700 mt-3 space-y-1">
        <li>Your document will only be used for analysis and recommendation purposes.</li>
        <li>The AI-generated recommendations are advisory in nature and should not be considered final or binding decisions.</li>
        <li>You retain full responsibility for how you use or act upon the recommendations provided.</li>
      </ul>
      <p className="text-sm text-gray-700 mt-3">
        By proceeding, you acknowledge and agree to this use of your document.
      </p>
    </div>
  );
};

export default Disclaimer;
