import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useState, useEffect } from "react";
import Wrapper from "@/components/LayoutWrapper";
import { useRouter } from "next/router";
import { IntlProvider } from "react-intl";
import * as en from "@/lang/en.json";
import * as vi from "@/lang/vi.json";
import { StaffsOperation } from "@/TDLib/tdlogistics";
import { Libraries, LoadScript } from "@react-google-maps/api";
import AOS from "aos";
import "aos/dist/aos.css";
import { Loading } from "@/components/Common/Loading";
import { UserContext } from "@/Context/InfoContext/UserContext";
import Cookies from "js-cookie";
import { SocketContext } from "@/Context/SocketContext/SocketContext";
import { io } from 'socket.io-client';
import { Socket } from "socket.io-client";

const socket = io("https://api.tdlogistics.net.vn", {
  transports: ["websocket"],
  withCredentials: true
});

const googleMapsLibraries: Libraries = ["places"];
const staff = new StaffsOperation();
function MyApp({ Component, pageProps }: AppProps) {

  const { locale } = useRouter();
  const [info, setInfo] = useState(null);
  const router = useRouter();
  const [value, setValue] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const res = await staff.getAuthenticatedStaffInfo();
      if (res.data)
      setInfo(res.data);
      else router.push("/log")
    };
    fetchData();
  }, []);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setValue((prevValue) => !prevValue);
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);

  // useEffect(() => {
  //   console.log("cái này dùng để check xem còn cookie không");
  //   if (!Cookies.get("connect.sid")) {
  //     if (router.pathname != "/log" && router.pathname != "/") {
  //       router.push("/log");
  //     }
  //   }
  // }, [value]);

  useEffect(() => {
    console.log(info);
  }, [info]);
  const messages = {
    vi,
    en,
  };
  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 600,
      easing: "ease-out-sine",
    });
  });
  return (
    <>
      <SocketContext.Provider value={{ socket }}>
        <UserContext.Provider value={{ info, setInfo }}>
          <IntlProvider locale={locale} messages={messages[locale]}>
            <Wrapper>
              <Component {...pageProps} />
            </Wrapper>
          </IntlProvider>
        </UserContext.Provider>
      </SocketContext.Provider>
    </>
  );
}

export default MyApp;
