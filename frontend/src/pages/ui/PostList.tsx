import React from 'react';
import PostCard from './PostCard';

type Post = {
  id: number;
  title: string;
  author: string;
  date: string;
  description: string;
};

type PostGridProps = {
  posts: Post[];
};

const PostGrid: React.FC<PostGridProps> = ({ posts }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post, index) => (
        <PostCard
          id={post.id}
          key={index}
          title={post.title}
          author={post.author}
          date={post.date}
          description={post.description}
        />
      ))}
    </div>
  );
};

export default PostGrid;
