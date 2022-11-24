import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import { refreshToken } from "./store/thunks";
import { useEffect } from "react";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { getAuth } from "./store/slices/authSlice";
import NotFound from "./pages/NotFound/NotFound";
import Search from "./pages/Search/Search";
import { createPortal } from "react-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();
  const { hasValidToken } = useSelector(getAuth);
  const navigateToHome = <Navigate to="/home" replace={true} />;

  useEffect(() => {
    dispatch(refreshToken({ updateUser: true }));
  }, [dispatch]);

  return (
    <>
      <Routes>
        {/* Auth */}
        <Route
          path="/login"
          element={!hasValidToken ? <Login /> : navigateToHome}
        />
        <Route
          path="/signup"
          element={!hasValidToken ? <Signup /> : navigateToHome}
        />

        {/* App */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/:userId"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/search"
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

      {createPortal(<ToastContainer />, document.getElementById("toast"))}
    </>
  );
}

export default App;
