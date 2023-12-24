import { Icon } from "@iconify/react";

const Search = () => {
    return (
        <div className="flex col-span-6">
            <input
                placeholder="Search"
                className="border border-solid border-main rounded-s-md focus:outline-none py-2 px-4 w-full"
            />
            <button className="bg-main flex justify-center items-center rounded-r-md px-3 text-white">
                <Icon className="text-xl" icon="fe:search" />
            </button>
        </div>
    );
};

export default Search;