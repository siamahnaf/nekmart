import { useContext, useState } from "react";
import { Controller } from "react-hook-form";
import { Icon } from "@iconify/react";

//Context
import { productContext } from "@/Context/product.context";

//Component
import CustomSelect from "@/Components/Common/CustomSelect";

//Urql
import { useQuery } from "urql";
import { GET_RUNNING_FLASH } from "@/Urql/Query/Campaign/flash.query";
import { GetRunningFlashData } from "@/Urql/Types/Campaign/flash.types";

const FlashSale = () => {
    //State
    const [search, setSearch] = useState<string>("");

    //Context
    const { control } = useContext(productContext);

    //Urql
    const [{ data: flash, fetching: flashFetching, error }] = useQuery<GetRunningFlashData>({ query: GET_RUNNING_FLASH, variables: { searchInput: { page: 1, limit: 20, search } } })

    return (
        <div className="border border-solid border-gray-200 rounded-md mb-10">
            <h4 className="border-b border-solid border-gray-200 px-3 py-3 font-medium">Flash Sale</h4>
            <div className="p-5">
                <div className="grid grid-cols-4 gap-2 items-start mb-7">
                    <label htmlFor="mainCategory" className="col-span-1 w-max text-sm">Select Flash Sale</label>
                    <div className="col-span-3">
                        <Controller
                            control={control}
                            name="flash"
                            render={({ field: { onChange, value } }) => (
                                <CustomSelect
                                    value={value}
                                    onChange={onChange}
                                    label="Flash Sale"
                                    fetching={flashFetching}
                                    search={
                                        <div className="mb-2 relative">
                                            <input
                                                className="py-2 pl-9 pr-3 rounded-md border border-solid border-gray-200 focus:outline-none w-full"
                                                placeholder="Search main category"
                                                onChange={(e) => setSearch(e.target.value)}
                                            />
                                            <Icon icon="gala:search" className="absolute left-2 top-1/2 -translate-y-1/2 text-lg text-blue-gray-900" />
                                        </div>
                                    }
                                    options={flash?.getRunningFlashes.results.map((item) => ({ label: item.title, value: item.id }))}
                                />
                            )}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlashSale;