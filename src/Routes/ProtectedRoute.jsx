import { useContext, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import useUser from "../Hooks/useUser";
import Waiting from './../Pages/Waiting';
import Lottie from 'lottie-react';
import search from '../assets/search.json'
const ProtectedRoute = ({children}) => {
    const [userInfo, isLoading, refetch] = useUser();
    
    const {user, loading} = useContext(AuthContext);
    // console.log('is loading',isLoading)

    // if(loading){
    //     return <div className="flex flex-col h-screen  justify-center items-center">
    //          <div className='w-1/3'>
    //         <Lottie animationData={search} size={'50px'}></Lottie>
    //         </div>
    //         <h1 className="text-4xl font-bold">{isLoading ? 'please wait  page is loading':'please refresh this page'}......</h1></div>
    // }
    if(loading){
        return <div className="flex flex-col h-screen  justify-center items-center">
             <div className='w-1/3'>
            <Lottie animationData={search} size={'50px'}></Lottie>
            </div>
            <h1 className="text-4xl font-bold">{isLoading ? 'please wait  page is loading':'please refresh this page'}......</h1></div>
    }
    
    // console.log('this is user',user)
    if(user && userInfo?.permission == false){
        return <Waiting></Waiting>
    }

    // console.log('this is user',user)
    if(user && userInfo?.permission == true){
        return children;
    }

  
    return (
       <>
       <Navigate to={'/login'}></Navigate>
       </>
    );
};

export default ProtectedRoute;