import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { Lightbulb, Trash, UserPen } from "lucide-react";
import toast from "react-hot-toast";

type Jobtype = {
  _id: string;
  company: string;
  title: string;
  status: string;
};

const Jobs = () => {
  const [jobs, setJobs] = useState<Jobtype[]>([]);

  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const [aiAdvice, setAiAdvice] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        if (search.trim().length < 2 && search.trim() !== "") return;

        setLoading(true);
        const response = await api.get(
          `/jobs/all-jobs?search=${search}&status=${status}&page=${page}`,
        );
        setJobs(response.data.jobs);
        setPages(response.data.pages);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchJobs();
  }, [search, status, page]);

  const handleClick = async (id: string) => {
    try {
      const response = await api.delete(`/jobs/${id}`);
      console.log("DELETE RESPONSE", response);

      setJobs((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleAI = async (job: any) => {
    try {
      setLoading(true);
      const response = await api.post("/ai/next-steps", {
        title: job.title,
        company: job.company,
        status: job.status,
      });
      setAiAdvice(response.data.advice);
      setLoading(false);
    } catch (error) {
      toast.error("AI failed");
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-5xl mb-10">Jobs</h1>
      <div className="flex gap-4">
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="border border-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 mb-5 p-3 rounded-2xl"
          placeholder="Search "
        />
        <select
          className="border p-2 border-green-500 rounded-xl mb-5 focus:outline-none"
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
      </div>

      {loading && <p>Loading...</p>}

      {!loading && jobs.length === 0 && <p>No jobs found</p>}
      {!loading &&
        jobs.map((job) => (
          <div key={job._id} className=" bg-gray-300  mb-7 p-3">
            <h1 className="font-bold">{job.title}</h1>
            <p>{job.company}</p>
            <div className="flex items-center justify-between">
              <p className="text-sm opacity-70">{job.status.toUpperCase()}</p>
              <div className="flex items-center justify-center gap-5">
                <button
                  className=" cursor-pointer"
                  onClick={() => navigate(`/edit-jobs/${job._id}`)}
                >
                  <UserPen className="cursor-pointer text-blue-500 hover:text-blue-700" />
                </button>
                <button
                  className=" cursor-pointer"
                  onClick={() => handleClick(job._id)}
                >
                  <Trash className="cursor-pointer text-red-500 hover:text-red-700" />
                </button>
                <button
                  className=" cursor-pointer"
                  onClick={() => handleAI(job)}
                >
                  <Lightbulb className="cursor-pointer text-yellow-700 hover:text-yellow-900" />
                </button>
              </div>
            </div>
          </div>
        ))}
      <div className="flex gap-3  ">
        {[...Array(pages)].map((_, i) => (
          <button
            key={i}
            className={`cursor-pointer ${page === i + 1 ? "text-green-500" : "text-gray-500"}`}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
      {aiAdvice && (
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
              onClick={() => setAiAdvice("")}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Jobs;
