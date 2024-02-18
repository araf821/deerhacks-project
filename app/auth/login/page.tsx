import Loader from "@/components/Loader";
import LoginForm from "@/components/auth/LoginForm";
import { Suspense } from "react";

const LoginPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <LoginForm />
    </Suspense>
  );
};

export default LoginPage;
