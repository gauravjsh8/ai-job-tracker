import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { JobCard } from "../components/jobs/jobCard";
import DeleteModal from "../components/jobs/DeleteModal";
import { AiEmail } from "../components/jobs/AiEmail";
import { InterviewQuestions } from "../components/jobs/InterviewQuestions";
import { LoadingAi } from "../components/jobs/LoadingAi";
import { AiAdvice } from "../components/jobs/AiAdvice";
import SearchBar from "../components/jobs/SearchBar";

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
  const [interviewQuestions, setInterviewQuestions] = useState("");
  const [loadInterviewQuestions, setLoadInterviewQuestions] = useState(false);

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

  const handleAiInterview = async (job: any) => {
    try {
      setLoadInterviewQuestions(true);
      const response = await api.post("/ai/ai-interview", {
        title: job.title,
        status: job.status,
        company: job.company,
      });
      setInterviewQuestions(response.data.advice);
      setLoadInterviewQuestions(false);
      console.log(response);
    } catch (error) {
      toast.error("AI failed");
      setLoadInterviewQuestions(false);
    }
  };

  return (
    <div className="p-4 h-screen bg-linear-to-br from-slate-900 via-indigo-950 to-emerald-950   ">
      <h1 className="text-center text-5xl mb-10 text-white">Jobs</h1>
      <SearchBar
        search={search}
        setSearch={setSearch}
        setPage={setPage}
        setStatus={setStatus}
        status={status}
      />

      {loading && (
        <p className="text-white text-3xl text-center mt-50">Loading...</p>
      )}

      {!loading && jobs.length === 0 && (
        <p className="text-white text-4xl text-center mt-10">No jobs found</p>
      )}
      {!loading &&
        jobs.map((job) => (
          <JobCard
            key={job._id}
            job={job}
            onEdit={() => navigate(`/edit-jobs/${job._id}`)}
            onDelete={(id) => setDeleteId(id)}
            onAiEmail={handleAiEmail}
            onAiInterview={handleAiInterview}
            onAiAdvice={handleAI}
          />
        ))}
      {deleteId && (
        <DeleteModal
          onClose={() => setDeleteId(null)}
          handleClick={handleClick}
          deleteLoading={deleteLoading}
        />
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

      {loadingAdvice && <LoadingAi />}

      {aiAdvice && (
        <AiAdvice onClose={() => setAiAdvice("")} aiAdvice={aiAdvice} />
      )}
      {loadingEmail && <LoadingAi />}
      {aiEmail && <AiEmail onClose={() => setAiEmail("")} aiEmail={aiEmail} />}

      {loadInterviewQuestions && <LoadingAi />}
      {interviewQuestions && (
        <InterviewQuestions
          onClose={() => setInterviewQuestions("")}
          interviewQuestions={interviewQuestions}
        />
      )}
    </div>
  );
};

export default Jobs;
