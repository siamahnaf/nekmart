import Link from "next/link";
import { Icon } from "@iconify/react";

//Interface
interface Props {
    title: string;
    name: string;
    url: string;
}

const AddItem = ({ title, name, url }: Props) => {
    return (
        <div>
            <h6 className="text-lg font-bold mb-3">{title}</h6>
            <Link href={url} className="bg-white block w-[280px] text-center mx-auto border border-solid border-gray-200 py-8 rounded-md group hover:shadow-3xl transition-all">
                <div className="w-[60px] h-[60px] mx-auto bg-secondary flex items-center justify-center rounded-full">
                    <Icon className="text-4xl text-white" icon="ant-design:plus-outlined" />
                </div>
                <p className="text-base opacity-90 mt-3 group-hover:text-main">{name}</p>
            </Link>
        </div>
    );
};

export default AddItem;