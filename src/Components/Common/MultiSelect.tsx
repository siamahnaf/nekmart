import { useState, useRef, KeyboardEvent, useEffect, ReactNode } from "react";
import { Icon } from "@iconify/react";

//Custom hook
import { useOutsideClick } from "@/Helpers/hook";

//Interface
interface Props {
    value: { label: string, value: string }[];
    onChange: (e: { label: string, value: string }[]) => void;
    search?: ReactNode;
    options: { label: string, value: string }[] | undefined;
    emptyMessage?: string;
    error?: boolean;
    label: string;
    fetching?: boolean;
}

const MultiSelect = ({ value = [], onChange, search, options = [], emptyMessage = "No Options", error = false, label, fetching = false }: Props) => {
    //Initialize Hook
    const ref = useRef<HTMLDivElement | null>(null);
    const listRef = useRef<HTMLDivElement | null>(null);

    //State
    const [open, setOpen] = useState<boolean>(false);
    const [dropdownPosition, setDropdownPosition] = useState<"top" | "bottom">("bottom");
    const [highlightedIndex, setHighlightedIndex] = useState(-1);

    //Use Click outside
    useOutsideClick(ref, () => {
        setOpen(false)
    });

    //Scroll Into view
    const scrollOptionIntoView = (direction: number) => {
        if (listRef.current && highlightedIndex >= 0) {
            const optionElement = listRef.current.children[highlightedIndex] as HTMLElement;
            if (optionElement) {
                const { offsetTop, offsetHeight } = optionElement;
                const { scrollTop, clientHeight } = listRef.current;
                const optionTop = (offsetTop - offsetHeight) - 5;
                const optionBottom = optionTop + listRef.current.offsetTop + offsetHeight + 41
                if (optionTop < scrollTop && direction === -1) {
                    listRef.current.scrollTop = optionTop;
                } else if (optionBottom > scrollTop + clientHeight && direction === 1) {
                    listRef.current.scrollTop = optionBottom - clientHeight;
                }
            }
        }
    };

    //Keyboard Navigations
    const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
        if (event.key === "ArrowUp") {
            event.preventDefault();
            setHighlightedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
            scrollOptionIntoView(-1);
        } else if (event.key === "ArrowDown") {
            event.preventDefault();
            setHighlightedIndex((prevIndex) =>
                prevIndex < options.length - 1 ? prevIndex + 1 : prevIndex
            );
            scrollOptionIntoView(1);
        } else if (
            event.key === "Enter" &&
            highlightedIndex >= 0 &&
            highlightedIndex < options.length
        ) {
            event.preventDefault();
            onChange([...value, options[highlightedIndex]])
            setHighlightedIndex(-1);
        }
    };

    const updateDropDownPosition = () => {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            const spaceBelow = window.innerHeight - rect.bottom;
            const spaceAbove = rect.top;

            if (spaceBelow >= rect.height) {
                setDropdownPosition("bottom");
            } else if (spaceAbove >= rect.height) {
                setDropdownPosition("top")
            } else {
                setDropdownPosition("bottom")
            }
        }
    };

    //Handler
    const handleItemClick = (item: { label: string, value: string }) => {
        onChange([...value, item])
    };

    //Handler Remove
    const handleRemove = (item: string) => {
        const newValue = value?.filter(v => v.value !== item);
        onChange(newValue);
    }

    useEffect(() => {
        const updatePosition = () => {
            if (open) {
                updateDropDownPosition();
            }
        };
        updatePosition();
        window.addEventListener('scroll', updatePosition);
        return () => {
            window.removeEventListener('scroll', updatePosition);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, ref.current]);

    return (
        <div ref={ref} className={`relative min-w-[200px] w-full ${(!value || value?.length === 0) && "h-10"}`}>
            <button type="button" className={`cursor-pointer outline outline-0 focus:outline-0 px-3 py-2 pr-8 text-sm font-normal text-blue-gray-700 rounded-[7px] w-full transition-all h-full text-left flex gap-1.5 flex-wrap items-center box-border ${open ? "border border-red-500" : "border border-gray-200"} ${error ? "border-red-500" : ""}`} onClick={() => setOpen(true)} onKeyDown={handleKeyDown}>
                {value?.map((item, i) => (
                    <div className="text-[12px] text-black bg-gray-200 rounded-sm overflow-hidden flex gap-1" key={i}>
                        <span className="py-px pl-1.5">{item.label}</span>
                        <div className="cursor-pointer select-none hover:bg-main hover:bg-opacity-40 flex justify-center items-center px-1" onClick={() => handleRemove(item.value)}>
                            <Icon className="text-[11px]" icon="ep:close" />
                        </div>
                    </div>
                ))}
                <div className={`grid place-items-center absolute top-2/4 right-2 pt-px w-5 h-5 text-blue-gray-400 -translate-y-2/4 transition-all  mt-px ${open ? "rotate-180" : "rotate-0"}`}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg></div>
            </button>
            <label className={`absolute left-3 pointer-events-none text-blue-gray-400 leading-tight px-0.5 transition-all ${(open || value?.length > 0) ? "text-[11px] -top-[7px] bg-white" : "text-sm top-1/2 -translate-y-1/2 "} ${open && "text-red-500"} ${error && "text-red-500"}`}>{label}</label>
            <div className={`absolute ${dropdownPosition === "top" ? "bottom-full mb-1" : "top-full mt-1"} w-full max-h-96 bg-white p-3 border border-solid border-blue-gray-50 rounded-md shadow-lg shadow-blue-gray-500/10 text-sm font-normal text-blue-gray-500 overflow-auto focus:outline-0 z-10 transition-all duration-200 ease-[cubic-bezier(0.4, 0, 0.2, 1)] ${open ? `opacity-100 ${dropdownPosition === "top" ? "origin-top" : "origin-bottom"} scale-100 visible` : `opacity-0 ${dropdownPosition === "top" ? "origin-top" : "origin-bottom"} invisible scale-95`}`} ref={listRef}>
                {search}
                {fetching &&
                    <div className="w-4 h-4 border-b-2 border-main rounded-full animate-spin"></div>
                }
                <ul>
                    {options.map((item, i) => (
                        <li className={`pt-[9px] pb-2 capitalize px-3 rounded-md leading-tight cursor-pointer select-none hover:bg-blue-gray-50 focus:bg-blue-gray-50 hover:bg-opacity-80 focus:bg-opacity-80 hover:text-blue-gray-900 focus:text-blue-gray-900 outline-0 ${highlightedIndex === i ? "bg-blue-gray-50 text-blue-gray-900" : ""}`} onClick={() => handleItemClick(item)} key={i}>{item.label}</li>
                    ))}
                    {options.length === 0 &&
                        <li className="opacity-50 pointer-events-none cursor-not-allowed leading-tight pt-[9px] pb-2 px-3">{emptyMessage}</li>
                    }
                </ul>
            </div>
        </div>
    );
};

export default MultiSelect;