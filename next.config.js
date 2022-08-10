/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
};

module.exports = {
	nextConfig,
	images: {
		domains: ["demos.creative-tim.com"],
	},
	webpack: (
		config,
		{ buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
	  ) => {
		// Important: return the modified config
		return config
	  },
};
