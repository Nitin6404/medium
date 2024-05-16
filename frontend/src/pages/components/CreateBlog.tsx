import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBlogInput } from '@nitin6404/common-medium';
import { BACKEND_URL } from '../../../config';

const CreatePost = () => {
  const navigate = useNavigate();
  const [createBlog, setCreateBlog] = useState<createBlogInput>({
    title: '',
    content: '',
  });

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCreateBlog((prevState) => ({
      ...prevState,
      title: event.target.value,
    }));
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCreateBlog((prevState) => ({
      ...prevState,
      content: event.target.value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Perform any validation if needed
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/blog/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          // Add any authentication headers if needed
        },
        body: JSON.stringify(createBlog),
      });
      if (response.ok) {
        const data = await response.json();
        // Reset the form fields
        setCreateBlog({ title: '', content: '' });
        const postId = data.id;
        console.log(postId);
        navigate(`/blog/${postId}`);
    } else {
        console.error('Failed to create post:', response.statusText);
      }
    // Send the new post data to your backend or handle it as needed
    console.log('New Blog Post:', createBlog);
    // Reset the form fields
  } catch (error) {
    console.error('Error creating post:', error);
  }


};

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-900 text-white">
      <h1 className="text-3xl font-semibold mb-8 text-center">Create a New Blog Post</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-6">
          <label htmlFor="title" className="block text-gray-300 font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="w-full px-4 py-2 border-b-2 border-gray-600 focus:outline-none focus:border-blue-500 placeholder-gray-500 bg-gray-800 text-white"
            placeholder="Enter the title of your post"
            value={createBlog.title}
            onChange={handleTitleChange}
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="content" className="block text-gray-300 font-bold mb-2">
            Content
          </label>
          <textarea
            id="content"
            className="w-full px-4 py-2 border-b-2 border-gray-600 focus:outline-none focus:border-blue-500 placeholder-gray-500 bg-gray-800 text-white"
            placeholder="Enter the content of your post"
            rows={5}
            value={createBlog.content}
            onChange={handleContentChange}
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-md focus:outline-none focus:ring focus:ring-blue-400 transition duration-300"
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
