export const s3Config = {
    bucketName: process.env.NEXT_PUBLIC_BUCKET_NAME as string,
    region: process.env.NEXT_PUBLIC_REGION as string,
    accessKeyId: process.env.NEXT_PUBLIC_ACCESS_ID as string,
    secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ID as string
}