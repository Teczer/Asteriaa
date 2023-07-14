import Article from "./components/article/Article";
import Header from "./components/header/Header";
import Main from "./components/main/Main";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import "./scss/app.scss";
import Notfound from "./components/notfound/Notfound";
import Homepage from "./components/homepage/Homepage";
import Quizzcontroller from "./components/quizzcontroller/Quizzcontroller";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import { useAuthContext } from "../hooks/useAuthContext";
import Footer from "./components/footer/Footer";
import AsteriaTutorial from "./components/tutorial/asteriaTutorial";

function App() {
  const location = useLocation();
  const isQuizzControllerScreen = location.pathname.includes("quizzcontroller");
  const isLoginScreen = location.pathname.includes("login");
  const isSignUpScreen = location.pathname.includes("signup");
  const isAsteriaTutorialScreen = location.pathname.includes("tutorial");
  const { user } = useAuthContext();
  return (
    <>
      {!isQuizzControllerScreen &&
        !isLoginScreen &&
        !isSignUpScreen &&
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
        <Route path="*" element={<Notfound />} />
        <Route path="/quizz" element={<Main />} />
        <Route path="/news" element={<Article />} />
        <Route
          path="/quizzcontroller/:quizzType/:quizzProgression"
          element={<Quizzcontroller />}
        />
      </Routes>
      {!isQuizzControllerScreen &&
        !isLoginScreen &&
        !isSignUpScreen &&
        !isAsteriaTutorialScreen && <Footer />}
    </>
  );
}

export default App;
