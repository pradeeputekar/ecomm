import Link from "next/link";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { FaGoogle } from "react-icons/fa";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: null,
    password: null,
  });

  const router = useRouter();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email) ? null : "Invalid email address";
  };

  const validatePassword = (password) => {
    return password.length >= 6
      ? null
      : "Password must be at least 6 characters";
  };

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });

    if (field === "email") {
      setErrors({
        ...errors,
        email: validateEmail(value),
      });
    } else if (field === "password") {
      setErrors({
        ...errors,
        password: validatePassword(value),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (errors.email || errors.password) {
      console.log("Form has errors. Please fix them before submitting.");
      return;
    }
    try {
      const res = await signIn("credentials", {
        ...formData,
        redirect: false,
      });
      if (res?.error) {
        toast.error("Invalid credentials");
      } else {
        toast.success("successful login");
        router.push("/");
      }
    } catch (error) {
      toast.error("Internal server error");
      console.error("Error signing in:", error);
    }
  };
  return (
    <div className="p-10  max-w-screen-sm flex justify-center flex-col gap-8 mx-auto">
      <h1 className="font-bold text-lg xl:text-xl text-center">
        Welcome, Log In into your Account
      </h1>
      <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          className="p-4 border border-gray-300 rounded-md"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
        {errors.email && <div className="text-red-600">{errors.email}</div>}
        <input
          type="password"
          placeholder="Password"
          className="p-4 border border-gray-300 rounded-md"
          value={formData.password}
          onChange={(e) => handleChange("password", e.target.value)}
        />
        {errors.password && (
          <div className="text-red-600">{errors.password}</div>
        )}
        <button
          type="submit"
          className="p-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Log in
        </button>
      </form>
      <hr className="my-2" />
      <button
        className="flex gap-4 p-4 ring-1 ring-orange-100 rounded-md text-center justify-center"
        onClick={() => {
          signIn("google");
        }}
      >
        <FaGoogle size={20} />
        <span className="self-center"> Log In with Google </span>
      </button>
      <Link
        className="p-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-center"
        href="/register"
      >
        Sign Up
      </Link>
    </div>
  );
};

export default LoginForm;
