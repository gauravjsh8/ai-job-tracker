import { useAuthStore } from "../store/AuthStore";

const MyProfile = () => {
  const { user } = useAuthStore();

  return (
    <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-emerald-950 min-h-screen flex justify-center items-center text-white">
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
    </div>
  );
};

export default MyProfile;
