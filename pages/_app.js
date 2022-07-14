import { useRouter } from "next/router";
import { Layout } from "../components/Layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
	const router = useRouter();

	if (router.asPath === "/login") {
		return <Component {...pageProps} />;
	} else {
		return (
			<Layout>
				<Component {...pageProps} />
			</Layout>
		);
	}
}

export default MyApp;
