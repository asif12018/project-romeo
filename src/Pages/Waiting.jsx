import { useContext, useEffect } from 'react';
import waiting from '../assets/Animation - 1716706625927.json'
import Lottie from 'lottie-react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { useNavigate } from 'react-router-dom';
import useUser from '../Hooks/useUser';
const Waiting = () => {
    const navigate = useNavigate();
    //checking user info
    const [userInfo,isLoading,refetch] = useUser();
    const {user} = useContext(AuthContext);
    useEffect(()=>{
       if(userInfo?.permission == true){
          navigate('/')
       }
    },[navigate, userInfo])
    return (
        <div className='flex flex-col justify-center items-center'>
            
            <div className='w-1/3'>
            <Lottie animationData={waiting} size={'50px'}></Lottie>
            </div>
            <h2 className='text-center font-semibold'>Hey {user?.email} your successfully logedin but to use this app you need permission from your admin. <br /> ask him for permission and refresh this page</h2>
        </div>
    );
};

export default Waiting;