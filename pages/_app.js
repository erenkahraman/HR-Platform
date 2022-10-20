import { useRouter } from "next/router";
import { Layout } from "../components/Layout";
import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import { useEffect } from "react";
import { app } from "../pages/verifyToken/index";
import cookie from "js-cookie";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  const router = useRouter();

  /// for Token Check
  useEffect(() => {
    const fetchData = async () => {
      const data = await app();
      return data;
    };
    const result = fetchData().catch(console.error);
    result.then(function (val) {
      if (
        val !== true &&
        (router.asPath !== "/login" && router.asPath !== "/login/forgot" && router.asPath !== "/404")
      ) {
        router.push("/login");
        cookie?.remove("token");
        cookie?.remove("user");
      }
    });
  }, [router]);
  /// for Token Check

  if (router.asPath === "/login" || router.asPath === "/login/forgot") {
    return (
      <SessionProvider session={session}>
        <Component {...pageProps} />{" "}
      </SessionProvider>
    );
  } else {
    return (
      <SessionProvider session={session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    );
  }
}

export default MyApp;
