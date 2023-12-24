import { Icon } from "@iconify/react";


//Interface
interface Props {
    totalPages: number;
    currentPage: number;
    onChange: (page: number) => void;
}

const Pagination = ({ totalPages, currentPage, onChange }: Props) => {
    const paginationItems = [];

    // Display the first page
    paginationItems.push(1);

    // Display ellipsis (...) if currentPage is not close to the beginning
    if (currentPage > 4) {
        paginationItems.push("bi:three-dots");
    }

    // Display pages around the current page
    if (currentPage < 4) {
        for (let i = Math.max(2, currentPage - 2); i <= Math.min(5, totalPages); i++) {
            paginationItems.push(i);
        }
    } else {
        for (let i = Math.max(2, currentPage - 2); i <= Math.min(currentPage + 2, totalPages - 1); i++) {
            paginationItems.push(i);
        }
    }

    // Display ellipsis (...) if currentPage is not close to the end
    if (currentPage < totalPages - 3) {
        paginationItems.push("bi:three-dots");
    }

    // Display the last page
    if (currentPage >= 4) {
        paginationItems.push(totalPages);
    }

    //Change Handler
    const onPrevHandler = () => {
        onChange(currentPage - 1)
    }
    const onNumberHandler = (number: number) => {
        onChange(number)
    }
    const onNextHandler = () => {
        onChange(currentPage + 1)
    }

    return (
        <div className="mt-10">
            {totalPages > 1 &&
                <ul className="flex gap-2 justify-center">
                    <li className={`select-none flex items-center justify-center cursor-pointer ${currentPage <= 1 && "pointer-events-none opacity-40"}`} onClick={onPrevHandler}>
                        <Icon icon="fluent:chevron-left-12-regular" />
                    </li>
                    {paginationItems.map((item, i) => (
                        <li key={i} className={`w-9 h-9 cursor-pointer select-none flex justify-center items-center border border-solid border-main rounded-sm hover:bg-main hover:text-white ${item === currentPage ? "bg-main text-white" : "bg-white"} ${item === "bi:three-dots" && "pointer-events-none"}`} onClick={() => onNumberHandler(item as number)}>
                            {item === "bi:three-dots" ? <Icon icon={item} /> : <span>{item}</span>}
                        </li>
                    ))}
                    <li className={`select-none flex items-center justify-center cursor-pointer ${currentPage >= totalPages && "pointer-events-none opacity-40"}`} onClick={onNextHandler}>
                        <Icon icon="fluent:chevron-right-12-regular" />
                    </li>
                </ul>
            }
        </div>
    );
};

export default Pagination;