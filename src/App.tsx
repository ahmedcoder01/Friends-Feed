import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { refreshToken } from "./store/thunks";
import { lazy, Suspense, useEffect } from "react";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { getAuth } from "./store/slices/authSlice";
import NotFound from "./pages/NotFound/NotFound";
import { createPortal } from "react-dom";
import { ToastContainer } from "react-toastify";
import { useAppDispatch } from "./store/hooks";
import PATHS from "./routes";
import { getUI } from "./store/slices/uiSlice";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Loader from "./components/UI/Loader/Loader";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";

// Lazy load components
const Home = lazy(() => import("./pages/Home/Home"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const Search = lazy(() => import("./pages/Search/Search"));

function App() {
  const dispatch = useAppDispatch();
  const { hasValidToken, authLoading } = useSelector(getAuth);
  const { sidebarOpen } = useSelector(getUI);
  const navigateToHome = <Navigate to={PATHS.home.root} replace={true} />;

  useEffect(() => {
    dispatch(refreshToken({ updateUser: true }));

    // refresh token every 5 minutes
    const interval = setInterval(() => {
      dispatch(refreshToken({ updateUser: true }));
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`${sidebarOpen ? "h-screen overflow-hidden" : ""}`}>
      <Routes>
        {/* Auth */}
        <Route
          path={PATHS.login.root}
          element={!authLoading && !hasValidToken ? <Login /> : navigateToHome}
        />
        <Route
          path={PATHS.signup.root}
          element={!authLoading && !hasValidToken ? <Signup /> : navigateToHome}
        />

        {/* App */}
        <Route
          path={PATHS.home.root}
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path={PATHS.profile.root}
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path={PATHS.search.root}
          element={
            <ProtectedRoute>
              <Search />
            </ProtectedRoute>
          }
        />

        <Route path="/" element={navigateToHome} />

        {/* No match */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {createPortal(<ToastContainer />, document.getElementById("toast")!)}
      {/* portal for sidebar */}
    </div>
  );
}

export default App;
