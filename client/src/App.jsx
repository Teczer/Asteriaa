import Article from "./components/article/Article";
import Header from "./components/header/Header";
import Main from "./components/main/Main";
import Quizzcontroller from "./components/quizzcontroller/Quizzcontroller";
import Notfound from "./components/notfound/Notfound";
import Homepage from "./components/homepage/Homepage";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import Footer from "./components/footer/Footer";
import AsteriaTutorial from "./components/tutorial/AsteriaTutorial";
import "./scss/app.scss";

import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import UserSettings from "./components/userSettings/UserSettings";
import VerifyEmail from "./components/verifyEmail/VerifyEmail";
import Collection from "./components/collections/Collection";

function App() {
  const location = useLocation();
  const isQuizzControllerScreen = location.pathname.includes("quizzcontroller");
  const isLoginScreen = location.pathname.includes("login");
  const isSignUpScreen = location.pathname.includes("signup");
  const isAsteriaTutorialScreen = location.pathname.includes("tutorial");
  const isVerifyingScreen = location.pathname.includes("verify");

  const { user } = useAuthContext();
  return (
    <>
      {!isQuizzControllerScreen &&
        !isLoginScreen &&
        !isSignUpScreen &&
        !isVerifyingScreen &&
        !isAsteriaTutorialScreen && <Header />}
      <Routes>
        <Route path="/tutorial" element={<AsteriaTutorial />} />
        <Route path="/" element={<Homepage />} />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to="/" />}
        />
        <Route path="/verify" element={<VerifyEmail />} />
        <Route path="*" element={<Notfound />} />
        <Route path="/quizz" element={<Main />} />
        <Route path="/news" element={<Article />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/settings/profile" element={<UserSettings />} />
        <Route
          path="/quizzcontroller/:quizzType/:quizzProgression"
          element={<Quizzcontroller />}
        />
      </Routes>
      {!isQuizzControllerScreen &&
        !isLoginScreen &&
        !isSignUpScreen &&
        !isVerifyingScreen &&
        !isAsteriaTutorialScreen && <Footer />}
    </>
  );
}

export default App;
