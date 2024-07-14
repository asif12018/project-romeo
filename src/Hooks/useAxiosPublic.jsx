import axios from "axios";


const axiosPublic = axios.create({
    baseURL:'https://timer-server-three.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;

//https://timer-server-three.vercel.app