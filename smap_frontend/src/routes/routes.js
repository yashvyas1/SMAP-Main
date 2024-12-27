import { createBrowserRouter } from "react-router-dom";
import Calendar from "../modules/user/calendar/Calendar";
import Schedule from "../modules/user/dashboard/Schedule";
import Dashboard from "../modules/user/dashboard/Dashboard";
import Report from "../modules/user/dashboard/Report";
import Subscription from "../modules/user/dashboard/Subscription";
import Facebook from "../modules/user/facebook/Facebook";
import Inbox from "../modules/user/inbox/Inbox";
import Instagram from "../modules/user/instagram/Instagram";
import LinkedIn from "../modules/user/linkedin/LinkedIn";
import Twitter from "../modules/user/twitter/Twitter";
import Youtube from "../modules/user/youtube/Youtube";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Content from "../shared/layout/Content";
import ProtectedRoute from "./ProtectedRoute";
import LogoutModal from "../modals/LogoutModal";

const routes = createBrowserRouter([
  {
    path: "/",
    children: [
      { index: true, element: <Home /> },
      { path: "signin", element: <SignIn /> },
      { path: "signup", element: <SignUp /> },
      { path: "*", element: <NotFound /> },
      {
        path: "user",
        element: <Content />,
        children: [
          { path: "dashboard", element: <ProtectedRoute element={<Dashboard />} /> },
          { path: "facebook", element: <ProtectedRoute element={<Facebook />} /> },
          { path: "twitter", element: <ProtectedRoute element={<Twitter />} /> },
          { path: "youtube", element: <ProtectedRoute element={<Youtube />} /> },
          { path: "instagram", element: <ProtectedRoute element={<Instagram />} /> },
          { path: "linkedin", element: <ProtectedRoute element={<LinkedIn />} /> },
          { path: "inbox", element: <ProtectedRoute element={<Inbox />} /> },
          // { path: "calendar", element: <ProtectedRoute element={<Calendar />} /> },
          { path: "calendar", element: <Calendar />},
          { path: "schedule", element: <ProtectedRoute element={<Schedule />} /> },
          { path: "subscription", element: <ProtectedRoute element={<Subscription />} /> },
          { path: "reports", element: <ProtectedRoute element={<Report />} /> },
          { element: <ProtectedRoute element={<LogoutModal />} /> },

        ],
      },
    ],
  },
]);

export default routes;
