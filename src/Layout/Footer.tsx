//Components
import Container from "@/Components/Common/Container";
import FooterOne from "@/Components/Footer/FooterOne";
import FooterTwo from "@/Components/Footer/FooterTwo";
import FooterThree from "@/Components/Footer/FooterThree";
import FooterFour from "@/Components/Footer/FooterFour";
import Copyright from "@/Components/Footer/Copyright";

const Footer = () => {
    return (
        <footer className="bg-[#2c2c2cff] text-gray_whiter">
            <Container className="pt-10">
                <div className="grid grid-cols-12 gap-6">
                    <FooterOne />
                    <FooterTwo />
                    <FooterThree />
                    <FooterFour />
                </div>
                <hr className="bg-gray_whiter opacity-20 mb-7 mt-10" />
                <Copyright />
            </Container>
        </footer>
    );
};

export default Footer;