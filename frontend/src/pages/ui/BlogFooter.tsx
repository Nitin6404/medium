const BlogFooter = () => {
  return (
    <footer className="flex justify-center items-center bg-gray-800 text-white">

      <div className=" text-center">
        <p>&copy; {new Date().getFullYear()} Your Website. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default BlogFooter;
