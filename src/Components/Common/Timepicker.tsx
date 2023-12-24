import { useState, useRef, useEffect } from "react";
import { Input } from "@material-tailwind/react";
import { Icon } from "@iconify/react";
import moment from "moment";

//Use click outside
import { useOutsideClick } from "@/Helpers/hook";

//Interface
interface Props {
    onChange: (time: string) => void;
    value: string;
    label: string;
    error?: boolean;
}

const Timepicker = ({ onChange, value, label, error = false }: Props) => {
    const [open, setOpen] = useState<boolean>(false);
    const [hour, setHour] = useState<string>("");
    const [minute, setMinute] = useState<string>("");
    const [period, setPeriod] = useState<string>("");

    //Initialize Hook
    const ref = useRef(null);
    const hourRef = useRef<HTMLUListElement>(null);
    const minuteRef = useRef<HTMLUListElement>(null);
    const periodRef = useRef<HTMLUListElement>(null);

    //Use Click outside
    useOutsideClick(ref, () => {
        setOpen(false)
    });

    //Handler
    const onHourHandler = (item: number) => {
        setHour(item.toString());
        if (hourRef.current) {
            const itemNode = hourRef.current.querySelector(`[data-index="${item - 1}"]`) as HTMLElement;
            if (itemNode) {
                const container = hourRef.current;
                const scrollOffset = itemNode.offsetTop - container.offsetTop;
                container.scrollTo({
                    top: scrollOffset,
                    behavior: 'smooth',
                });
            }
        }
    };

    const onMinuteHandler = (item: number) => {
        setMinute(item.toString())
        if (minuteRef.current) {
            const itemNode = minuteRef.current.querySelector(`[data-index="${item}"]`) as HTMLElement;
            if (itemNode) {
                const container = minuteRef.current;
                const scrollOffset = itemNode.offsetTop - container.offsetTop;
                container.scrollTo({
                    top: scrollOffset,
                    behavior: 'smooth',
                });
            }
        }
    }
    const onPeriodHandler = (item: string, i: number) => {
        setPeriod(item)
        if (periodRef.current) {
            const itemNode = periodRef.current.querySelector(`[data-index="${i}"]`) as HTMLElement;
            if (itemNode) {
                const container = periodRef.current;
                const scrollOffset = itemNode.offsetTop - container.offsetTop;
                container.scrollTo({
                    top: scrollOffset,
                    behavior: 'smooth',
                });
            }
        }
    }

    //On Confirm
    const onConfirm = () => {
        const time = `${parseInt(hour) < 9 ? `0${hour}` : hour}:${parseInt(minute) < 9 ? `0${minute}` : minute} ${period}`;
        onChange(time)
        setOpen(false)
    }

    const onNowHandler = async () => {
        const cHour = moment().format("h")
        const cMinute = moment().format("m")
        const cPeriod = moment().format("A")
        setHour(cHour)
        setMinute(cMinute)
        setPeriod(cPeriod)
        if (hourRef.current) {
            const itemNode = hourRef.current.querySelector(`[data-index="${parseInt(cHour) - 1}"]`) as HTMLElement;
            if (itemNode) {
                const container = hourRef.current;
                const scrollOffset = itemNode.offsetTop - container.offsetTop;
                container.scrollTo({
                    top: scrollOffset,
                    behavior: "smooth",
                });
            }
        }
        if (minuteRef.current) {
            const itemNode = minuteRef.current.querySelector(`[data-index="${cMinute}"]`) as HTMLElement;
            if (itemNode) {
                const container = minuteRef.current;
                const scrollOffset = itemNode.offsetTop - container.offsetTop;
                container.scrollTo({
                    top: scrollOffset,
                    behavior: "smooth",
                });
            }
        }
        if (periodRef.current) {
            const itemNode = periodRef.current.querySelector(`[data-index="${cPeriod !== "Invalid date" ? (cPeriod === "AM" ? 0 : 1) : 0}"]`) as HTMLElement;
            if (itemNode) {
                const container = periodRef.current;
                const scrollOffset = itemNode.offsetTop - container.offsetTop;
                container.scrollTo({
                    top: scrollOffset,
                    behavior: 'smooth',
                });
            }
        }
    };

    const onClear = () => {
        setHour("")
        setMinute("")
        setPeriod("")
        onChange("")
        if (hourRef.current) {
            const itemNode = hourRef.current.querySelector(`[data-index="0"]`) as HTMLElement;
            if (itemNode) {
                const container = hourRef.current;
                const scrollOffset = itemNode.offsetTop - container.offsetTop;
                container.scrollTo({
                    top: scrollOffset,
                    behavior: "instant",
                });
            }
        }
        if (minuteRef.current) {
            const itemNode = minuteRef.current.querySelector(`[data-index="0"]`) as HTMLElement;
            if (itemNode) {
                const container = minuteRef.current;
                const scrollOffset = itemNode.offsetTop - container.offsetTop;
                container.scrollTo({
                    top: scrollOffset,
                    behavior: "instant",
                });
            }
        }
        if (periodRef.current) {
            const itemNode = periodRef.current.querySelector(`[data-index="0"]`) as HTMLElement;
            if (itemNode) {
                const container = periodRef.current;
                const scrollOffset = itemNode.offsetTop - container.offsetTop;
                container.scrollTo({
                    top: scrollOffset,
                    behavior: "instant",
                });
            }
        }
    }

    useEffect(() => {
        const parsedTime = moment(value, "hh:mm A");
        const vHour = parsedTime.format("h");
        const vMinute = parsedTime.format("m");
        const vPeriod = parsedTime.format("A");
        setHour(vHour)
        setMinute(vMinute)
        setPeriod(vPeriod)
        if (hourRef.current) {
            const itemNode = hourRef.current.querySelector(`[data-index="${parseInt(vHour) - 1}"]`) as HTMLElement;
            if (itemNode) {
                const container = hourRef.current;
                const scrollOffset = itemNode.offsetTop - container.offsetTop;
                container.scrollTo({
                    top: scrollOffset,
                    behavior: "instant",
                });
            }
        }
        if (minuteRef.current) {
            const itemNode = minuteRef.current.querySelector(`[data-index="${vMinute}"]`) as HTMLElement;
            if (itemNode) {
                const container = minuteRef.current;
                const scrollOffset = itemNode.offsetTop - container.offsetTop;
                container.scrollTo({
                    top: scrollOffset,
                    behavior: "instant",
                });
            }
        }
        if (periodRef.current) {
            const itemNode = periodRef.current.querySelector(`[data-index="${vPeriod !== "Invalid date" ? (vPeriod === "AM" ? 0 : 1) : 0}"]`) as HTMLElement;
            if (itemNode) {
                const container = periodRef.current;
                const scrollOffset = itemNode.offsetTop - container.offsetTop;
                container.scrollTo({
                    top: scrollOffset,
                    behavior: "instant",
                });
            }
        }
    }, [value])

    return (
        <div ref={ref} className="relative">
            <Input
                crossOrigin="anonymous"
                className="rounded-md"
                label={label}
                color="red"
                containerProps={{
                    className: "!min-w-full"
                }}
                error={error}
                value={value}
                onClick={() => setOpen(!open)}
                icon={<div>
                    {value ?
                        <Icon className="cursor-pointer" icon="mingcute:close-line" onClick={onClear} /> : <Icon icon="ph:clock-fill" />
                    }
                </div>}
            />
            <div className={`absolute bg-white rounded-md mt-2 shadow-3xl top-full left-0  w-full max-w-[300px] transition-all z-50 ${open ? "visible opacity-100 translate-y-0" : "invisible opacity-0 translate-y-1"}`}>
                <div className="grid grid-cols-3 h-[200px] border-b border-solid border-gray-300 px-2">
                    <ul className="overflow-auto h-full scrollbar-none border-r border-solid border-gray-300 pb-[163px] select-none" ref={hourRef}>
                        {Array.from({ length: 12 }, (_, index) => (
                            <li key={index} className={`mb-1 text-center py-1 cursor-pointer rounded-s-md select-none ${index + 1 === parseInt(hour) ? "bg-main text-white" : ""}`} onClick={() => onHourHandler(index + 1)} data-index={index}>{index + 1}</li>
                        ))}
                    </ul>
                    <ul className="overflow-auto h-full scrollbar-none border-r border-solid border-gray-300 pb-[163px] select-none" ref={minuteRef}>
                        {Array.from({ length: 60 }, (_, index) => (
                            <li key={index} className={`mb-1 text-center py-1 cursor-pointer select-none ${index === parseInt(minute) ? "bg-main text-white" : ""}`} data-index={index} onClick={() => onMinuteHandler(index)}>{index}</li>
                        ))}
                    </ul>
                    <ul className="overflow-auto h-full scrollbar-none pb-[163px] select-none" ref={periodRef}>
                        {["AM", "PM"].map((item, i) => (
                            <li key={i} className={`mb-1 text-center py-1 cursor-pointer rounded-e-md select-none ${item === period ? "bg-main text-white" : ""}`} data-index={i} onClick={() => onPeriodHandler(item, i)}>{item}</li>
                        ))}
                    </ul>
                </div>
                <div className="flex gap-1 p-2">
                    <div className="flex-1">
                        <button className="py-1 px-2 text-main font-medium" type="button" onClick={onNowHandler}>Now</button>
                    </div>
                    <div>
                        <button className={`py-1 px-3 text-white rounded uppercase font-medium ${!hour || !minute || !period ? "bg-gray-300" : "bg-main"}`} disabled={!hour || !minute || !period} onClick={onConfirm} type="button">Ok</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Timepicker;