import "./App.css";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import { RegisterPage } from "./pages/RegisterPage";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage.tsx";
import { Toaster } from "react-hot-toast";
import { ProfilePage } from "./pages/ProfilePage.tsx";
import { useThemeStore } from "./store/themeStore.tsx";
import { useEffect } from "react";
import GuestRoute from "./utils/GuestRoute.tsx";
import ProtectedRoute from "./utils/ProtectedRoute.tsx";
import { BoardPage } from "./pages/BoardPage.tsx";
import { BoardDetails } from "./components/BoardDetails.tsx";

function App() {
  const darkMode = useThemeStore((state) => state.darkMode);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <>
      <Toaster position="top-right" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/boards" element={<BoardPage />} />
          <Route path="/boards/:id" element={<BoardDetails />} />
          <Route
            path="/login"
            element={
              <GuestRoute>
                <LoginPage />
              </GuestRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
