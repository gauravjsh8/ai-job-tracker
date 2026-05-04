const Home = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-indigo-950 to-emerald-950 p-20 ">
      <h1 className="text-white font-bold font-serif text-7xl text-center px-10">
        Welcome to the <span className="text-green-500">AI Job </span>Tracker
        System.
      </h1>

      <p className="text-slate-400 text-center text-xl mt-6 px-40">
        Track your applications smarter with AI-powered insights and real-time
        updates.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-16">
        <div className="bg-slate-800 border border-violet-500/30 p-8 rounded-2xl text-center hover:border-violet-400 transition">
          <div className="text-4xl mb-4">📋</div>
          <h2 className="text-white font-bold text-xl mb-2">
            Track Applications
          </h2>
          <p className="text-slate-400 text-sm">
            Stay on top of every application. See what's pending, in review, or
            landed an interview — all in one place.
          </p>
        </div>

        <div className="bg-slate-800 border border-blue-500/30 p-8 rounded-2xl text-center hover:border-blue-400 transition">
          <div className="text-4xl mb-4">✏️</div>
          <h2 className="text-white font-bold text-xl mb-2">Update Anytime</h2>
          <p className="text-slate-400 text-sm">
            Got a callback? Move your job to the next stage instantly. Keep your
            progress always up to date.
          </p>
        </div>

        <div className="bg-slate-800 border border-green-500/30 p-8 rounded-2xl text-center hover:border-green-400 transition">
          <div className="text-4xl mb-4">🤖</div>
          <h2 className="text-white font-bold text-xl mb-2">AI Resume Tips</h2>
          <p className="text-slate-400 text-sm">
            Get smart suggestions to improve your resume based on the job you're
            applying for. Land more interviews.
          </p>
        </div>
      </div>
      <div className="mt-20 text-center">
        <h2 className="text-white font-bold font-serif text-4xl mb-12">
          How it <span className="text-green-500">works</span>
        </h2>

        <div className="flex justify-center items-center gap-6">
          <div className="flex flex-col items-center max-w-xs">
            <div className="w-12 h-12 rounded-full bg-green-500 text-white font-bold text-xl flex items-center justify-center mb-4">
              1
            </div>
            <h3 className="text-white font-bold text-lg mb-2">
              Create an account
            </h3>
            <p className="text-slate-400 text-sm">
              Sign up in seconds and set up your profile to get started.
            </p>
          </div>

          <div className="w-16 h-px bg-slate-600 mb-6"></div>

          <div className="flex flex-col items-center max-w-xs">
            <div className="w-12 h-12 rounded-full bg-green-500 text-white font-bold text-xl flex items-center justify-center mb-4">
              2
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Add your jobs</h3>
            <p className="text-slate-400 text-sm">
              Log every job you apply to and track its current status.
            </p>
          </div>

          <div className="w-16 h-px bg-slate-600 mb-6"></div>

          <div className="flex flex-col items-center max-w-xs">
            <div className="w-12 h-12 rounded-full bg-green-500 text-white font-bold text-xl flex items-center justify-center mb-4">
              3
            </div>
            <h3 className="text-white font-bold text-lg mb-2">
              Let AI guide you
            </h3>
            <p className="text-slate-400 text-sm">
              Get AI-powered resume tips and insights to land your dream job.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
