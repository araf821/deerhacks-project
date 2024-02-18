import Loader from "@/components/Loader";
import RegisterForm from "@/components/auth/RegisterForm";
import { Suspense } from "react";

const RegisterPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <RegisterForm />
    </Suspense>
  );
};

export default RegisterPage;
