import { useState } from "react";
import api from "../services/api";

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
const CreateJob = () => {
  const [addJob, setAddJob] = useState<JobType>(job);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/jobs/create-job", {
        ...addJob,
        salary: addJob.salary ? Number(addJob.salary) : undefined,
      });
      console.log("JOB RESPONSE", response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: any) => {
    setAddJob({ ...addJob, [e.target.name]: e.target.value });
  };

  return (
    <div className=" mt-20 flex items-center justify-center">
      <div className="p-3 bg-gray-100  shadow-green-200 shadow-2xl border border-green-300 rounded-4xl">
        <h1 className="text-center text-2xl font-bold font-serif"> Add Job</h1>
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
          <input
            type="text"
            placeholder="Status"
            className=" border border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 rounded-2xl p-2"
            value={addJob.status}
            onChange={handleChange}
            name="status"
          />
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
            type="submit"
            className="bg-green-400 p-3 w-full rounded-2xl text-white font-bold cursor-pointer hover:bg-green-500"
          >
            Add job
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateJob;
