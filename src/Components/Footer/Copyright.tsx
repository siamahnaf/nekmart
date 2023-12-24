import Link from "next/link";
import Image from "next/image";

const Copyright = () => {
    return (
        <div>
            <div>
                <Image src="/sslcom.png" alt="Payment pic" width={5002} height={202} className="w-full" />
            </div>
            <div className="flex pb-4 pt-7">
                <p className="flex-1">
                    Copyright © 2023 <Link href="https://nekmart.com/" className="font-semibold text-main">Nekmart</Link>. All Rights Reserved
                </p>
                <p>
                    Powered by <Link href="https://siamahnaf.com" className="font-semibold text-main">Siam Ahnaf</Link>. An associate company of Nekmart electronics Ltd.
                </p>
            </div>
        </div>
    );
};

export default Copyright;