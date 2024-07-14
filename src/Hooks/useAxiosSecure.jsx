import axios from "axios";


const axiosSecure = axios.create({
    baseURL:'https://timer-server-three.vercel.app'
})

const useAxiosSecure = () => {
    return axiosSecure
};

export default useAxiosSecure;

//https://timer-server-three.vercel.app