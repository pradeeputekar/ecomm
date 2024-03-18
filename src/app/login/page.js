"use client";
import LoginForm from "@/components/LoginForm";
import { useSession } from "next-auth/react";

const Login = () => {
  const { status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "authenticated") {
    return <p>you are already logged in</p>;
  }

  return (
    <>
      <LoginForm />
    </>
  );
};

export default Login;
