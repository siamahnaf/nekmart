import { useEffect, useState } from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import Image from "next/image";
import { Icon } from "@iconify/react";
import ReactS3Client from "react-s3-typescript";

//S3 Config
import { s3Config } from "@/Helpers/s3.config";

//Interface
interface Props {
    label: string;
    onChange: (e: string[]) => void;
    size?: number;
    folderName?: string;
    value?: string[] | null;
    className?: string;
    error?: boolean;
    displayLabel?: boolean;
}

const ImagesUploader = ({ label, size, folderName, value, onChange, className, error = false, displayLabel = true }: Props) => {
    //State
    const [image, setImage] = useState<ImageListType>([]);
    const [progress, setProgress] = useState<number>(0);

    //OnImageChange
    const onImageChange = async (imageList: ImageListType) => {
        await setImage(imageList);
        const urls: string[] = [];
        for (const image of imageList) {
            await setProgress(0);
            try {
                const s3 = new ReactS3Client({ ...s3Config, dirName: folderName || "Nekmart" });
                const res = await s3.uploadFile(image.file as File);
                urls.push(res.key)
            } finally {
                setProgress(100)
            }
        }
        onChange(urls)
    }

    useEffect(() => {
        if (!value) {
            setImage([])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])

    return (
        <div className={`grid grid-cols-4 gap-2 items-start ${className}`}>
            {displayLabel &&
                <div className="col-span-1 w-max">
                    <label htmlFor="description">{label}</label>
                </div>
            }
            <div className={displayLabel ? "col-span-3" : "col-span-4"}>
                <ImageUploading
                    value={image}
                    onChange={onImageChange}
                    multiple={true}
                    maxNumber={size || 1}
                    maxFileSize={5000000}
                    dataURLKey="nek-url"
                >
                    {({
                        imageList,
                        onImageUpload,
                        onImageRemove,
                        isDragging,
                        dragProps,
                        errors
                    }) => (
                        <div>
                            <button
                                onClick={onImageUpload}
                                {...dragProps}
                                className={`border border-solid w-full rounded-md flex gap-4 items-center justify-start overflow-hidden ${error ? "border-red-500" : "border-gray-200"}`}
                                type="button"
                            >
                                <p className={` px-3 py-2 opacity-80 ${error ? "bg-red-50 text-red-500" : "bg-white_hover"}`}>Browser</p>
                                {isDragging &&
                                    <p className={"text-sm " + isDragging ? "bg-main" : ""}>
                                        Drop Here
                                    </p>
                                }
                                {!isDragging &&
                                    <p className={`text-sm ${error && "text-red-500"}`}>
                                        {imageList.length > 0 ? `${imageList.length} File selected` : "Choose File"}
                                    </p>
                                }
                            </button>
                            <div className="flex gap-2 mt-2">
                                {imageList.map((image, i) => (
                                    <div key={i} className="border border-solid border-gray-200 rounded relative w-[150px]">
                                        <button onClick={() => onImageRemove(i)} className="absolute -top-2 -right-2 w-[25px] h-[25px] bg-white_hover text-main rounded-full flex justify-center items-center" type="button">
                                            <Icon icon="clarity:window-close-line" />
                                        </button>
                                        <Image src={image["nek-url"]} alt="Image" width={300} height={300} className="w-[150px] h-[60px] object-cover object-top rounded-t" />
                                        <div className="py-2 px-3">
                                            <p className="flex text-sm">
                                                <span className="truncate">
                                                    {image?.file?.name.split(".")[0]}
                                                </span>
                                                <span>
                                                    .{image?.file?.name.split(".")[1]}
                                                </span>
                                            </p>
                                            <p className="text-xs opacity-70">
                                                {(image?.file?.size as number / (1024 * 1024)).toFixed(2)}MB
                                            </p>
                                        </div>
                                        <div>
                                            <div className="w-full relative h-[2px] bg-main bg-opacity-40">
                                                <div className="absolute bg-green-600 left-0 top-0 bottom-0 w-0 transition-[width] ease-out duration-700" style={{ width: `${progress}%` }} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {value && value?.length > 0 && imageList.length === 0 &&
                                    value.map((item, i) => (
                                        <div className="border border-solid border-gray-200 rounded relative w-[100px]" key={i}>
                                            <Image src={process.env.NEXT_PUBLIC_IMAGE_URL + item} alt="Image" width={300} height={300} className="w-[100px] object-cover object-top rounded" key={i} priority />
                                        </div>
                                    ))
                                }
                            </div>
                            {errors &&
                                <ul className="mt-3">
                                    {errors.maxFileSize &&
                                        <li className="flex text-sm text-main font-medium items-center gap-1"><div className="w-[4px] h-[4px] rounded-full bg-main" /> <p>File size exceeds 5MB limit.</p></li>
                                    }
                                    {errors.maxNumber &&
                                        <li className="flex text-sm text-main font-medium items-center gap-1"><div className="w-[4px] h-[4px] rounded-full bg-main" /> <p>Select {size} image at a time.</p></li>
                                    }
                                    {errors.acceptType &&
                                        <li className="flex text-sm text-main font-medium items-center gap-1"><div className="w-[4px] h-[4px] rounded-full bg-main" /> <p>Only image files are allowed.</p></li>
                                    }
                                </ul>
                            }
                        </div>
                    )}
                </ImageUploading>
            </div>
        </div>
    );
};

export default ImagesUploader;