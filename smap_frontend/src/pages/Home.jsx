import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const authRoutes = [
  { name: "Home", path: "/" },
  { name: "Sign In", path: "signin" },
  { name: "Sign Up", path: "signup" },
];

const analyticsRoutes = [
  { name: "Dashboard", path: "user/dashboard" },
  { name: "Facebook", path: "user/facebook" },
  { name: "Instagram", path: "user/instagram" },
  { name: "Twitter", path: "user/twitter" },
  { name: "LinkedIn", path: "user/linkedin" },
  { name: "YouTube", path: "user/youtube" },
  { name: "Calendar", path: "user/calendar" },
  { name: "Schedule", path: "user/schedule" },
  { name: "Reports", path: "user/reports" },
  { name: "Inbox", path: "user/inbox" },
  { name: "Subscription", path: "user/subscription" },
];

const Home = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/user/dashboard', { replace: true });
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-2">Available Routes</h1>
      <h1 className="text-2xl font-bold text-red-500 mb-6">
        All Links are clickable
      </h1>
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Authentication Routes</h2>
          <ul>
            {authRoutes.map((route) => (
              <li key={route.path} className="mb-2">
                <Link
                  to={route.path}
                  className="text-blue-500 hover:text-blue-700 transition duration-300"
                >
                  {route.name}:{" "}
                  <span className="text-gray-600">{route.path}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Analytics Routes</h2>
          <ul>
            {analyticsRoutes.map((route) => (
              <li key={route.path} className="mb-2">
                <Link
                  to={route.path}
                  className="text-blue-500 hover:text-blue-700 transition duration-300"
                >
                  {route.name}:{" "}
                  <span className="text-gray-600">{route.path}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
};

export default Home;
