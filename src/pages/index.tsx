import type { GetServerSideProps } from "next";

//Components
import Layout from "@/Layout";

//Urql
import { initUrqlClient } from "@/Urql/client";
import { GET_PROFILE } from "@/Urql/Query/Authentication/auth.query";
import { GET_SELLER_PROFILE } from "@/Urql/Query/Authentication/profile.query";

const Home = () => {
  return (
    <Layout title="Dashboard" active="dashboard">
      <p>Hello World</p>
    </Layout>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  //Urql
  const { client, ssrCache } = initUrqlClient();

  //Headers
  const fetchOptions = {
    headers: {
      cookie: ctx.req.headers.cookie as string
    }
  };

  //Queries
  const { data } = await client.query(
    GET_PROFILE, {}, {
    fetchOptions,
    requestPolicy: "network-only"
  }).toPromise();

  //--//
  if (!data || data?.getProfile.role !== "seller") {
    return { redirect: { destination: "/login-to-seller", permanent: false } }
  }

  //--//
  await client.query(
    GET_SELLER_PROFILE, {}, {
    fetchOptions,
    requestPolicy: "network-only"
  }).toPromise();

  //--//

  //Props
  return { props: { urqlState: ssrCache?.extractData() } }
}