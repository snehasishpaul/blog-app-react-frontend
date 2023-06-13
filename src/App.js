import "./App.css";
import About from "./components/pages/About";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import Services from "./components/pages/Services";
import ContactUs from "./components/pages/ContactUs";
import BaseLayout from "./components/layouts/BaseLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorPage from "./components/pages/ErrorPage";
import PrivateLayout from "./components/layouts/PrivateLayout";
import UserDashboard from "./components/pages/user-details/UserDashboard";
import UserProfile from "./components/pages/user-details/UserProfile";
import { AuthContextProvider } from "./components/context/auth-context";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthContextProvider>
          <Routes>
            <Route path="/" element={<BaseLayout />}>
              <Route index={true} element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/services" element={<Services />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/user" element={<PrivateLayout />}>
                <Route path="dashboard" element={<UserDashboard />} />
                <Route path="profile" element={<UserProfile />} />
              </Route>
            </Route>
            <Route path="*" component={<ErrorPage />} />
          </Routes>
          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
