import { useRef, useState } from "react";
import { useAuthStore } from "../store/AuthStore";
import api from "../services/api";
import toast from "react-hot-toast";

const MyProfile = () => {
  const { user, setUser } = useAuthStore();

  const [resume, setResume] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  const resumeRef = useRef<HTMLInputElement | null>(null);

  const handleResumeUpdate = async () => {
    try {
      if (!resume) return;
      const formData = new FormData();
      console.log(resume);
      formData.append("resume", resume);
      setLoading(true);

      const response = await api.patch("/users/upload-resume", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      setUser(response.data.user);
      toast.success("Resume uploaded successfully");
      setResume(null);
      setLoading(false);
      if (resumeRef.current) {
        resumeRef.current.value = "";
      }
    } catch (error) {
      console.log(error);

      toast.error("Couldn't upload resume. Please try again");
      setLoading(false);
    }
  };

  return (
    <div className="bg-linear-to-br from-slate-900 via-indigo-950 to-emerald-950 min-h-screen flex justify-center items-center gap-30 text-white">
      <div className="p-6 bg-white/10 border border-green-400 rounded-2xl flex flex-col items-center gap-3 hover:scale-105 transition-transform duration-300 w-80">
        <img
          src={user?.imageUrl}
          alt={`${user?.firstName}'s profile`}
          className="h-32 w-32 rounded-full object-cover border-2 border-green-400"
        />
        <h1 className="text-xl font-bold">
          {user?.firstName} {user?.lastName}
        </h1>
        <p className="text-white/70 text-sm">{user?.email}</p>
        <span className="bg-green-500/20 text-green-300 text-xs px-3 py-1 rounded-full capitalize">
          {user?.role}
        </span>
      </div>
      <div className="flex flex-col space-y-5">
        {user?.resumeUrl && (
          <a
            href={user.resumeUrl}
            target="_blank"
            className="text-green-300 underline"
          >
            {user?.resumeUrl.split("/").pop()}
          </a>
        )}
        <input
          ref={resumeRef}
          type="file"
          className="file:border file:border-green-600 file:p-2 file:rounded-2xl"
          onChange={(e) => setResume(e.target.files?.[0] || null)}
        />
        <button
          disabled={loading}
          onClick={handleResumeUpdate}
          className="bg-white p-2 rounded-xl cursor-pointer text-black hover:bg-green-500 hover:text-white disabled:bg-gray-500 disabled:text-white"
        >
          {loading ? "Uploading.." : "Upload Resume"}
        </button>
      </div>
    </div>
  );
};

export default MyProfile;
