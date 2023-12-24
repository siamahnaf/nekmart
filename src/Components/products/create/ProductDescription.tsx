import { useContext } from "react";
import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css";
const SunEditor = dynamic(() => import("suneditor-react"), {
    ssr: false,
});
import ReactS3Client from "react-s3-typescript";
import { Controller } from "react-hook-form";

//S3 Config
import { s3Config } from "@/Helpers/s3.config";

//Context
import { productContext } from "@/Context/product.context";

const ProductDescription = () => {
    //Context
    const { control } = useContext(productContext);


    //Handler
    const handleImageUploadBefore = (files: File[], info: Object, uploadHandler: Function) => {
        const uploadPromises = files.map(async (file) => {
            const s3 = new ReactS3Client({ ...s3Config, dirName: "Products" });
            return s3.uploadFile(file);
        });
        Promise.all(uploadPromises)
            .then((responses) => {
                const results = responses.map((res, index) => ({
                    url: process.env.NEXT_PUBLIC_IMAGE_URL + res.key,
                    name: files[index].name,
                    size: files[index].size,
                }));
                const response = {
                    result: results,
                };
                console.log(response)
                uploadHandler(response);
            })
            .catch((error) => {
                uploadHandler(error.toString)
            });
        return undefined;
    }

    return (
        <div className="border border-solid border-gray-200 rounded-md mb-10">
            <h4 className="border-b border-solid border-gray-200 px-3 py-3 font-medium">Product Description</h4>
            <div className="p-5">
                <div className="grid grid-cols-4 gap-2 items-start mb-7">
                    <label htmlFor="description" className="col-span-1 w-max text-sm">Description</label>
                    <div className="col-span-3">
                        <Controller
                            control={control}
                            name="description"
                            render={({ field: { onChange, value } }) => (
                                <SunEditor
                                    placeholder="Start type your description..."
                                    autoFocus={false}
                                    setDefaultStyle="font-size: 18px;"
                                    setAllPlugins
                                    setOptions={{
                                        buttonList: [["redo", "undo"], ["font", "fontSize", "formatBlock"], ["paragraphStyle", "blockquote"], ["bold", "underline", "italic", "strike", "subscript", "superscript"], ["fontColor", "hiliteColor", "textStyle"], ["removeFormat"], ["outdent", "indent"], ["align", "horizontalRule", "list", "lineHeight"], ["table", "image", "codeView"], ["fullScreen", "preview"]]
                                    }}
                                    height="180px"
                                    onImageUploadBefore={handleImageUploadBefore}
                                    onChange={onChange}
                                    name="description"
                                    setContents={value}
                                />
                            )}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDescription;