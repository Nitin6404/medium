import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUp from './pages/components/SignUp'
import Signin from './pages/components/SignIn'
import Blog from './pages/components/Blog'
import CreateBlog from './pages/components/CreateBlog'
import SpecificBlog from './pages/components/SpecificBlog'
import './index.css'
import Loader from './pages/ui/Loader'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/"         element={<Signin />} />
          <Route path="/signup"   element={<SignUp />} />
          <Route path="/signin"   element={<Signin />} />
          <Route path="/blog" element={<Blog />}   />
          <Route path="/blog/:id" element={<SpecificBlog  blogId='ada60c45-f5ef-43fe-b5ba-b55b5c1f71e4' />}   />
          <Route path="/blog/create" element={<CreateBlog />}   />
          <Route path="/loader" element={<Loader />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App