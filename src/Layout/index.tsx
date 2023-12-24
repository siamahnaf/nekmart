import { ReactNode } from "react";

//Components
import Container from "@/Components/Common/Container";
import Sidebar from "./Sidebar";

//Interface
interface Props {
    active?: string;
    title?: string;
    children: ReactNode
}
const Layout = ({ active, title, children }: Props) => {
    return (
        <Container>
            <div className="grid grid-cols-9 gap-6 my-2">
                <div className="col-span-2">
                    <Sidebar active={active} />
                </div>
                <div className="col-span-7 my-2">
                    {children}
                </div>
            </div>
        </Container>
    );
};

export default Layout;