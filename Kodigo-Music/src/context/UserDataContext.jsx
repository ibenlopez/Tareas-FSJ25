import { createContext, useState } from "react";

//Crear mi contexto
export const UserContext = createContext();

//Crear mi proveedor: Distribuye la información (el valor que le demos)
const MyUserContext = ({children}) => {
    const[user, setUser] = useState({ email: '', menuOpen: false });
    const updateUser = (newData) => {
        setUser((prevUser) => ({ ...prevUser, ...newData }));
    };
    return(
        <UserContext.Provider value={{user, setUser:updateUser}}>
        {
            children
        }
        </UserContext.Provider>
    )
}

export default MyUserContext;