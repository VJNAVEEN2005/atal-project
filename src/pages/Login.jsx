import React,{useState} from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");

  const navigate = useNavigate()

  function handleSubmit(e) {

    if (email === "AIC" && password === "AIC") {
      alert("Login Successful");
      window.localStorage.setItem("isAuthenticated", true);
      window.location.href = "/";
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-2xl shadow-black rounded-2xl p-10 w-96 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-[#3f6197] mb-6">Login</h1>
        <form className="w-full flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-lg font-semibold text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3f6197] text-gray-700"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-lg font-semibold text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3f6197] text-gray-700"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="remember" className="accent-[#3f6197]" />
            <label htmlFor="remember" className="text-gray-600 text-sm">
              Remember me
            </label>
          </div>
          <button
            onClick={handleSubmit}
            className="bg-[#3f6197] text-white font-semibold py-2 rounded-lg shadow-md hover:bg-[#2e4b78] transition-all duration-300"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-500">
          Don't have an account?{" "}
          <a href="#" className="text-[#3f6197] font-semibold hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
