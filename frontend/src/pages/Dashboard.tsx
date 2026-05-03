import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuthStore } from "../store/AuthStore";
import { Navigate } from "react-router-dom";
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

const Dashboard = () => {
  const [stats, setStats] = useState<statType | null>(null);
  const [monthly, setMonthly] = useState<any[]>([]);
  const { user } = useAuthStore();

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
  return (
    <div className="bg-green-300 p-6 h-screen">
      <h1 className="text-4xl">Dashboard</h1>
      {stats ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-10 ">
          <div className="bg-pink-300  text-2xl  p-10 rounded-2xl ">
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
      <div className="mt-50">
        <h2 className="text-xl font-bold mb-7">Monthly Applications</h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthly}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#eee476" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
