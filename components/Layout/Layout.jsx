import { Topbar, Sidebar } from ".";
const { default: Head } = require("next/head");

const Layout = ({ children }) => {
	return (
		<>
			<Head>
				<title>HR Project</title>
			</Head>
			<main>
				<div className="sticky top-0 z-50">
					<Topbar />
				</div>
				{/* Main Container */}
				<div className="flex relative text-[#4F4F4F]">
					{/* Left Side */}
					<aside className="flex flex-[1] h-full sticky top-16 bg-white drop-shadow-xl">
						<Sidebar />
					</aside>
					{/* Right Side */}
					<div className="flex flex-[5] p-4 bg-gradient-to-r from-sky-50 to-purple-50">
						{children}
					</div>
				</div>
			</main>
		</>
	);
};

export default Layout;
