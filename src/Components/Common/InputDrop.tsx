import { useState, useRef, ChangeEvent, useEffect } from "react";
import { Input } from "@material-tailwind/react";

//Custom Hook
import { useOutsideClick } from "@/Helpers/hook";

//Interface
interface Props {
    options: string[];
    onChange: (e: string) => void;
    value: string;
}

const InputDrop = ({ options, onChange, value: mainValue }: Props) => {
    //Initialize Hook
    const ref = useRef<HTMLDivElement | null>(null);

    //Separating number and unit
    const regex = /(\d+) (\w+)/;
    const match = mainValue?.match(regex);

    //State
    const [value, setValue] = useState<string>(match ? match[1] : "");
    const [open, setOpen] = useState<boolean>();
    const [selected, setSelected] = useState<string>(match ? match[2] : "year");

    //Handler
    const onSelect = (item: string) => {
        setSelected(item)
        setOpen(false)
    }

    //Use Click outside
    useOutsideClick(ref, () => {
        setOpen(false)
    });

    useEffect(() => {
        if (value) {
            onChange(`${value} ${selected}`)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, selected])
    return (
        <div className="relative">
            <Input
                label="Warranty"
                crossOrigin="anonymous"
                color="red"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onInput={(e: ChangeEvent<HTMLInputElement>) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, '')
                }}
            />
            <div className="absolute right-0 top-0 select-none cursor-pointer" ref={ref}>
                <div className="flex items-center justify-center gap-1.5 select-none h-10 px-2" onClick={() => setOpen(!open)}>
                    <div className="flex gap-1.5">
                        <span className="capitalize text-sm">{selected}</span>
                        <div className={`w-5 h-5 text-blue-gray-400 transition-all  mt-px ${open ? "rotate-180" : "rotate-0"}`}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg></div>
                    </div>
                </div>
                <ul className={`absolute right-0 min-w-[100px] w-full top-full bg-white border border-solid border-blue-gray-50 rounded-md shadow-lg shadow-blue-gray-500/10 text-sm font-normal text-blue-gray-500 focus:outline-0 z-10 transition-all duration-200 ease-[cubic-bezier(0.4, 0, 0.2, 1)] p-2  ${open ? `opacity-100 origin-top scale-100 visible` : `opacity-0 origin-top invisible scale-95`}`}>
                    {options.map((item, i) => (
                        <li key={i}
                            onClick={() => onSelect(item)}
                            className={`py-1.5 my-px px-2 capitalize rounded leading-tight cursor-pointer select-none hover:bg-blue-gray-50 focus:bg-blue-gray-50 hover:bg-opacity-80 focus:bg-opacity-80 hover:text-blue-gray-900 focus:text-blue-gray-900 outline-0 ${selected === item ? "bg-blue-gray-50" : ""}`}
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default InputDrop;