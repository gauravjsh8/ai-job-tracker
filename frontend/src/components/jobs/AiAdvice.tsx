type AiAdviceProps = {
  onClose: () => void;
  aiAdvice: string;
};

export const AiAdvice = ({ onClose, aiAdvice }: AiAdviceProps) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl w-125 max-h-[80vh] flex flex-col shadow-lg">
        <h2 className="text-xl font-bold mb-4">✨ AI Next Steps</h2>

        <div className="overflow-y-auto flex-1 pr-1">
          {aiAdvice
            .split("\n")
            .filter((line) => line.trim() !== "")
            .map((line, i) => {
              if (line.startsWith("* **") || line.match(/^\*\s+\*\*/)) {
                const text = line.replace(/\*+/g, "").trim();
                return (
                  <p key={i} className="font-semibold mt-3 mb-1">
                    {text}
                  </p>
                );
              }
              if (line.trim().startsWith("*")) {
                const text = line.replace(/^\s*\*+\s*/, "").trim();
                return (
                  <p
                    key={i}
                    className="text-sm text-gray-700 pl-3 before:content-['•'] before:mr-2"
                  >
                    {text}
                  </p>
                );
              }
              return (
                <p key={i} className="text-sm text-gray-700">
                  {line}
                </p>
              );
            })}
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
