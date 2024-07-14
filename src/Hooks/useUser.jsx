import { useContext } from "react";
import useAxiosPublic from "./useAxiosPublic";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";


const useUser = () => {
    const {user} = useContext(AuthContext);
    const axiosSecure = useAxiosPublic();
    const {data:userInfo, isLoading, refetch} = useQuery({
        queryKey:[user?.email, 'user'],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/user/${user.email}`)
            return res.data;
        }
    })

    return [userInfo, isLoading, refetch]
    
};

export default useUser;