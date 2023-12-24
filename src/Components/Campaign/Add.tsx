import Link from "next/link";

const Add = () => {
    return (
        <div>
            <h3 className="text-lg font-bold mb-4">Campaign</h3>
            <Link href="campaign/add-product-to-campaign" className="bg-main py-2 px-5 rounded-md block w-max mx-auto text-white">
                Add product to running campaign
            </Link>
        </div>
    );
};

export default Add;