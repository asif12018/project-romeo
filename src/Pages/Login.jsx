import { useContext, useEffect } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import useUser from "../Hooks/useUser";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const {googleSignIn, setUser} = useContext(AuthContext);
    //data from context api
    const navigate = useNavigate();
    //checking user info
    const [userInfo, isLoading, refetch] = useUser();
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    //checking if the user is login or not
   
    // console.log(userInfo)
    //context api data
    
    const handleGoogleSignIn = () =>{
        googleSignIn()
        .then(async(result) => {
           
            const user = result.user;
            // console.log(user.email)
            setUser(user)
            // IdP data available using getAdditionalUserInfo(result)
            // ...

            //importing user data on database
            const userData = {
                email:user.email,
                role:'user',
                permission: false
            }
            const res = await axiosSecure.post('/user',userData)
            console.log(res);
            
            //generating token
            axiosPublic.post('/jwt', {email:user.email},{
                withCredentials:true
            })
            .then(res =>{
                console.log(res.data);
            })
            .catch(err => {
                console.error(err);
            });

            navigate('/')

            
            
            
            //redirecting user to the home page if he have permission
            
          }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
            // ...
          });
    }
    return (
        <div className="h-screen flex items-center justify-center">
            <div className="">
                <h1 className="text-4xl font-bold">To use this app you have to login first</h1>
               <div className="flex justify-center mt-6">
               <button onClick={handleGoogleSignIn} className="btn btn-primary">Continue with Google</button>
               </div>
            </div>
        </div>
    );
};

export default Login;