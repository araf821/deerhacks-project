"use client";

import { LoginSchema } from "@/actions/login/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import CardWrapper from "../CardWrapper";
import { BookMarked } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import AuthFooter from "./AuthFooter";
import { useTransition } from "react";
import { login } from "@/actions/login";
import { toast } from "sonner";

interface LoginFormProps {}

const LoginForm = ({}: LoginFormProps) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    startTransition(async () => {
      await login(values).then((data) => {
        if (data?.error) {
          toast.error(data.error);
        }
      });
    });
  };

  return (
    <CardWrapper>
      <h2 className="flex items-center gap-2 pb-6 text-lg font-medium text-white md:text-xl">
        <BookMarked className="h-5 w-5" />
        EduMates
      </h2>

      <h3 className="text-xl text-zinc-200 md:text-2xl">Login</h3>
      <p className="text-zinc-500 max-md:text-sm">to continue to Edumates</p>

      <hr className="mb-6 mt-2 border-zinc-700" />

      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    type="email"
                    placeholder="username@university.ca"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    type="password"
                    placeholder="******"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-full" disabled={isPending}>
            LET ME IN
          </Button>
        </form>
      </Form>

      <hr className="mb-4 mt-6 border-zinc-700" />

      <div className="mb-4 flex items-center">
        <span className="mr-2 text-zinc-500 max-md:text-sm">
          New to EduMates?
        </span>
        <Link
          href="/auth/register"
          className="text-zinc-200 underline-offset-4 hover:underline"
        >
          Create New Account
        </Link>
      </div>

      <hr className="mb-4 border-zinc-700" />
      <AuthFooter />
    </CardWrapper>
  );
};

export default LoginForm;
