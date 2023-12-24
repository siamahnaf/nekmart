import type { GetServerSideProps } from "next";

//Components
import Layout from "@/Layout";
import BannerOne from "@/Components/Home/BannerOne";
import Categories from "@/Components/Home/Categories";
import Flash from "@/Components/Home/Flash";
import SectionOne from "@/Components/Home/SectionOne";
import BannerTwo from "@/Components/Home/bannerTwo";
import SectionTwo from "@/Components/Home/SectionTwo";
import Brand from "@/Components/Home/Brand";
import Shop from "@/Components/Home/Shop";

//Urql
import { initUrqlClient } from "@/Urql/client";
import { GET_SETTINGS } from "@/Urql/Query/Settings/settings.query";
import { GET_RUNNING_FLASH } from "@/Urql/Query/Flash/flash.query";
import { GET_BANNER_ONE } from "@/Urql/Query/Home/home.query";
import { GET_CATEGORIES } from "@/Urql/Query/Category/category.query";
import { GET_BANNER_TWO } from "@/Urql/Query/Home/home.query";
import { GET_BRANDS } from "@/Urql/Query/Brand/brand.query";
import { GET_SELLER } from "@/Urql/Query/Seller/seller.query";
import { GET_SECTIONS } from "@/Urql/Query/Home/home.query";
import { GET_PROFILE } from "@/Urql/Query/Account/profile.query";

const Home = () => {
  return (
    <Layout>
      <BannerOne />
      <Categories />
      <Flash />
      <SectionOne />
      <BannerTwo />
      <SectionTwo />
      <Brand />
      <Shop />
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
  //Common Queries
  await client.query(
    GET_SETTINGS, {}, {
    fetchOptions,
    requestPolicy: "network-only"
  }).toPromise();

  //--//
  await client.query(
    GET_RUNNING_FLASH, { searchInput: { page: 1, limit: 50 } }, {
    fetchOptions,
    requestPolicy: "network-only"
  }).toPromise();

  //---//
  await client.query(
    GET_PROFILE, {}, {
    fetchOptions,
    requestPolicy: "network-only"
  }).toPromise();

  //In Page Queries
  await client.query(
    GET_BANNER_ONE, {}, {
    fetchOptions,
    requestPolicy: "network-only"
  }).toPromise();

  //In Page Queries
  await client.query(
    GET_CATEGORIES, { searchInput: { page: 1, limit: 30 } }, {
    fetchOptions,
    requestPolicy: "network-only"
  }).toPromise();

  //In Page Queries
  await client.query(
    GET_BANNER_TWO, {}, {
    fetchOptions,
    requestPolicy: "network-only"
  }).toPromise();

  //In Page Queries
  await client.query(
    GET_BRANDS, { searchInput: { page: 1, limit: 15 } }, {
    fetchOptions,
    requestPolicy: "network-only"
  }).toPromise();

  //In Page Queries
  await client.query(
    GET_SELLER, { searchInput: { page: 1, limit: 15 } }, {
    fetchOptions,
    requestPolicy: "network-only"
  }).toPromise();

  //In Page Queries
  await client.query(
    GET_SECTIONS, {}, {
    fetchOptions,
    requestPolicy: "network-only"
  }).toPromise();

  //Props
  return { props: { urqlState: ssrCache?.extractData() } }
}