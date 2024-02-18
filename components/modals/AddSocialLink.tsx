"use client";

import { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { cn } from "@/lib/utils";
import { port } from "@/lib/font";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { z } from "zod";
import { AddSocialSchema } from "@/actions/add-social-link/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { addSocialLink } from "@/actions/add-social-link";
import { toast } from "sonner";

interface AddSocialLinkProps {
  children: React.ReactNode;
}

const AddSocialLink = ({ children }: AddSocialLinkProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof AddSocialSchema>>({
    resolver: zodResolver(AddSocialSchema),
    defaultValues: {
      label: "",
      link: "",
    },
  });

  const onSubmit = (values: z.infer<typeof AddSocialSchema>) => {
    startTransition(async () => {
      await addSocialLink(values).then((data) => {
        if (data.error) toast.error(data.error);
        if (data.success) toast.success(data.success);
      });
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader className={cn("", port.className)}>
          <DialogTitle className="text-2xl md:text-3xl">
            Add a social link
          </DialogTitle>
          <DialogDescription className="text-lg md:text-xl">
            Help others reach you!
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="label"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="GitHub..."
                      className="text-zinc-900"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="link"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="https://github.com/username"
                      className="text-zinc-900"
                      type="url"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <hr className="border-t-4 border-zinc-800" />
            <Button
              disabled={isPending}
              className="w-full bg-[#FF9900] text-lg font-semibold text-black hover:bg-amber-600"
            >
              ADD LINK
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddSocialLink;
