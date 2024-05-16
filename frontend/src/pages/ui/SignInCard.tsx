import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../../../config.ts";
import { signinInput } from "@nitin6404/common-medium";

export function SignInCard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [signInInputs, setSignInInputs] = useState<signinInput>({
    email: "",
    password: ""
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      // Send a POST request to the backend sign-in endpoint
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, signInInputs);
      const token = response.data.jwt; // Assuming the server returns a token upon successful sign-in
      // Store the token in local storage or state for future use (e.g., authentication)
      console.log(token); // Log the token to the console (for debugging purposes)
      localStorage.setItem("token", token);
      setLoading(false);
      // Redirect the user to the desired page (e.g., dashboard)
      navigate("/blog");
    } catch (error) {
      // Handle sign-in errors (e.g., incorrect credentials)
      alert("Invalid email or password. Please try again.");
      console.error("Sign-in Error:", error);
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    fieldName: keyof signinInput
  ) => {
    const { value } = e.target;
    setSignInInputs((prevInputs) => ({
      ...prevInputs,
      [fieldName]: value
    }));
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
       <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-semibold text-gray-100 mb-4">Sign In</h2>
        <p className="text-gray-400 mb-6">Enter your credentials to access your account.</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-400 text-sm mb-2" htmlFor="email">Email</label>
            <input onChange={(e) => handleInputChange(e, "email")} type="email" id="email" className="bg-gray-700 focus:outline-none focus:bg-white focus:text-gray-900 rounded-md py-2 px-4 w-full" placeholder="Enter your email" />
          </div>
          <div className="mb-6">
            <label className="block text-gray-400 text-sm mb-2" htmlFor="password">Password</label>
            <input onChange={(e) => handleInputChange(e, "password")} type="password" id="password" className="bg-gray-700 focus:outline-none focus:bg-white focus:text-gray-900 rounded-md py-2 px-4 w-full" placeholder="Enter your password" />
          </div>
          {loading ? (
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-400">Loading...</button>
          ) : (
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-400">Sign In</button>
          )}
        </form>
        <p className="text-gray-400 mt-4">Don't have an account? <a href="/signup" className="text-blue-400 hover:underline">Sign up</a></p>
      </div>
    </div>
  );
}
