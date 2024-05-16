const Footer = () => {
  return (
    <footer className="w-full bg-gray-800 text-white py-4 fixed bottom-0">
      <div className="container mx-auto flex items-center justify-between">
        <p className="text-sm">© 2024 My Website. All rights reserved.</p>
        <nav>
          <ul className="flex">
            <li className="mx-2">
              <a href="javascript:void(0)" className="text-sm">About Me</a>
            </li>
            <li className="mx-2">
              <a href="https://github.com/Nitin6404" target="_blank" rel="noopener noreferrer" className="text-sm">Github</a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}

export default Footer;
