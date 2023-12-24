import { useState } from "react";

//Components
import { Notification } from "@/Components/Common/Notifications";

//Urql
import { useMutation } from "urql";
import { APPROVED_PRODUCT } from "@/Urql/Query/Product/product.query";
import { ApproveProductData } from "@/Urql/Types/Product/product.types";

//Interface
interface Props {
    id: string;
    approved: boolean;
}

const Approved = ({ id, approved }: Props) => {
    //State
    const [notification, setNotification] = useState<boolean>(false);

    //Urql
    const [{ data, fetching, error }, mutate] = useMutation<ApproveProductData>(APPROVED_PRODUCT);

    //Handler
    const onHandler = () => {
        mutate({ approvedProductId: id, approved: true }).then(() => {
            setNotification(true)
        }).catch(() => {
            setNotification(true)
        })
    };

    //Handler -- notification
    const onNotification = () => {
        setNotification(false);
    };

    return (
        <div className="text-center mt-6">
            <Notification
                open={notification}
                handleClose={onNotification}
                severity={error?.message ? "error" : "success"}
            >
                {error?.message ?? data?.approvedProduct.message}
            </Notification>
            {!approved &&
                <button className="bg-main uppercase font-semibold py-3 text-white px-5 rounded-md text-sm relative" type="button" disabled={fetching} onClick={onHandler}>
                    <span className={fetching ? "opacity-30" : "opacity-100"}>Approved Product</span>
                    <div className="absolute top-1/2 left-1/2  -translate-y-1/2  -translate-x-1/2">
                        {fetching &&
                            <div className="w-5 h-5 border-b-2 border-white rounded-full animate-spin ml-auto"></div>
                        }
                    </div>
                </button>
            }
        </div>
    );
};

export default Approved;