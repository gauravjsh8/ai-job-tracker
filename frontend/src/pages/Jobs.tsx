import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

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
                  className="bg-blue-400 pr-6 pl-6 rounded-2xl cursor-pointer"
                  onClick={() => navigate(`/edit-jobs/${job._id}`)}
                >
                  Edit
                </button>

                <button
                  className="bg-red-400 pr-3 pl-3 rounded-2xl cursor-pointer"
                  onClick={() => handleClick(job._id)}
                >
                  Delete
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
    </div>
  );
};

export default Jobs;
