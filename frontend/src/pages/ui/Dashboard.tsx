import DashboardHeader from './DashboardHeader';
import PostSectionHeader from './PostSectionHeader';
import PostList from './PostList';
import axios from 'axios';
import { BACKEND_URL } from '../../../config';
import { useState, useEffect } from 'react';
import Loader from './Loader';

type Post = {
  id: number;
  title: string;
  author: string;
  date: string;
  description: string;
};


const Dashboard = () => {

  const [loading, setLoading] = useState(true);

  const [post, setPost] = useState<Post[]>([]);
  const fetchPosts = async () => {
    const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    );
    setLoading(false);
    setPost(response.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto mt-8 h-screen">
      <DashboardHeader />
      <PostSectionHeader title="All Posts" />
      {
        loading && (
          <div className='flex justify-center items-center h-full'>
            <Loader />
          </div>
        )
      }
      <PostList posts={post} />
    </div>
  );
};

export default Dashboard;
