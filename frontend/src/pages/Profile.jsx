import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

export default function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    api.get("/profile").then((res) => setProfile(res.data));
  }, []);

  if (!profile) {
    return (
    <>
    <div className="flex justify-center items-center min-h-screen w-[100vw] bg-gradient-to-r from-slate-900 to-slate-800">
        <div className="w-[65%] h-[300px] mx-auto mt-10 bg-white rounded-xl shadow p-8 text-black text-center">Fetching profile</div>
    </div>
    </>
    
    );
  }

  return (
    <div className="min-h-screen w-[100vw] bg-gradient-to-r from-slate-900 to-slate-800">
      <Navbar />

      <div className="w-[65%] mx-auto mt-10 bg-white rounded-xl shadow p-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-6 text-center">
          My Profile
        </h2>

        <div className="space-y-4 mt-12 text-lg text-slate-700">
          <p>
            <span className="font-semibold">Name:</span> {profile.name}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {profile.email}
          </p>
        </div>
      </div>
    </div>
  );
}
