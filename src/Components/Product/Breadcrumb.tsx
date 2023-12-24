import { Breadcrumbs } from "@material-tailwind/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { EmailShareButton, TwitterShareButton, FacebookShareButton, LinkedinShareButton, WhatsappShareButton } from "react-share";
import { Icon } from "@iconify/react";

//Urql
import { useQuery } from "urql";
import { GET_SINGLE_PRODUCT } from "@/Urql/Query/Products/product.query";
import { GetSingleProduct } from "@/Urql/Types/Products/product.types";

const Breadcrumb = () => {
    //Initializing Hooks
    const router = useRouter();

    //ID
    const parts = router.query && router.query.id?.toString().split("-") as string[]
    const id = parts[parts.length - 1];

    //Urql
    const [{ data }] = useQuery<GetSingleProduct>({ query: GET_SINGLE_PRODUCT, variables: { getProductId: id } });

    //Not Data return
    if (!data) return null;

    return (
        <div className="flex gap-5 items-center mb-5 border-b border-solid border-gray-300 py-3">
            <Breadcrumbs className="bg-white">
                <Link href={`/category/${data.getProduct.category?.id}`} className="text-main text-base font-light">
                    {data.getProduct.main_category?.name}
                </Link>
                <p className="text-black text-base font-light">{data.getProduct.name}</p>
            </Breadcrumbs>
            <div className="flex-1">
                <ul className="flex justify-end items-center gap-2">
                    <li className="mb-2">
                        Share:
                    </li>
                    <li>
                        <EmailShareButton url={"https://nekmart.com/" + router.asPath} >
                            <Icon className="text-main text-lg" icon="carbon:email" />
                        </EmailShareButton>
                    </li>
                    <li>
                        <TwitterShareButton url={"https://nekmart.com/" + router.asPath} >
                            <Icon className="text-main text-lg" icon="ant-design:twitter-outlined" />
                        </TwitterShareButton>
                    </li>
                    <li>
                        <FacebookShareButton url={"https://nekmart.com/" + router.asPath} >
                            <Icon className="text-main text-lg" icon="dashicons:facebook-alt" />
                        </FacebookShareButton>
                    </li>
                    <li>
                        <LinkedinShareButton url={"https://nekmart.com/" + router.asPath} >
                            <Icon className="text-main text-lg" icon="akar-icons:linkedin-fill" />
                        </LinkedinShareButton>
                    </li>
                    <li>
                        <WhatsappShareButton url={"https://nekmart.com/" + router.asPath} >
                            <Icon className="text-main text-lg" icon="bxl:whatsapp" />
                        </WhatsappShareButton>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Breadcrumb;