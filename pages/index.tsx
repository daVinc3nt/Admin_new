import type { NextPage } from "next";
import LogForm from "./log";
// import Footer from "../components/Footer/Footer";
import { useRouter } from "next/router";
import { FormattedMessage, useIntl } from "react-intl";
const Home: NextPage = () => {
  return (
    <>
    <LogForm/>
    </>
  );
};

export default Home;
