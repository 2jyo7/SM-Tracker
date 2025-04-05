"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import API from "@/utils/api";

const AuthFormPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("User");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const endpoint = isLogin ? "/login" : "/signup";
      const payload = isLogin
        ? { email, password }
        : { name, email, password, role };

      // ✅ Send request with cookies
      const data = await API.post(endpoint, payload, { withCredentials: true });
      console.log(data);
      // ✅ Reset form fields
      setEmail("");
      setPassword("");
      setName("");
      setRole("User");

      if (isLogin) {
        router.push("/dashboard");
      } else {
        // ✅ Better UX: Small delay before switching to login
        setTimeout(() => {
          setIsLogin(true);
        }, 500);
        router.push("/auth");
      }
    } catch (err) {
      console.error("Authentication error:", err);

      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Something went wrong");
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return (
    <section className="py-24 flex justify-center items-center min-h-screen bg-gradient-to-bl from-red-500 to-orange-300 px-4">
      <div className="w-full max-w-md px-8 py-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-red-500">
          {isLogin ? "Login" : "Sign Up"}
        </h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form className="flex flex-col gap-6" onSubmit={handleAuth}>
          {!isLogin && (
            <div>
              <label className="block mb-1 font-medium">Full Name:</label>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}
          <div>
            <label className="block mb-1 font-medium">Email:</label>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Password:</label>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {!isLogin && (
            <div>
              <label className="block mb-1 font-medium">Role:</label>
              <select
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
          )}
          <button
            type="submit"
            className="bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <p className="text-center mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-orange-600 font-semibold ml-2 hover:underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </section>
  );
};

export default AuthFormPage;
