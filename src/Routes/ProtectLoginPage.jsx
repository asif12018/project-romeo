import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Time from "../Pages/Time";
import { Navigate } from "react-router-dom";


const ProtectLoginPage = ({children}) => {
    //data from context api
    const {user, loading} = useContext(AuthContext);
    console.log(user);
    if(user){
        return <Navigate to={'/'}></Navigate>
    }
    return (
        <>
          {children}
        </>
    );
};

export default ProtectLoginPage;