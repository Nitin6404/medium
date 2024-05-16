import React from 'react';
import { BsHandThumbsUp } from 'react-icons/bs'; // Import the thumbs up icon from react-icons/bs
import { HiMiniChatBubbleOvalLeftEllipsis } from 'react-icons/hi2';
import img from '../../assets/women.jpg'; // Import the image for the post
import { useNavigate } from 'react-router-dom';

type PostCardProps = {
  id: number;
  title: string;
  author: string;
  date: string;
  description: string;
};

const PostCard: React.FC<PostCardProps> = ({ id, title, author, date, description  }) => {
  const navigate = useNavigate();

  return (
    <article onClick={() => {
      navigate(`/blog/${id}`);
    }} className="overflow-hidden rounded-lg shadow-md hover:shadow-lg bg-blue-200 dark:bg-blue-800"> {/* Main article container */}
      <img alt="" src={img} className="h-56 w-full object-cover" /> {/* Post image */}

      <div className="p-4 sm:p-6 bg-white dark:bg-gray-800"> {/* Post content container */}
        <time className="block text-xs text-gray-500 dark:text-gray-400">{date}</time> {/* Date of the post */}
        
        <a href="#" className="mt-2 block text-xl text-gray-900 dark:text-white hover:text-blue-600">{title}</a> {/* Post title */}
        
        <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">{description}</p> {/* Post description */}
        
        <div className="flex items-center mt-4"> {/* Author section */}
          <img src={img} alt="Author" className="h-8 w-8 rounded-full" /> {/* Author avatar */}
          <p className="ml-2 text-sm text-gray-600 dark:text-gray-300">{author}</p> {/* Author name */}
        </div>

        <div className="mt-4 flex justify-between items-center"> {/* Like, Comment, and Read More section */}
          <div className="flex items-center"> {/* Like */}
          <BsHandThumbsUp  className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <span className="ml-1 text-gray-500 dark:text-gray-400">Likes</span>
          </div>
          <div className="flex items-center"> {/* Comment */}
          <HiMiniChatBubbleOvalLeftEllipsis className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <span className="ml-1 text-gray-500 dark:text-gray-400">Comments</span>
          </div>
          <button className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300">Read More</button> {/* Read more button */}
        </div>
      </div>
    </article>
  );
};

export default PostCard;
