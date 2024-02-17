"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import CardWrapper from "../CardWrapper";
import { BookMarked } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import AuthFooter from "./AuthFooter";
import { useState, useTransition } from "react";
import { login } from "@/actions/login";
import { toast } from "sonner";
import { RegisterSchema } from "@/actions/register/schema";
import UploadProfilePicture from "../UploadProfilePicture";
import Image from "next/image";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { universities } from "@/lib/data/constants";
import { register } from "@/actions/register";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      imageUrl: "",
      university: undefined,
    },
  });
  const imageUrl = form.watch("imageUrl");
  const clearImage = () => {
    form.setValue("imageUrl", "");
  };

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    startTransition(async () => {
      await register(values).then((data) => {
        if (data?.error) {
          toast.error(data.error);
        }

        if (data.success) {
          toast.success(data.success);
        }

        router.push("/auth/login");
      });
    });
  };

  return (
    <CardWrapper size="xl">
      <h2 className="flex items-center gap-2 pb-6 text-lg font-medium text-white md:text-xl">
        <BookMarked className="h-5 w-5" />
        EduMates
      </h2>

      <h3 className="text-xl text-zinc-200 md:text-2xl">Sign Up</h3>
      <p className="text-zinc-500 max-md:text-sm">to be a part of EduMates</p>

      <hr className="mb-6 mt-2 border-zinc-700" />

      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          {form.getValues("imageUrl") !== "" ? (
            <div className="text-center">
              <div className="relative mx-auto mt-4 aspect-square w-full max-w-[150px] overflow-hidden rounded-full border border-zinc-600 dark:border-zinc-700">
                <Image
                  alt="user profile picture"
                  fill
                  className="object-cover"
                  src={imageUrl}
                  sizes="150px"
                />
              </div>
              <button
                type="button"
                onClick={clearImage}
                className="mt-2 text-xs text-zinc-400 transition duration-200 hover:text-white md:text-sm"
              >
                Remove Picture
              </button>
            </div>
          ) : (
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <UploadProfilePicture
                  setImage={(url) => form.setValue("imageUrl", url)}
                  field={field}
                  disabled={isPending}
                  error={!!form.formState.errors.imageUrl?.message}
                />
              )}
            />
          )}

          <div className="mt-2 flex w-full items-start gap-2 max-md:flex-col">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-zinc-100">Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Full Name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-100">Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      disabled={isPending}
                      placeholder="username@university.ca"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex w-full items-start gap-2 max-md:flex-col">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-100">Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      disabled={isPending}
                      placeholder="******"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="university"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-100">University</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger
                        className="justify-normal gap-1"
                        disabled={isPending}
                      >
                        {field.value && (
                          <span className="text-zinc-400">identifier: </span>
                        )}
                        {field.value}
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {universities.map((uni) => (
                        <SelectItem key={uni.code} value={uni.code}>
                          {uni.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button className="w-full" disabled={isPending}>
            Register
          </Button>
        </form>
      </Form>

      <hr className="mb-4 mt-6 border-zinc-700" />

      <div className="mb-4 flex items-center">
        <span className="mr-1 text-zinc-500 max-md:text-sm">
          Already have an account?
        </span>
        <Link
          href="/auth/login"
          className="text-zinc-200 underline-offset-4 hover:underline"
        >
          Sign In
        </Link>
      </div>

      <hr className="mb-4 border-zinc-700" />
      <AuthFooter />
    </CardWrapper>
  );
};

export default RegisterForm;
