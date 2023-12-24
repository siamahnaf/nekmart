import { createContext, SetStateAction, Dispatch } from "react";

//Types
interface Context {
    selected?: string;
    setSelected?: Dispatch<SetStateAction<string>>
}

export const imageContext = createContext<Context>({});