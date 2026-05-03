import { useEffect, useState } from "react";
import api from "../services/api";

const Jobs = () => {
  type Jobtype = {
    _id: string;
    company: string;
    title: string;
    status: string;
  };

  const [jobs, setJobs] = useState<Jobtype[]>([]);
  useEffect(() => {
    const fetchJobs = async () => {
      const response = await api.get("/jobs/all-jobs");
      console.log("JOB RESPONSE", response);
      setJobs(response.data.jobs);
    };
    fetchJobs();
  }, []);
  return (
    <div className="p-4">
      <h1 className="text-5xl mb-10">Jobs</h1>
      {jobs.map((job) => (
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
