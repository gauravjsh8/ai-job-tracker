import { useEffect, useState } from "react";
import api from "../services/api";
import { Link, useNavigate, useParams } from "react-router-dom";
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
  status: "",
  jobLink: "",
};
const Edit = () => {
  const [jobs, setJobs] = useState<JobType>(job);

  const { id } = useParams();
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    setJobs({ ...jobs, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await api.get(`/jobs/get-single-job/${id}`);
        const jobData = response.data.job;
        setJobs({
          title: jobData.title || "",
          company: jobData.company || "",
          salary: jobData.salary?.toString() || "",
          location: jobData.location || "",
          notes: jobData.notes || "",
          status: jobData.status || "",
          jobLink: jobData.jobLink || "",
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchJob();
  }, [id]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const editJOb = async () => {
      try {
        await api.patch(`/jobs/${id}`, {
          ...jobs,
          salary: jobs.salary ? Number(jobs.salary) : undefined,
        });
        toast.success("Job edited successfully");
        navigate("/jobs");
      } catch (error: any) {
        toast.error(error?.response?.data.message[0] || "Error while editing ");
      }
    };
    editJOb();
  };
  return (
    <div className="bg-linear-to-br from-slate-900 via-indigo-950 to-emerald-950 flex justify-center h-screen">
      <div className="p-3 mt-20 bg-gray-100 h-180  shadow-green-200 shadow-2xl border border-green-300 rounded-4xl">
        <h1 className="text-center text-2xl font-bold font-serif"> Edit Job</h1>
        <form
          className="flex flex-col space-y-6 w-100 mt-7 p-4"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Job title"
            className=" border border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 rounded-2xl p-2"
            value={jobs.title}
            onChange={handleChange}
            name="title"
          />

          <input
            type="text"
            placeholder="Company"
            className=" border border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 rounded-2xl p-2"
            value={jobs.company}
            onChange={handleChange}
            name="company"
          />
          <input
            type="text"
            placeholder="Location"
            className=" border border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 rounded-2xl p-2"
            value={jobs.location}
            onChange={handleChange}
            name="location"
          />
          <input
            type="text"
            placeholder="Salary"
            className=" border border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 rounded-2xl p-2"
            value={jobs.salary}
            onChange={handleChange}
            name="salary"
          />
          <select
            className="border p-2 border-green-500 rounded-xl mb-5 focus:outline-none"
            value={jobs.status}
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
            value={jobs.jobLink}
            onChange={handleChange}
            name="jobLink"
          />
          <input
            type="text"
            placeholder="Notes"
            className=" border border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 rounded-2xl p-2"
            value={jobs.notes}
            onChange={handleChange}
            name="notes"
          />
          <button
            type="submit"
            className="bg-green-400 p-3 w-full rounded-2xl text-white font-bold cursor-pointer hover:bg-green-500"
          >
            Edit job
          </button>
          <Link to="/jobs">
            <button
              type="submit"
              className="bg-gray-300 text-black p-3 w-full rounded-2xl  font-bold cursor-pointer hover:bg-gray-500 hover:text-white  :"
            >
              Go Back
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Edit;
