import { useEffect, useState } from "react";
import api from "../services/api";

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

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        if (search.length < 2 && search !== "") return;

        setLoading(true);
        const response = await api.get(`/jobs/all-jobs?search=${search}`);
        setJobs(response.data.jobs);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchJobs();
  }, [search]);

  return (
    <div className="p-4">
      <h1 className="text-5xl mb-10">Jobs</h1>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 mb-5 p-3 rounded-2xl"
        placeholder="Search......"
      />
      {loading && <p>Loading...</p>}

      {!loading && jobs.length === 0 && <p>No jobs found</p>}
      {!loading &&
        jobs.map((job) => (
          <div key={job._id} className=" bg-gray-300  mb-7 p-3">
            <h1 className="font-bold">{job.title}</h1>
            <p>{job.company}</p>
            <p className="text-sm opacity-70">{job.status.toUpperCase()}</p>
          </div>
        ))}
    </div>
  );
};

export default Jobs;
