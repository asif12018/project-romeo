import { useContext, useEffect, useState } from 'react';
import moment from 'moment-timezone';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useUser from '../Hooks/useUser';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/AuthProvider';
import search from '../assets/search.json'
import Lottie from 'lottie-react';

const Time = () => {
  const {Logout, setUser} = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const [bangladeshTime, setBangladeshTime] = useState(moment().tz('Asia/Dhaka').format('YYYY-MM-DD HH:mm:ss'));
  const [userInfo, userLoading] = useUser();
  const navigate = useNavigate();
  //logout user
  const handleLogout = () =>{
    Logout()
    .then(() => {
      // Sign-out successful.
      setUser(null)
      console.log('user logout')
    }).catch((error) => {
      // An error happened.
    });
  }
  useEffect(() => {
    const updateBangladeshTime = () => {
      const time = moment().tz('Asia/Dhaka').format('mm:ss');
      setBangladeshTime(time);
      document.title = time;
    };

    const intervalId = setInterval(updateBangladeshTime, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (!userLoading) {
      if (userInfo?.permission === false) {
        navigate('/waiting');
      }

      if (userInfo?.role === 'admin') {
        setIsAdmin(true);
      }
    }
  }, [navigate, userInfo, userLoading]);

  useEffect(() => {
    const audio = new Audio('audio1.mp3');
    audio.loop = true;
    audio.play().catch(error => {
      console.error('Audio playback error:', error);
    });

    return () => {
      audio.pause();
    };
  }, []);
  //refresh this page every 10s
 

  // Tanstack query
  const { data, isLoading: queryLoading, refetch } = useQuery({
    queryKey: ['verse'],
    queryFn: async () => {
      const res = await axios.get(`https://api.alquran.cloud/v1/ayah/random/en.asad?timestamp=${new Date().getTime()}`);
      return res.data;
    },
    refetchInterval: 10000, // Automatically refetch every 10 seconds
  });

  if (userLoading || queryLoading) {
    return  <div className="flex flex-col h-screen  justify-center items-center">
    <div className='w-1/3'>
   <Lottie animationData={search} size={'50px'}></Lottie>
   </div>
   <h1 className="text-4xl font-bold">{ 'please wait  Home is loading'}......</h1></div>;
  }

  

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-[url('https://i.postimg.cc/kX0VkKD0/pexels-vitor-almeida-862456-1840142.jpg')] bg-center bg-cover bg-no-repeat text-white">
      <div className="space-y-6 w-1/2 backdrop-blur-sm bg-white/30 p-12 rounded-3xl roboto-bold">
        <div>
          <p className="text-2xl font-bold text-center">{bangladeshTime}</p>
        </div>
        <h1 className="text-4xl font-bold text-center">Minute and second</h1>
        <h3 className="text-lg font-bold">{data?.data.text}</h3>
        <h4 className="font-bold">Surah: {data?.data.surah.englishName}</h4>
        {isAdmin && <Link to={'/dashboard'} className="btn btn-primary">Admin Dashboard</Link>}
        <button onClick={handleLogout} className='btn btn-error'>LogOut</button>
      </div>
    </div>
  );
};

export default Time;
