import Link from "next/link";

//Data
const data = [
    { name: "Return Policy", url: "/returnpolicy" },
    { name: "Refund Policy", url: "/refund-policy" },
    { name: "Terms & Condition", url: "/terms" },
    { name: "EMI Policy", url: "/emi-policy" },
    { name: "Privacy Policy", url: "/privacypolicy" },
    { name: "User Dashboard", url: "/dashboard" }
]

const FooterThree = () => {
    return (
        <div className="col-span-2">
            <h4 className="text-lg uppercase font-semibold text-main mb-4">Help</h4>
            <ul>
                {data.map((item, i) => (
                    <li key={i} className="mb-1">
                        <Link href={item.url}>
                            {item.name}
                        </Link>
                    </li>
                ))}
                <li>
                    <Link href="https://tawk.to/chat/6331a6d937898912e96b5812/1gdsv7ghr">
                        Live chat
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default FooterThree;