import { Link } from "react-router-dom";
import api from "../api/axios";
import { useState } from "react";

export default function Register() {
  const [error, setError] = useState("");

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!validatePassword(password)) {
      setError(
        "Password must be at least 8 characters long and include uppercase, lowercase, number and special character."
      );
      return;
    }

    try {
      await api.post("/auth/signup", { name, email, password });
      alert("Registration successful");
      window.location.href = "/login";
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen w-[98vw] bg-gradient-to-r from-slate-900 to-slate-800 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Full Name"
            required
            className="w-full p-3 border rounded-lg text-slate-900"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full p-3 border rounded-lg text-slate-900"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full p-3 border rounded-lg text-slate-900"
          />

          {/* Password Hint */}
          <p className="text-sm text-gray-600">
            Password must contain at least:
            <br />• 8 characters
            <br />• 1 uppercase letter
            <br />• 1 lowercase letter
            <br />• 1 number
            <br />• 1 special character
          </p>

          {error && <p className="text-red-600 text-sm font-medium">{error}</p>}

          <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold">
            Register
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
