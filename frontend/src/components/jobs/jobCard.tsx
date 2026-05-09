import { Lightbulb, Mails, Trash, UserPen, Users } from "lucide-react";

type JobType = {
  _id: string;
  company: string;
  title: string;
  status: string;
};

type JobCardProps = {
  job: JobType;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onAiEmail: (job: JobType) => void;
  onAiInterview: (job: JobType) => void;
  onAiAdvice: (job: JobType) => void;
};

export const JobCard = ({
  job,
  onEdit,
  onDelete,
  onAiEmail,
  onAiInterview,
  onAiAdvice,
}: JobCardProps) => {
  return (
    <div className=" bg-gray-300  mb-7 p-3">
      <h1 className="font-bold">{job.title}</h1>
      <p>{job.company}</p>
      <div className="flex items-center justify-between">
        <p className="text-sm opacity-70">{job.status.toUpperCase()}</p>
        <div className="flex items-center justify-center gap-5">
          <button
            title="Edit"
            className=" cursor-pointer"
            onClick={() => onEdit(job._id)}
          >
            <UserPen className="cursor-pointer text-blue-500 hover:text-blue-700" />
          </button>
          <button
            title="Delete"
            className=" cursor-pointer"
            onClick={() => onDelete(job._id)}
          >
            <Trash className="cursor-pointer text-red-500 hover:text-red-700" />
          </button>
          <button
            title="Consult AI"
            className=" cursor-pointer"
            onClick={() => onAiAdvice(job)}
          >
            <Lightbulb className="cursor-pointer text-yellow-700 hover:text-yellow-900" />
          </button>
          <button
            title="Email AI"
            className=" cursor-pointer"
            onClick={() => onAiEmail(job)}
          >
            <Mails className="cursor-pointer text-green-700 hover:text-green-900" />
          </button>
          <button
            title="Email AI"
            className=" cursor-pointer"
            onClick={() => onAiInterview(job)}
          >
            <Users className="cursor-pointer text-yalloe-700 hover:text-yellow-900" />
          </button>
        </div>
      </div>
    </div>
  );
};
