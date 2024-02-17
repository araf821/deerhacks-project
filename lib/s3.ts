import { S3 } from "@aws-sdk/client-s3";
import { nanoid } from "nanoid";

export async function uploadToS3(
  file: File,
): Promise<{ file_key: string; file_name: string }> {
  return new Promise((resolve, reject) => {
    const s3 = new S3({
      region: "us-east-2",
      credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID!,
        secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY!,
      },
    });

    const file_key = `uploads/${nanoid()}-${file.name.replace(/\s+/g, "-")}`;

    const params = {
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
      Key: file_key,
      Body: file,
    };

    s3.putObject(params, (err: any, data: any) => {
      if (err) {
        reject(err);
      } else {
        resolve({
          file_key,
          file_name: file.name,
        });
      }
    });
  });
}

export async function getS3Url(file_key: string) {
  return `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.us-east-2.amazonaws.com/${file_key}`;
}
