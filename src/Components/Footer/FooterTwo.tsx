import Link from "next/link";

//Data
const data = [
    { name: "Seller Registration", url: "/seller-registration", target: "_self" },
    { name: "Seller Login", url: "https://seller.nekmart.com", target: "_blank" },
    { name: "About Nekmart", url: "/about-us", target: "_self" },
    { name: "Order Track", url: "/track-your-order", target: "_self" },
    { name: "Pre-order", url: "/pre-order", target: "_self" }
]


const FooterTwo = () => {
    return (
        <div className="col-span-2">
            <h4 className="text-lg uppercase font-semibold text-main mb-4">Quick Links</h4>
            <ul>
                {data.map((item, i) => (
                    <li key={i} className="mb-1">
                        <Link href={item.url} target={item.target}>
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FooterTwo;