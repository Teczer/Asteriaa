import { lazy } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

import ScrollToTop from "../hooks/ScrollToTop";

const AdminPage = lazy(() => import("./components/admin/AdminPage"));
const Article = lazy(() => import("./components/article/Article"));
const AsteriaTutorial = lazy(() =>
  import("./components/tutorial/AsteriaTutorial")
);
const Collection = lazy(() => import("./components/collections/Collection"));
const EditEntrieView = lazy(() => import("./components/admin/EditEntrieView"));
const Footer = lazy(() => import("./components/footer/Footer"));
const Header = lazy(() => import("./components/header/Header"));
const Homepage = lazy(() => import("./components/homepage/Homepage"));
const Login = lazy(() => import("./components/login/Login"));
const Main = lazy(() => import("./components/main/Main"));
const Notfound = lazy(() => import("./components/notfound/Notfound"));
const Quizzcontroller = lazy(() =>
  import("./components/quizzcontroller/Quizzcontroller")
);
const Signup = lazy(() => import("./components/signup/Signup"));
const UserSettings = lazy(() =>
  import("./components/userSettings/UserSettings")
);
const VerifyEmail = lazy(() => import("./components/verifyEmail/VerifyEmail"));

import "./scss/app.scss";
import ContactPage from "./components/contact/ContactPage";

function App() {
  const location = useLocation();
  const isQuizzControllerScreen = location.pathname.includes("quizzcontroller");
  const isLoginScreen = location.pathname.includes("login");
  const isSignUpScreen = location.pathname.includes("signup");
  const isAsteriaTutorialScreen = location.pathname.includes("tutorial");
  const isVerifyingScreen = location.pathname.includes("verify");
  const isAdminScreen = location.pathname.includes("admin");

  const { user } = useAuthContext();
  return (
    <>
      {!isQuizzControllerScreen &&
        !isLoginScreen &&
        !isSignUpScreen &&
        !isVerifyingScreen &&
        !isAsteriaTutorialScreen && <Header isAdmin={isAdminScreen} />}
      <ScrollToTop>
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
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/settings/profile" element={<UserSettings />} />
          <Route path="/admin/:type" element={<AdminPage />} />
          <Route path="/admin/:type/:id" element={<EditEntrieView />} />
          <Route
            path="/quizzcontroller/:quizzType/:quizzProgression"
            element={<Quizzcontroller />}
          />
        </Routes>
      </ScrollToTop>

      {!isQuizzControllerScreen &&
        !isLoginScreen &&
        !isSignUpScreen &&
        !isAdminScreen &&
        !isVerifyingScreen &&
        !isAsteriaTutorialScreen && <Footer />}
    </>
  );
}

export default App;
