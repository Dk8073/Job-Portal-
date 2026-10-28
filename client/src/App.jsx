import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import NavBar from "./components/NavBar";
import SavedJob from "./Pages/SavedJob";
import Job from "./Pages/Job";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Account from "./Pages/Account";
import { useUser } from "./context/UserContext";

const AppRouter = () => {
  const { user, isLogIn, loading } = useUser();
  // console.log(user);

  return (
    <>
      {loading ? (
        <div className="w-full min-h-screen flex items-center justify-center gap-6">
          <span className="w-6 h-6 border-4 border-blue-800 border-t-transparent rounded-full animate-spin"></span>{" "}
          <p className="text-4xl text-blue-800 font-bold">Loading...</p>
        </div>
      ) : (
        <div>
          <NavBar />
          <main>
            <Routes>
              <Route
                path="/"
                element={isLogIn ? <Job /> : <Navigate to="/login" />}
              />
              <Route
                path="/login"
                element={!isLogIn ? <Login /> : <Navigate to="/" />}
              />
              <Route
                path="/signup"
                element={!isLogIn ? <Signup /> : <Navigate to="/" />}
              />
              <Route
                path="/saved-jobs"
                element={isLogIn ? <SavedJob /> : <Navigate to="/login" />}
              />
              <Route
              path="/account"
              element={isLogIn ? <Account/> : <Navigate to="/login"/>}
              />
            </Routes>
          </main>
        </div>
      )}
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
