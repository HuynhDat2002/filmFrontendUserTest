/** @type {import('next').NextConfig} */
const nextConfig = {
    appDir: true,
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
};

export default nextConfig;
