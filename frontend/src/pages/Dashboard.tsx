import { useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import api from "../services/api";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type statType = {
  applied: number;
  interview: number;
  offer: number;
  rejected: number;
};

type JobType = {
  _id: string;
  title: string;
  company: string;
  status: string;
};

const Dashboard = () => {
  const [stats, setStats] = useState<statType | null>(null);
  const [monthly, setMonthly] = useState<any[]>([]);
  const [jobs, setJobs] = useState<JobType[]>([]);
  const columns = ["applied", "interview", "offer", "rejected"];

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    console.log(active);

    if (!over) return;

    const jobId = active.id;
    const newStatus = over.id;

    setJobs((prev) =>
      prev.map((job) =>
        job._id === jobId ? { ...job, status: String(newStatus) } : job,
      ),
    );

    try {
      await api.patch(`/jobs/${jobId}`, { ...jobs, status: String(newStatus) });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchStats = async () => {
      const response = await api.get("/jobs/stats");
      setStats(response.data.stats);
    };
    fetchStats();
  }, []);

  useEffect(() => {
    const fetchMonthly = async () => {
      const response = await api.get("/jobs/monthly-stats");
      setMonthly(response.data.stats);
    };
    fetchMonthly();
  }, []);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await api.get("/jobs/all-jobs");
        setJobs(response.data.jobs);
      } catch (error) {
        console.log(error);
      }
    };
    fetchJobs();
  }, []);

  const DraggableJob = ({ job }: { job: JobType }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
      id: job._id,
    });

    const style = transform
      ? {
          transform: `translate(${transform.x}px, ${transform.y}px)`,
        }
      : undefined;

    return (
      <div
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        className="bg-white p-4 rounded-xl shadow-lg cursor-grab active:cursor-grabbing"
      >
        <h3 className="font-bold">{job.title}</h3>
        <p className="text-sm text-gray-500">{job.company}</p>
      </div>
    );
  };
  const DroppableColumn = ({
    id,
    children,
  }: {
    id: string;
    children: React.ReactNode;
  }) => {
    const { setNodeRef } = useDroppable({
      id,
    });

    return (
      <div ref={setNodeRef} className="bg-white/10 rounded-2xl p-4 min-h-125">
        {children}
      </div>
    );
  };
  return (
    <div className="bg-green-100 p-6 h-screen">
      <h1 className="text-4xl">Dashboard</h1>
      {stats ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-10 ">
          <div className="bg-violet-300  text-2xl  p-10 rounded-2xl ">
            <h1>Applied</h1>
            <p className="text-2xl font-bold text-green-500">
              {stats?.applied}
            </p>
          </div>
          <div className="bg-blue-300  text-2xl  p-10 rounded-2xl   ">
            <h1>Interview</h1>
            <p className="text-2xl font-bold text-green-500">
              {stats?.interview}
            </p>
          </div>
          <div className="bg-yellow-300  text-2xl  p-10 rounded-2xl   ">
            <h1>Offer</h1>
            <p className="text-2xl font-bold text-green-500">{stats?.offer}</p>
          </div>
          <div className="bg-red-300  text-2xl  p-10 rounded-2xl  ">
            <h1>Rejected</h1>
            <p className="text-2xl font-bold text-green-500">
              {stats?.rejected}
            </p>
          </div>
        </div>
      ) : (
        <h1>No stats available</h1>
      )}
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-10">
          {columns.map((column) => (
            <DroppableColumn key={column} id={column}>
              <h2 className="text-black text-xl font-bold capitalize mb-4">
                {column}
              </h2>

              <div className="space-y-3">
                {jobs
                  .filter((job) => job.status === column)
                  .map((job) => (
                    <DraggableJob key={job._id} job={job} />
                  ))}
              </div>
            </DroppableColumn>
          ))}
        </div>
      </DndContext>
      <div className="mt-50">
        <h2 className="text-xl font-bold mb-7">Monthly Applications</h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthly}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#3A8796" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
