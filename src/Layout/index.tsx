import { Fragment, FC, ReactNode } from "react";

//Components
import Header from "./Header";
import Footer from "./Footer";

//Types
interface Props {
    title?: string;
    children: ReactNode;
}

const Layout: FC<Props> = ({ children, title }) => {
    return (
        <Fragment>
            <Header />
            {children}
            <Footer />
        </Fragment>
    );
};
export default Layout;