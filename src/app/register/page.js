"use client";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function SignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: null,
    email: null,
    password: null,
    confirmPassword: null,
  });
  const [loading, setLoading] = useState(true);

  const validateName = (name) => {
    return name.length >= 2 ? null : "Name must be at least 2 characters";
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email) ? null : "Invalid email address";
  };

  const validatePassword = (password) => {
    return password.length >= 6
      ? null
      : "Password must be at least 6 characters";
  };

  const validateConfirmPassword = (confirmPassword) => {
    return confirmPassword === formData.password
      ? null
      : "Passwords must match";
  };

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });

    if (field === "name") {
      setErrors({
        ...errors,
        name: validateName(value),
      });
    } else if (field === "email") {
      setErrors({
        ...errors,
        email: validateEmail(value),
      });
    } else if (field === "password") {
      setErrors({
        ...errors,
        password: validatePassword(value),
        confirmPassword: validateConfirmPassword(formData.confirmPassword),
      });
    } else if (field === "confirmPassword") {
      setErrors({
        ...errors,
        confirmPassword: validateConfirmPassword(value),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      toast.error("All fields are required");
      return;
    }

    if (
      errors.name ||
      errors.email ||
      errors.password ||
      errors.confirmPassword
    ) {
      toast.error("Form has errors. Please fix them before submitting.");
      return;
    }
    setLoading(false);
    const dataToSend = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };
    try {
      const response = await axios.post("/api/auth/createuser", dataToSend);
      toast.success("User registered successfully!");
    } catch (error) {
      toast.info("user already exist");
      console.log("user already exist", error);
    } finally {
      setLoading(true);
    }
  };

  return (
    <div className="p-10 w-full max-w-screen-sm md:w-1/2 lg:w-1/2 flex justify-center flex-col gap-6 mx-auto">
      <h1 className="font-bold text-lg xl:text-xl text-center">
        Welcome, Create your New Account
      </h1>
      <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          className="p-4 border border-gray-300 rounded-md"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
        {errors.name && <div className="text-red-600">{errors.name}</div>}

        <input
          type="text"
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

        <input
          type="password"
          placeholder="Confirm Password"
          className="p-4 border border-gray-300 rounded-md"
          value={formData.confirmPassword}
          onChange={(e) => handleChange("confirmPassword", e.target.value)}
        />
        {errors.confirmPassword && (
          <div className="text-red-600">{errors.confirmPassword}</div>
        )}

        <button
          disabled={!loading}
          className="p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          type="submit"
        >
          {loading ? "Sign Up" : "Processing..."}
        </button>
      </form>
    </div>
  );
}

export default SignupForm;
