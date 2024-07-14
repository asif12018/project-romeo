import { useContext } from "react";
import useUser from "../Hooks/useUser";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Dashboard from './../Pages/Dashboard';



const AdminRoute = () => {
    const {user, loading} = useContext(AuthContext);
    const [userInfo, isLoading] = useUser();
    if(loading || isLoading){
        return <div>loading.........</div>
    }
    
    console.log('data for user info',userInfo.role);

    if(user && userInfo.role === 'admin'){
        
        return <Dashboard></Dashboard>
    }
    return <Navigate to={'/'}></Navigate>
};

export default AdminRoute;