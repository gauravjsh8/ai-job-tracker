import { useEffect, useState } from "react";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import { BadgePlus, Lightbulb, Mails, Trash, UserPen } from "lucide-react";
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
  const [loadingAdvice, setLoadingAdvice] = useState(false);

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const [aiAdvice, setAiAdvice] = useState("");
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [aiEmail, setAiEmail] = useState("");

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

  const handleClick = async () => {
    if (!deleteId) return;
    try {
      setDeleteLoading(true);

      const response = await api.delete(`/jobs/${deleteId}`);
      console.log("DELETE RESPONSE", response);
      toast.success("Job deleted successfully");

      setJobs((prev) => prev.filter((p) => p._id !== deleteId));
      setDeleteId(null);
    } catch (error: any) {
      toast.error(error?.response?.data.message || "Error while deleting");
    } finally {
      setDeleteLoading(false);
    }
  };
  const handleAI = async (job: any) => {
    try {
      setLoadingAdvice(true);
      const response = await api.post("/ai/next-steps", {
        title: job.title,
        company: job.company,
        status: job.status,
      });
      setAiAdvice(response.data.advice);
      setLoadingAdvice(false);
    } catch (error) {
      toast.error("AI failed");
      setLoadingAdvice(false);
    }
  };
  const handleAiEmail = async (job: any) => {
    try {
      setLoadingEmail(true);
      const response = await api.post("/ai/ai-email", {
        title: job.title,
        company: job.company,
        status: job.status,
      });
      console.log(response);
      setAiEmail(response.data.advice);
      setLoadingEmail(false);
    } catch (error) {
      toast.error("AI failed");
      setLoadingEmail(false);
    }
  };

  return (
    <div className="p-4 h-screen bg-linear-to-br from-slate-900 via-indigo-950 to-emerald-950   ">
      <h1 className="text-center text-5xl mb-10 text-white">Jobs</h1>
      <div className="flex gap-4 items-center justify-center  ">
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="border text-teal-200 border-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 mb-5 p-3 rounded-2xl"
          placeholder="Search "
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
          <button className="bg-white border border-green-500  p-2 pl-8 pr-8 mb-5 rounded-2xl hover:bg-slate-800 hover:text-white">
            <div className="flex gap-3">
              <BadgePlus />
              Add jobs
            </div>
          </button>
        </Link>
      </div>

      {loading && (
        <p className="text-white text-3xl text-center mt-50">Loading...</p>
      )}

      {!loading && jobs.length === 0 && (
        <p className="text-white text-4xl text-center mt-10">No jobs found</p>
      )}
      {!loading &&
        jobs.map((job) => (
          <div key={job._id} className=" bg-gray-300  mb-7 p-3">
            <h1 className="font-bold">{job.title}</h1>
            <p>{job.company}</p>
            <div className="flex items-center justify-between">
              <p className="text-sm opacity-70">{job.status.toUpperCase()}</p>
              <div className="flex items-center justify-center gap-5">
                <button
                  title="Edit"
                  className=" cursor-pointer"
                  onClick={() => navigate(`/edit-jobs/${job._id}`)}
                >
                  <UserPen className="cursor-pointer text-blue-500 hover:text-blue-700" />
                </button>
                <button
                  title="Delete"
                  className=" cursor-pointer"
                  onClick={() => setDeleteId(job._id)}
                >
                  <Trash className="cursor-pointer text-red-500 hover:text-red-700" />
                </button>
                <button
                  title="Consult AI"
                  className=" cursor-pointer"
                  onClick={() => handleAI(job)}
                >
                  <Lightbulb className="cursor-pointer text-yellow-700 hover:text-yellow-900" />
                </button>
                <button
                  title="Email AI"
                  className=" cursor-pointer"
                  onClick={() => handleAiEmail(job)}
                >
                  <Mails className="cursor-pointer text-green-700 hover:text-green-900" />
                </button>
              </div>
            </div>
          </div>
        ))}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-96">
            <h2 className="text-xl font-bold mb-3 text-red-500">Delete Job</h2>

            <p className="text-gray-700 mb-6">
              Do you really want to delete this job?
            </p>

            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
                onClick={() => setDeleteId(null)}
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
      )}
      {!loading && (
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
      )}

      {loadingAdvice && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-125 shadow-lg flex flex-col items-center gap-3">
            <h2 className="text-xl font-bold">✨ AI Next Steps</h2>
            <p className="text-gray-500 text-sm">Thinking...</p>
            <div className="w-8 h-8 border-4 border-green-400 border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      )}

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
      {loadingEmail && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-125 shadow-lg flex flex-col items-center gap-3">
            <h2 className="text-xl font-bold">✨ AI Next Steps</h2>
            <p className="text-gray-500 text-sm">Thinking...</p>
            <div className="w-8 h-8 border-4 border-green-400 border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      )}
      {aiEmail && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-125 max-h-[80vh] flex flex-col shadow-lg">
            <h2 className="text-xl font-bold mb-4">✨ AI Next Steps</h2>

            <div className="overflow-y-auto flex-1 pr-1">
              {aiEmail
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
              onClick={() => setAiEmail("")}
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
