import { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import slugify from "slugify";

//Urql
import { CategoryData } from "@/Urql/Types/Category/category.types";

//Interface
interface Props {
    data: CategoryData;
}

const SubCard = ({ data }: Props) => {
    return (
        <div>
            <ul className="grid grid-cols-4 gap-6">
                {data.category?.map((category, ci) => (
                    <Fragment key={ci}>
                        <li>
                            <Link href={`/category/${slugify(data.name, { lower: true })}-${data.id}?category=${slugify(category.name, { lower: true })}-${category.id}`} className="p-5 border border-solid border-gray-300 rounded-md block text-center">
                                <span className="flex-[0_0_10%]">
                                    {category.image ? <Image src={process.env.NEXT_PUBLIC_IMAGE_URL + category.image} alt={category.name} width={100} height={100} className="w-[80%] mx-auto rounded-md" /> : <Image src="/placeholder-300.png" alt={category.name} width={100} height={100} className="w-[80%] mx-auto rounded-md" />}
                                </span>
                                <span className="text-[15px] font-medium mt-2.5 block">{category.name}</span>
                            </Link>
                        </li>
                        {category?.sub_category.map((sub, si) => (
                            <li key={si}>
                                <Link href={`/category/${slugify(data.name, { lower: true })}-${data.id}?category=${slugify(category.name, { lower: true })}-${category.id}&subcategory=${slugify(sub.name, { lower: true })}-${sub.id}`} className="p-5 border border-solid border-gray-300 rounded-md block text-center">
                                    <span className="flex-[0_0_10%]">
                                        {sub.image ? <Image src={process.env.NEXT_PUBLIC_IMAGE_URL + sub.image} alt={sub.name} width={100} height={100} className="w-[80%] mx-auto rounded-md" /> : <Image src="/placeholder-300.png" alt={sub.name} width={100} height={100} className="w-[80%] mx-auto rounded-md" />}
                                    </span>
                                    <span className="text-[15px] mt-2.5 block font-medium">{sub.name}</span>
                                </Link>
                            </li>
                        ))}
                    </Fragment>
                ))}
            </ul>
            {data.category.length === 0 &&
                <p className="text-center mt-2 text-main font-semibold">No Category Found</p>
            }
        </div>
    );
};

export default SubCard;