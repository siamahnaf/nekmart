import { Dialog, DialogBody } from "@material-tailwind/react";
import moment from "moment";
import Image from "next/image";

//Data
import { PreorderData } from "@/Urql/Types/Preorder/preorder.types";

//Interface
interface Props {
    open: boolean;
    onClose: () => void;
    data: PreorderData;
}

const Details = ({ open, onClose, data }: Props) => {
    return (
        <Dialog
            open={open}
            handler={onClose}
            animate={{
                mount: { y: 0 },
                unmount: { y: -15 },
            }}
            size="lg"
        >
            <DialogBody className="text-black">
                <h5 className="text-lg font-semibold">Product Request</h5>
                <p className="text-sm">{moment(data.created_at).format("DD MMM YYYY")}</p>
                <hr className="mt-2 mb-2" />
                <div>
                    <div className="flex gap-2 flex-wrap">
                        {data.productImage?.map((item, i) => (
                            <div key={i}>
                                <Image src={item} alt="Item" width={300} height={300} className="w-[200px] rounded-md" />
                            </div>
                        ))}
                    </div>
                    <p className="font-medium"><span className="opacity-60">First Name:</span> <span>{data.firstName}</span></p>
                    <p className="font-medium"><span className="opacity-60">Last Name:</span> <span>{data.lastName}</span></p>
                    <p className="font-medium"><span className="opacity-60">Phone:</span> <span>{data.phone}</span></p>
                    <p className="font-medium"><span className="opacity-60">Email:</span> <span>{data.email}</span></p>
                    <p className="font-medium"><span className="opacity-60">Phone:</span> <span>{data.productUrl.join(", ")}</span></p>
                    <div className="text-right mt-5">
                        <button className="py-1 px-3 rounded-md text-white bg-main" onClick={onClose}>Okay</button>
                    </div>
                </div>
            </DialogBody>
        </Dialog>
    );
};

export default Details;