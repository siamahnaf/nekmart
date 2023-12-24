//Components
import Container from "@/Components/Common/Container";
import Logo from "@/Components/Header/Logo";
import Icons from "@/Components/Header/Icons";
import Search from "@/Components/Header/Search";
import Navs from "@/Components/Header/Navs";

const Header = () => {
    return (
        <header>
            <div className="bg-white h-[72px] fixed left-0 top-0 w-full grid items-center z-50" id="header">
                <Container className="grid grid-cols-12 gap-5 items-center">
                    <Logo />
                    <Search />
                    <Icons />
                </Container>
            </div>
            <div className="mt-[72px] bg-whiter py-4">
                <Container>
                    <Navs />
                </Container>
            </div>
        </header>
    );
};

export default Header;