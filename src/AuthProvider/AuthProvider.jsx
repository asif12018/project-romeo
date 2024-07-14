/* eslint-disable react/prop-types */
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from './../firebase/firebase.config';
import useAxiosPublic from './../Hooks/useAxiosPublic';
import axios from "axios";





export const AuthContext = createContext('')

const AuthProvider = ({children}) => {
    const axiosPublic = useAxiosPublic()
    const [user,setUser] = useState(null);
    const [loading, setLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider()
    
    // google singin
    const googleSignIn = () =>{
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }
    //logout
    const Logout = () =>{
        setLoading(true);
        return signOut(auth)
    }

    //observer
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, currentUser => {
          const userEmail = currentUser?.email || user?.email;
          const loggedUser = userEmail;
          // console.log('this is email',loggedUser)
          setUser(currentUser);
          // console.log('current user new user is', currentUser);
          setLoading(false);
          //generating token if exist is login
          if(currentUser){
              
              axiosPublic.post('/jwt', {email:loggedUser},{
                  withCredentials:true
              })
              .then(res =>{
                  console.log(res.data);
              })
              .catch(err => {
                  console.error(err);
              });

          }else{
              
              axiosPublic.post('/logout',loggedUser,{
                  withCredentials:true
              })
              .then(res =>{
                  console.log(res.data)
              })
              .catch(err =>{
                  console.error(err)
              })
          }
      });
      return () => {
          return unsubscribe();
      }
  }, [user?.email, axiosPublic])

    const authInfo = {googleSignIn, user, setUser, loading, Logout}
    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;