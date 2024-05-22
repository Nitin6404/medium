import { Input } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { PencilIcon } from "@heroicons/react/20/solid";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/20/solid";

const HeaderForBlog = () => {
  return (
    <header className="bg-white text-gray-900 w-full py-4 px-6 sm:px-6 md:px-8 lg:px-10 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <Link className="flex items-center gap-2 font-bold text-lg mb-4 md:mb-0" to="/blog/create">
          <PencilIcon className="h-6 w-6 " />
          <span>Create Blog</span>
        </Link>
        <nav className="md:flex items-center gap-4 hidden">
          <Link className="hover:underline" to="/blog">Home</Link>
          <Link className="hover:underline" to="/blog">Blog</Link>
          <Link className="hover:underline" to="https://github.com/nitin6404">About Me</Link>
          <Link className="hover:underline" to="https://linkedin.com/in/nitin6404">Contact Me</Link>
        </nav>
        <div className="relative w-full md:w-auto">
          <Input
            className="bg-black border-none pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700 w-full md:block md:w-64 lg:w-96"
            placeholder="Search..."
            type="search"
          />
          <MagnifyingGlassCircleIcon className="h-6 w-6 absolute top-2 left-2 text-gray-400" />
        </div>
      </div>
    </header>
  );
};

export default HeaderForBlog;
