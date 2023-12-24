import Link from "next/link";

//Components
import Container from "../Common/Container";

const Content = () => {
    return (
        <section>
            <Container className="py-14">
                <h4 className="text-xl uppercase font-semibold mb-10">About Us</h4>
                <div className="px-4">
                    <h5 className="text-2xl font-semibold text-main mb-4">About Nekmart</h5>
                    <p className="text-sm">
                        Welcome to <Link href="https://nekmart.com" className="text-main">Nekmart.com</Link>, We are an online commercial transaction platform. We started with one goal in mind to make lives easier with a vision to introduce to shopping without any barrier all over the world. We are determined to empower people to solve and simplify their daily needs.
                    </p>
                    <br />
                    <p className="text-sm">
                        Nekmart is an e-commerce brand under Nek Agro Ltd. In this Digital era of Bangladesh where e-commerce business is booming, here we are offering varieties of product and service to meet the market demand. After digitalization of Bangladesh there are many foreign brands came here and tried to fulfill the market supply and demand. But here being as a local company, Nekmart is proud to fulfill the local market demand and represent Bangladesh Globally.
                    </p>
                    <br />
                    <p className="text-sm">
                        Actually, Nekmart.com is the new generation e-commerce site decorated with customized facility and services to ensure all the human needs. We are burnished with finest technology and best plan to serve every member.. We are committed to reach faster than your expectations to make you smile with satisfaction. We have introduced some finest technology to make your desire easier and search tools that suits your expectations. For your every demand, we are designed with everything. For the first time in Bangladesh, We are connected, passionate and capable to deliver the value you are seeking.
                    </p>
                    <h5 className="text-2xl font-semibold text-main mb-4 mt-5">About Nekfood</h5>
                    <p className="text-sm">
                        Nek Food Ltd. provides the link between the customers and the farmers so that, customers can get safe organic food and products directly from the growers or the producers. <strong>Nekfood is an brand under Nek Agro Ltd</strong>. Our main focus is to inspire farmers to deliver safe food and products that are free from insecticides, chemical fertilizers, harmful chemicals, and preservatives. These, in turn, may enable consumers to have natural, safe and nutritious food, and products for healthy living.
                    </p>
                    <br />
                    <p className="text-sm">
                        Safe food is our basic human right. Safe foods are becoming scarce and inaccessible commodities in Bangladesh as the dependencies towards unhealthy ways of cultivation and preservation are on the rise. One of the main reasons Bangladeshi farmers are reluctant to grow healthy food is, they are unable to access the organic products market directly to sell those produced. But when they do, it is through the middleman who keeps a fair share of their profit. Finally, when the products reach the consumer’s hand they end up paying a higher amount for organic products that are not in the fresh state or have a lower nutritional value.
                    </p>
                    <br />
                    <p className="text-sm">
                        Our mission is to empower Bangladeshi organic farmers to grow safe, healthy, and nutritious food. We provide the support Bangladeshi farmers needed to get a better life by helping them grow and sell safe foods and products directly to the consumers.  “organic & fresh ”, is our slogan.
                    </p>
                    <br />
                    <p className="text-sm">
                        Right now we are providing our services in the Dhaka division. Our vision is to expand our services to all eight divisions of Bangladesh by 2025. We maintain strict regulations to ensure our farmers are complying with the organic safe foods and products code of conduct. So that consumers can have truly organic foods and products with the highest standard possible.
                    </p>
                    <h5 className="text-2xl font-semibold text-main mb-4 mt-5">About Nek Agro Ltd.</h5>
                    <p className="text-sm">We had started our business in the year of 2022 under the name of NEK AGRO. After one years of successful business in Poultry Industry.</p>
                    <h5 className="text-2xl font-semibold text-main mb-4 mt-5">Our Mission</h5>
                    <p className="text-sm">Our mission is to serve the Nation by distributing Innovative products based on modern technology & research.</p>

                    <p className="text-center mt-16 text-sm">Registered Office: <span className="font-bold">ShikderTower (2nd Floor). B-116/1 Shobanbag, Savar, Dhaka-1340</span> </p>
                    <p className="text-center mt-2 text-sm">Corporate Office: <span className="font-bold">ShikderTower (2nd Floor). B-116/1 Shobanbag, Savar, Dhaka-1340</span></p>
                </div>
            </Container>
        </section>
    );
};

export default Content;