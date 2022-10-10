import { useRouter } from "next/router";
import { Layout } from "../components/Layout";
import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import { useEffect } from "react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  const router = useRouter();

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
