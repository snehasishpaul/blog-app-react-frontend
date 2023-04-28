import "./App.css";
import About from "./components/pages/About";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import Services from "./components/pages/Services";
import BaseLayout from "./components/layouts/BaseLayout";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<BaseLayout />}>
                        <Route index={true} element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/about" element={<About />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
