import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Empleados from "../pages/Empleados";
import Organizaciones from "../pages/organizaciones";
import Dispositivos from "../pages/Dispositivos";
import Organizacion from "../pages/Organizacion";


export const AppRoutes = () => {
    return (
        <BrowserRouter>
        <Routes>
        <Route path="/empleados" element={<Empleados/>}/>
        <Route path="/" element={<Login/>}/>
        <Route path='/organizaciones' element={<Organizaciones/>}/>
        <Route path='/organizaciones/:id' element={<Organizacion/>}/>
        <Route path="/dispositivos" element={<Dispositivos />} />
        </Routes>
        </BrowserRouter>
    )   
}

export default AppRoutes            