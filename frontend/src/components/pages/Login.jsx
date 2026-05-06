import React, { useState } from "react";
import Input from "../ui/Input";
import Form from "../ui/Form";
import Button from "../ui/Button";
import { loginUser } from "../../services/AuthService";

const Login = () => {
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsSubmiting(true);
    try {
      const response = await loginUser(formData);
      const token = response?.data?.token;
      console.log("login successfull", token);
      alert("Login successful!");
    } catch (err) {
      console.error(err);
      alert("Login failed. Please check your credentials.");
    } finally {
      setIsSubmiting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] flex justify-center items-center p-4 sm:p-8 overflow-hidden font-sans">
      {/* Background glowing decorations */}
      <div className="absolute top-[10%] left-[10%] w-[30%] h-[30%] rounded-full bg-indigo-600/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[30%] h-[30%] rounded-full bg-blue-600/10 blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl p-6 sm:p-10 z-10 relative">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">
            Welcome back
          </h1>
          <p className="text-zinc-400 text-sm font-medium">
            Sign in to your account to continue
          </p>
        </div>

        <Form onSubmit={submitHandler}>
          <Input
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            placeholder="you@example.com"
            onChange={changeHandler}
            disabled={isSubmiting}
            required={true}
          />

          <Input
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            placeholder="••••••••"
            onChange={changeHandler}
            disabled={isSubmiting}
            required={true}
          />

          <div className="flex items-center justify-between mt-[-10px] mb-2">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-zinc-700 bg-black accent-indigo-600 cursor-pointer"
              />
              <span className="text-sm font-medium text-zinc-400 group-hover:text-zinc-300 transition-colors select-none">
                Remember me
              </span>
            </label>
            <a
              href="#"
              className="text-sm font-semibold text-indigo-500 hover:text-indigo-400 transition-colors"
            >
              Forgot password?
            </a>
          </div>

          <Button type="submit" isSubmiting={isSubmiting} className="mt-2">
            Sign In
          </Button>

          <p className="mt-6 text-center text-sm font-medium text-zinc-400">
            Don't have an account?{" "}
            <a
              href="#"
              className="font-semibold text-white hover:text-indigo-400 transition-colors"
            >
              Sign up
            </a>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default Login;
