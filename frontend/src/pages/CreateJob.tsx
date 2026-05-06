import { useState } from "react";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

type JobType = {
  title: string;
  company: string;
  salary: string;
  location: string;
  notes: string;
  status: string;
  jobLink: string;
};

const job = {
  title: "",
  company: "",
  salary: "",
  location: "",
  notes: "",
  status: "applied",
  jobLink: "",
};
const CreateJob = () => {
  const navigate = useNavigate();
  const [addJob, setAddJob] = useState<JobType>(job);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.post("/jobs/create-job", {
        ...addJob,
        salary: addJob.salary ? Number(addJob.salary) : undefined,
      });
      toast.success("Job added successfully");
      navigate("/jobs");
      setLoading(false);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message[0] || "Error while adding job",
      );
      setLoading(false);
    }
  };

  const handleChange = (e: any) => {
    setAddJob({ ...addJob, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-linear-to-br from-slate-900 via-indigo-950 to-emerald-950 h-screen">
      <div className="flex items-center justify-center ">
        <div className="p-3 mt-20 bg-gray-100  shadow-green-200 shadow-2xl border border-green-300 rounded-4xl ">
          <h1 className="text-center text-2xl font-bold font-serif">
            {" "}
            Add Job
          </h1>
          <form
            className="flex flex-col space-y-6 w-100 mt-7 p-4"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Job title"
              className=" border border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 rounded-2xl p-2"
              value={addJob.title}
              onChange={handleChange}
              name="title"
            />

            <input
              type="text"
              placeholder="Company"
              className=" border border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 rounded-2xl p-2"
              value={addJob.company}
              onChange={handleChange}
              name="company"
            />
            <input
              type="text"
              placeholder="Location"
              className=" border border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 rounded-2xl p-2"
              value={addJob.location}
              onChange={handleChange}
              name="location"
            />
            <input
              type="text"
              placeholder="Salary"
              className=" border border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 rounded-2xl p-2"
              value={addJob.salary}
              onChange={handleChange}
              name="salary"
            />
            <select
              className="border p-2 border-green-500 rounded-xl mb-5 focus:outline-none"
              value={addJob.status}
              onChange={handleChange}
              name="status"
            >
              <option value="">Select Category......</option>
              <option value="applied">Applied</option>
              <option value="interview">Interview</option>
              <option value="offer">Offered</option>
              <option value="rejected">Rejected</option>
            </select>
            <input
              type="text"
              placeholder="Job Link"
              className=" border border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 rounded-2xl p-2"
              value={addJob.jobLink}
              onChange={handleChange}
              name="jobLink"
            />
            <input
              type="text"
              placeholder="Notes"
              className=" border border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 rounded-2xl p-2"
              value={addJob.notes}
              onChange={handleChange}
              name="notes"
            />
            <button
              disabled={loading}
              type="submit"
              className="bg-green-400 p-3 w-full rounded-2xl text-white font-bold cursor-pointer hover:bg-green-500 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {loading ? "Adding job" : "Add"}
            </button>
            <Link to="/jobs">
              <button
                type="submit"
                className="  text-black border border-green-500 p-3 w-full rounded-2xl  font-bold cursor-pointer hover:bg-gray-400 hover:border-none hover:text-white "
              >
                Go Back
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateJob;
