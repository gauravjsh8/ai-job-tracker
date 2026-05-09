type DeleteProps = {
  onClose: () => void;
  handleClick: () => void;
  deleteLoading: boolean;
};

export const DeleteModal = ({
  onClose,
  handleClick,
  deleteLoading,
}: DeleteProps) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-96">
        <h2 className="text-xl font-bold mb-3 text-red-500">Delete Job</h2>

        <p className="text-gray-700 mb-6">
          Do you really want to delete this job?
        </p>

        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-700 disabled:bg-red-300"
            onClick={handleClick}
            disabled={deleteLoading}
          >
            {deleteLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
