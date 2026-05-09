import ReactMarkdown from "react-markdown";

type InterviewQuestionProps = {
  onClose: () => void;
  interviewQuestions: string;
};
export const InterviewQuestions = ({
  onClose,
  interviewQuestions,
}: InterviewQuestionProps) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl w-125 max-h-[80vh] flex flex-col shadow-lg">
        <h2 className="text-xl font-bold mb-4">✨ AI Interview Ptactice</h2>

        <div className="overflow-y-auto flex-1 pr-1 prose max-w-none">
          <ReactMarkdown>{interviewQuestions}</ReactMarkdown>
        </div>

        <button
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded self-start"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};
