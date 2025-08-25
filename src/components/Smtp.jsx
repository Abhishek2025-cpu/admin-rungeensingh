import React, { useState, useEffect } from 'react';

// SVG Icons for the password toggle (no changes here)
const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
);
const EyeSlashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a9.97 9.97 0 01-1.563 3.029m-2.135 0c-.36.606-.794 1.162-1.284 1.664M21 21L12 12" />
    </svg>
);


const Smtp = () => {
  const [smtpData, setSmtpData] = useState(null);
  const [formData, setFormData] = useState({ mail_username: '', mail_password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const GET_API_URL = 'https://rungeensingh.in/api/smtp/get';
  const UPDATE_API_URL = 'https://rungeensingh.in/api/smtp/update';

  const fetchSmtpData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(GET_API_URL);
      if (!response.ok) throw new Error('Network response was not ok');
      const result = await response.json();
      if (result.status && result.data) {
        setSmtpData(result.data);
        setFormData({
          mail_username: result.data.mail_username || '',
          mail_password: result.data.mail_password || '',
        });
      } else {
        throw new Error(result.message || 'Failed to fetch SMTP data');
      }
    } catch (err) {
      setError(err.message);
      setSmtpData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSmtpData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage('');

    const payload = {
      mail_host: "smtp.gmail.com",
      mail_port: 587,
      mail_encryption: "tls",
      mail_username: formData.mail_username,
      mail_password: formData.mail_password,
    };

    try {
      const response = await fetch(UPDATE_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok || !result.status) {
        throw new Error(result.message || 'Failed to update settings');
      }
      setSuccessMessage('SMTP settings updated successfully!');
      fetchSmtpData();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setTimeout(() => setSuccessMessage(''), 5000);
    }
  };

  return (
    // FIX: Removed bg-gray-100 and min-h-screen. The background is now handled globally.
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full  max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-8 space-y-8">
        
        <div>
          {/* STYLE UPDATE: Made main heading bolder */}
          <h1 className="text-3xl font-bold text-gray-900">SMTP Server Settings</h1>
          <p className="mt-2 text-sm text-gray-600">
            View and update your application's email sending configuration.
          </p>
        </div>

        <hr />

        <div className="space-y-4">
          {/* STYLE UPDATE: Made section heading bolder */}
          <h2 className="text-xl font-bold text-gray-800">Current Configuration</h2>
          {loading && <p className="text-indigo-600">Loading settings...</p>}
          {error && !smtpData && (
             <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md" role="alert">
                <p className="font-bold">Error</p><p>{error}</p>
            </div>
          )}
          {smtpData && (
            <div className="overflow-x-auto border border-gray-200 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="bg-white divide-y divide-gray-200">
                  {Object.entries({
                    "Host": smtpData.mail_host,
                    "Port": smtpData.mail_port,
                    "Username / Email": smtpData.mail_username,
                    "App Password": "••••••••••••••••",
                    "Encryption": smtpData.mail_encryption,
                    "Last Updated": new Date(smtpData.updatedAt).toLocaleString(),
                  }).map(([key, value]) => (
                    <tr key={key}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{key}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="space-y-4">
          {/* STYLE UPDATE: Made section heading bolder */}
          <h2 className="text-xl font-bold text-gray-800">Update Settings</h2>
          <form onSubmit={handleUpdate} className="space-y-6">
            <div>
              <label htmlFor="mail_username" className="block text-sm font-medium text-gray-700">
                Email Address (e.g., Gmail)
              </label>
              <div className="mt-1">
                <input
                  type="email" name="mail_username" id="mail_username" value={formData.mail_username} onChange={handleInputChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="you@example.com" required
                />
              </div>
            </div>

            <div>
              <label htmlFor="mail_password" className="block text-sm font-medium text-gray-700">
                App Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={showPassword ? 'text' : 'password'} name="mail_password" id="mail_password" value={formData.mail_password} onChange={handleInputChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm pr-10"
                  placeholder="Enter your 16-character app password" required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                </button>
              </div>
               <p className="mt-2 text-xs text-gray-500">
                Use a 16-character <a href="https://support.google.com/accounts/answer/185833" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Google App Password</a> if you use 2-Step Verification.
              </p>
            </div>
            
            {successMessage && (
                <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md" role="alert">
                    <p>{successMessage}</p>
                </div>
            )}
             {error && smtpData && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md" role="alert">
                    <p>{error}</p>
                </div>
            )}

            <div>
              {/* STYLE UPDATE: Changed button color to violet to match screenshot */}
              <button type="submit" disabled={loading}
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 disabled:bg-violet-300 disabled:cursor-not-allowed"
              >
                {loading ? 'Updating...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Smtp;