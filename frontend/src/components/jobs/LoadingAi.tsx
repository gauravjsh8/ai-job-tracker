export const LoadingAi = () => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl w-125 shadow-lg flex flex-col items-center gap-3">
        <h2 className="text-xl font-bold">✨ AI Next Steps</h2>
        <p className="text-gray-500 text-sm">Thinking...</p>
        <div className="w-8 h-8 border-4 border-green-400 border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  );
};
