import { useState, useRef, KeyboardEvent, useEffect } from "react";
import { Icon } from "@iconify/react";

//Custom hook
import { useOutsideClick } from "@/Helpers/hook";

//Interface
interface Props {
    error?: boolean;
    label: string;
    value: string[];
    onChange: (e: string[]) => void;
    separator?: string;
}

const TagInput = ({ error = false, value = [], label, onChange, separator = "," }: Props) => {
    //Initialize Hook
    const ref = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    //State
    const [open, setOpen] = useState<boolean>(false);
    const [tags, setTags] = useState<string[]>(value || []);
    const [input, setInput] = useState<string>();

    //On Key Down
    const handleOnKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
        e.stopPropagation();
        const text = e.currentTarget.value.trim();
        if (e.key === "Enter") {
            e.preventDefault()
        }
        if (text && (e.key === "Enter" || e.key === "," || e.key === ";")) {
            e.preventDefault()
            setTags([...tags, text]);
            setInput("")
        } else if (!text && tags.length && e.key === "Backspace") {
            setTags([...tags.slice(0, -1)]);
        }
    };

    //Handle on Paste
    const handleOnPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const clipboardData = e.clipboardData.getData('text');
        const tagsArray = clipboardData.split(',');
        setTags([...tags, ...tagsArray]);
    };

    //Handle Click
    const handleDivClick = () => {
        setOpen(true)
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    //Handler Remove
    const handleRemove = (i: number) => {
        const updatedTags = tags.filter((_, index) => index !== i);
        setTags(updatedTags)
    }

    //Use Click outside
    useOutsideClick(ref, () => {
        setOpen(false)
    });

    //Lifecycle
    useEffect(() => {
        onChange(tags);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tags])

    return (
        <div ref={ref} className="relative min-h-10 min-w-[200px] w-full">
            <button type="button" className={`outline cursor-text outline-0 focus:outline-0 text-sm font-normal text-blue-gray-700 rounded-[7px] w-full transition-all h-full text-left box-border flex gap-1.5 items-center flex-wrap py-2 px-2.5 ${open ? "border border-red-500" : "border border-gray-200"} ${error ? "border-red-500" : ""}`} onClick={handleDivClick}>
                {value?.map((item, i) => (
                    <div className="text-sm text-black bg-main bg-opacity-20 py-px px-1 rounded border border-solid border-main flex gap-1 items-center" key={i}>
                        <span>{item}</span>
                        <div className="cursor-pointer select-none" onClick={() => handleRemove(i)}>
                            <Icon className="text-[11px]" icon="ep:close" />
                        </div>
                    </div>
                ))}
                <input
                    className="focus:outline-none bg-transparent w-[80px]"
                    onKeyDown={handleOnKeyUp}
                    ref={inputRef}
                    value={input || ""}
                    onChange={(e) => setInput(e.target.value)}
                    onPaste={handleOnPaste}
                />
            </button>
            <label className={`absolute left-3 pointer-events-none text-blue-gray-400 leading-tight px-0.5 transition-all ${(open || value?.length > 0 || input) ? "text-[11px] -top-[7px] bg-white" : "text-sm top-1/2 -translate-y-1/2 "} ${open && "text-red-500"} ${error && "text-red-500"}`}>{label}</label>
        </div>
    );
};

export default TagInput;