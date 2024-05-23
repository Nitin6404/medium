import React, { ChangeEvent, useState } from "react";
import { signupInput } from "@nitin6404/common-medium";
import axios from "axios";
import { BACKEND_URL } from "../../../config.ts"
import { useNavigate } from "react-router-dom";

const SignUpCard = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, signUpInputs);
      const jwt = response.data;
      localStorage.setItem("token", jwt);
      setLoading(false);
      navigate("/blog");
    } catch (error) {
      alert("Error in taking input");
      console.error("Error:", error);
      setLoading(false);
    }
  };

  const [signUpInputs, setSignUpInputs] = useState<signupInput>({
    email: "",
    password: "",
    name: ""
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    fieldName: keyof signupInput
  ) => {
    const { value } = e.target;
    setSignUpInputs((prevInputs) => ({
      ...prevInputs,
      [fieldName]: value
    }));
  };

  return (
    <div className="h-screen w-full flex justify-center items-center bg-gray-800">
    <div className="bg-gray-900 text-white border border-gray-700 rounded-lg shadow-lg p-8 w-full max-w-md">
      <div className="text-center text-3xl font-bold mb-6">Sign Up</div>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Name"
          className="p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={signUpInputs.name}
          onChange={(e) => handleInputChange(e, "name")}
        />
        <input
          type="email"
          placeholder="Email"
          className="p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={signUpInputs.email}
          onChange={(e) => handleInputChange(e, "email")}
        />
        <input
          type="password"
          placeholder="Password"
          className="p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={signUpInputs.password}
          onChange={(e) => handleInputChange(e, "password")}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold p-3 rounded transition duration-300"
          disabled={loading}
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </form>
    </div>
  </div>
  );
}


export default SignUpCard;