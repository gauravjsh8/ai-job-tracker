import { BadgePlus } from "lucide-react";
import { Link } from "react-router-dom";

type SearchBarProps = {
  search: string;
  status: string;

  setSearch: React.Dispatch<React.SetStateAction<string>>;

  setStatus: React.Dispatch<React.SetStateAction<string>>;

  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const SearchBar = ({
  search,
  status,
  setSearch,
  setStatus,
  setPage,
}: SearchBarProps) => {
  return (
    <div className="flex gap-4 items-center justify-center">
      <input
        type="text"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        className="border text-teal-200 border-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 mb-5 p-3 rounded-2xl"
        placeholder="Search"
      />

      <select
        className="border text-teal-500 p-2 border-green-500 rounded-xl mb-5 focus:outline-none"
        value={status}
        onChange={(e) => {
          setStatus(e.target.value);
          setPage(1);
        }}
      >
        <option value="">Select Category......</option>

        <option value="applied">Applied</option>

        <option value="interview">Interview</option>

        <option value="offer">Offered</option>

        <option value="rejected">Rejected</option>
      </select>

      <Link to="/add-jobs">
        <button className="bg-white border border-green-500 p-2 pl-8 pr-8 mb-5 rounded-2xl hover:bg-slate-800 hover:text-white">
          <div className="flex gap-3">
            <BadgePlus />
            Add jobs
          </div>
        </button>
      </Link>
    </div>
  );
};

export default SearchBar;
