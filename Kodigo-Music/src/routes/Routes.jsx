import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/home/Home";
import MyUserContext from "../context/UserDataContext";
import Menu from "../pages/menu/Menu";
import Navegation from "../pages/navegation/Navegation";
import Footer from "../pages/footer/Footer";

function MyRoutes() {

    return (
        <>
            <MyUserContext>
                <BrowserRouter>
                    <Menu />
                    <div className="content-app" >
                        <Navegation />
                        <Routes>
                            <Route path="/*" element={<Navigate to="/home" replace />} />
                            <Route path='/home' element={<Home />} />
                        </Routes>
                    </div>
                    <div className="footer-container">
                        <Footer />
                    </div>
                </BrowserRouter>
            </MyUserContext>
        </>
    );
}

export default MyRoutes;