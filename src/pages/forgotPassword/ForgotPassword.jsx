// // src/pages/ForgotPassword.jsx
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { forgetPassword } from "../../api/frogetPassword";
// // import { requestPasswordReset } from "../api/api"; // create this API helper

// const ForgotPassword = () => {
//   const navigate = useNavigate();

//   const [usernameOrEmail, setUsernameOrEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     setMessage("");
//     const rs = await forgetPassword(usernameOrEmail);
//     console.log(rs);
    
//   };

//   return (
//     <div className="min-h-screen w-full flex items-center justify-center bg-[#f3f4f6] px-4">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md border border-[#e5e7eb]"
//       >
//         {/* Logo */}
//         <div className="flex justify-center mb-6">
//           {/* <img src={logo} alt="Rangin Web Logo" className="h-16 w-auto" /> */}
//         </div>

//         {/* Heading */}
//         <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
//           Forgot Password
//         </h2>

//         {/* Success / Error Messages */}
//         {message && (
//           <p className="text-green-600 text-center mb-4">{message}</p>
//         )}
//         {error && <p className="text-red-500 text-center mb-4">{error}</p>}

//         {/* Username / Email */}
//         <label htmlFor="identifier" className="block mb-2 text-gray-700">
//           Username or Email
//         </label>
//         <input
//           id="identifier"
//           type="text"
//           value={usernameOrEmail}
//           onChange={(e) => setUsernameOrEmail(e.target.value)}
//           className="w-full px-4 py-3 mb-8 rounded-md bg-white text-gray-900 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           placeholder="Enter your username or email"
//           required
//         />

//         {/* Submit */}
//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition"
//         >
//           {loading ? "Sending..." : "Send Reset Link"}
//         </button>

//         {/* Back to login */}
//         <p
//           className="mt-6 text-sm text-blue-600 hover:underline text-center cursor-pointer"
//           onClick={() => navigate("/login")}
//         >
//           Back to Login
//         </p>
//       </form>
//     </div>
//   );
// };

// export default ForgotPassword;
