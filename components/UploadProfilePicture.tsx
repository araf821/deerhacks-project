"use client";

import { useDropzone } from "react-dropzone";
import { getS3Url, uploadToS3 } from "@/lib/s3";
import { toast } from "sonner";
import { useTransition } from "react";
import { Loader2, Upload } from "lucide-react";
import { FormItem } from "./ui/form";
import { cn } from "@/lib/utils";

interface UploadProfilePictureProps {
  field: any;
  error: boolean;
  setImage: (fileUrl: string) => void;
  disabled: boolean;
}

const UploadProfilePicture = ({
  field,
  error,
  setImage,
  disabled,
}: UploadProfilePictureProps) => {
  const [isPending, startTransition] = useTransition();

  const { getInputProps, getRootProps } = useDropzone({
    accept: { "image/png": [], "image/jpeg": [], "image/webp": [] },
    maxFiles: 1,
    onDrop: async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      // if file > 2mb
      if (file.size > 2 * 1024 * 1024) {
        return toast.error("File size is too big.");
      }

      try {
        startTransition(async () => {
          const data = await uploadToS3(file);
          const fileUrl = await getS3Url(data.file_key);
          setImage(fileUrl);
        });

        toast.success("Uploaded file successfully!");
      } catch (error) {
        toast.error("Failed to upload the image.");
        console.error(error);
      }
    },
  });

  return (
    <FormItem
      {...getRootProps({
        className:
          "p-4 my-4 space-y-0 border-2 border-dashed aspect-square w-40 mx-auto text-center gap-2 flex flex-col items-center justify-center rounded-full bg-transparent hover:brightness-75 transition duration-300 cursor-pointer",
      })}
    >
      {isPending ? (
        <Loader2 className="h-5 w-5 animate-spin text-white" />
      ) : (
        <>
          <input {...field} disabled={disabled} {...getInputProps()} />
          <Upload
            className={cn("text-muted", {
              "text-destructive": error,
            })}
          />
          <p
            className={cn("text-sm text-muted max-md:text-xs", {
              "text-destructive": error,
            })}
          >
            Profile Picture <span className="text-xs">(Max 2MB)</span>
          </p>
        </>
      )}
    </FormItem>
  );
};

export default UploadProfilePicture;
