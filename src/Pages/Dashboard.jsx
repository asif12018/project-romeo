import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from './../Hooks/useAxiosSecure';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import './Dashboard.css'
import search from '../assets/search.json';
import Lottie from "lottie-react";

const Dashboard = () => {
  const axiosSecure = useAxiosSecure();

  // Pagination related code
  // Load total user count
  const { data: userCount, isLoading: isUser } = useQuery({
    queryKey: ['userCount'],
    queryFn: async () => {
      const res = await axiosSecure.get('/userCount');
      return res.data;
    }
  });

  // Item per page state
  const [itemsPerPage, setItemsPerPage] = useState(5);
  // Current page state
  const [currentPage, setCurrentPage] = useState(1);
  // Number of pages state
  const [numberOfPages, setNumberOfPages] = useState(0);

  useEffect(() => {
    if (userCount?.count) {
      const pages = Math.ceil(userCount.count / itemsPerPage);
      setNumberOfPages(pages);
    }
  }, [userCount, itemsPerPage]);

  const pages = [];
  for (let i = 1; i <= numberOfPages; i++) {
    pages.push(i);
  }

  // Handle page change
  const getCurrentPage = (e) => {
    const selectedPage = parseInt(e.target.innerText);
    setCurrentPage(selectedPage);
  };

  // Handle next and previous button
  const handleBtnNext = (value) => {
    if (value === 'previous' && currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    } else if (value === 'next' && currentPage < numberOfPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  // Fetch user data based on current page and items per page
  const { data: user, isLoading, refetch } = useQuery({
    queryKey: ['allUser', currentPage, itemsPerPage],
    queryFn: async () => {
      const res = await axiosSecure.get(`/allUser?page=${currentPage}&size=${itemsPerPage}`);
      return res.data;
    }
  });

  // useEffect(() => {
  //   refetch();
  // }, [currentPage, itemsPerPage, refetch]);

  if (isLoading) {
    return <div className="flex flex-col h-screen  justify-center items-center">
    <div className='w-1/3'>
   <Lottie animationData={search} size={'50px'}></Lottie>
   </div>
   <h1 className="text-4xl font-bold">{ 'please wait  Dashboard is loading'}......</h1></div>;
  }

  // Suspend a user
  const handleSuspend = async (id) => {
    await axiosSecure.patch(`/action/${id}`);
    refetch();
  };

  // Unsuspend a user
  const handleUnsuspend = async (id) => {
    await axiosSecure.patch(`/actions/${id}`);
    refetch();
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>

        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>No</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
                <th>Promote</th>
              </tr>
            </thead>
            <tbody>
              {user?.map((data, index) => (
                <tr key={data._id}>
                  <th>{index + 1}</th>
                  <td>{data.email}</td>
                  <td>{data.role}</td>
                  <td>
                    {data.role === 'admin' ? (
                      <button className="btn" disabled>
                        Suspended
                      </button>
                    ) : (
                      <>
                        {data.permission ? (
                          <button onClick={() => handleSuspend(data._id)} className="btn btn-error">
                            Suspend
                          </button>
                        ) : (
                          <button onClick={() => handleUnsuspend(data._id)} className="btn btn-ghost">
                            Unsuspend
                          </button>
                        )}
                      </>
                    )}
                  </td>
                  <td>
                    <button className="btn">Promote to Co-Admin</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <div className="pagination">
              <button onClick={() => handleBtnNext('previous')} className="btn mr-1">
                Previous
              </button>
              {pages.map(page => (
                <button
                  key={page}
                  className={currentPage === page ? 'btn selected' : 'btn'}
                  onClick={getCurrentPage}
                >
                  {page}
                </button>
              ))}
              <button onClick={() => handleBtnNext('next')} className="btn ml-1">
                Next
              </button>
            </div>
          </div>
        </div>
        <Link className="btn btn-primary" to={'/'}>
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
