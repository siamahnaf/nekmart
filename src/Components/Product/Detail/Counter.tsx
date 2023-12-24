import { Icon } from "@iconify/react";

//Interface
interface Props {
    value: number;
    minimum: number;
    maximum: number;
    onChange: (e: number) => void;
}

const Counter = ({ value, minimum, maximum, onChange }: Props) => {
    //Handler
    const onIncrease = () => {
        if (maximum > value) {
            onChange(value + 1)
        }
    }

    //Handler
    const onDecrease = () => {
        if (minimum < value) {
            onChange(value - 1)
        }
    }

    return (
        <div className="flex rounded-md">
            <span className="px-3 py-2 bg-main flex justify-center items-center rounded-s text-white select-none cursor-pointer" onClick={onDecrease}>
                <Icon icon="akar-icons:minus" />
            </span>
            <span className="px-4 py-2 bg-whiter flex justify-center items-center">{value}</span>
            <span className="px-3 py-2 bg-main flex justify-center items-center rounded-e text-white select-none cursor-pointer" onClick={onIncrease}>
                <Icon icon="akar-icons:plus" />
            </span>
        </div>
    );
};

export default Counter;