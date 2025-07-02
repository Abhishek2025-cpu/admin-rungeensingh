// // src/pages/Login.jsx
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import logo from "../assets/logo.png"; 
// import { adminLogin } from "../api/api";

// const Login = () => {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   setLoading(true);
//   setError("");

//   try {
//     const res = await adminLogin(username, password);

//     localStorage.setItem("token", res.token);
//     localStorage.setItem("role", res.role);
//     localStorage.setItem("adminName", res.username);

//     navigate("/");
//   } catch (e) {
//     setError("Invalid username or password");
//     console.log(e);
    
//   } finally {
//     setLoading(false);
//   }
// };


//   return (
//     <div className="min-h-screen w-full flex items-center justify-center bg-[#f3f4f6] px-4">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md border border-[#e5e7eb]"
//       >
//         {/* Logo */}
//         <div className="flex justify-center mb-6">
//           <img src={logo} alt="Rangin Web Logo" className="h-16 w-auto" />
//         </div>

//         {/* Heading */}
//         <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
//           Rungeen Singh Dashboard
//         </h2>

//         {/* error msg */}
//         {error && (
//           <p className="text-red-500 text-center mb-4">{error}</p>
//         )}

//         {/* Username */}
//         <label htmlFor="username" className="block mb-2 text-gray-700">
//           Username
//         </label>
//         <input
//           id="username"
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           className="w-full px-4 py-3 mb-6 rounded-md bg-white text-gray-900 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           placeholder="Enter your username"
//           required
//           autoComplete="username"
//         />

//         {/* Password */}
//         <label htmlFor="password" className="block mb-2 text-gray-700">
//           Password
//         </label>
//         <input
//           id="password"
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full px-4 py-3 mb-8 rounded-md bg-white text-gray-900 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           placeholder="Enter your password"
//           required
//         />

//         <p onClick={() => navigate("/forgotPassword")} className="mb-6 text-right text-sm text-blue-600 hover:underline cursor-pointer">Forgot password</p>


//         {/* Submit Button */}
//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition"
//         >
//         {loading ? "Logging in..." : "Login"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;
