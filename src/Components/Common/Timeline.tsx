import { Fragment } from "react";
import { Icon } from "@iconify/react";

const data = [
    "Pending",
    "Confirmed",
    "Picked up",
    "On the way",
    "Delivered"
]

//Interface
interface Props {
    current: string
}

const Timeline = ({ current }: Props) => {
    return (
        <div className="flex">
            {data.map((item, i) => (
                <Fragment key={i}>
                    <div className="flex-1">
                        <div className="text-center">
                            <div className="border border-solid border-gray-400 w-9 h-9 rounded-full mx-auto flex justify-center items-center relative bg-white">
                                {(data.indexOf(current) === i && current !== "Delivered") ? (
                                    <div className="w-2 h-2 rounded-full bg-main" />
                                ) : (data.indexOf(current) > i || current === "Delivered") ? (
                                    <Icon className="text-2xl text-green-600" icon="teenyicons:tick-small-outline" />
                                ) : (
                                    <div className="w-2 h-2 rounded-full bg-gray-500" />
                                )}
                                {i < data.length - 1 &&
                                    <div className="absolute left-full top-1/2 w-[105px] h-[3px] bg-gray-400 -z-10" />
                                }
                            </div>
                            <p className="text-sm mt-2">{current === "Cancelled" ? "Cancelled" : item}</p>
                        </div>
                    </div>

                </Fragment>
            ))}
        </div>
    );
};

export default Timeline;