import axios from "axios";
import React, { useEffect, useState } from 'react';
import { BACKEND_URL } from "../../../config";
import HeaderForBlog from "../ui/HeaderForBlog";
import ArticleBlog from "../ui/ArticleBlog";
import Loader from "../ui/Loader";

interface Blog {
    title: string;
    content: string;
    author: string;
}

interface SpecificBlogProps {
    blogId: string;
}

const SpecificBlog: React.FC<SpecificBlogProps> = ({ blogId }) => {
    const [post, setPost] = useState<Blog | null>(null);

    useEffect(() => {
        const fetchBlog = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${blogId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const data = response.data;
                setPost(data);
            } catch (error) {
                console.error("Error fetching blog:", error);
            }
        };

        fetchBlog();
    }, [blogId]);

    if (!post) {
        return <div>
            <HeaderForBlog />
            <Loader />
        </div>;
    }

    return (
        <>
            <HeaderForBlog />
            <ArticleBlog title={post.title} content={post.content} author={post.author} />
        </>
    );
};

export default SpecificBlog;
