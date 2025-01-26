/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "dc3lqfwgkms4bzfx.public.blob.vercel-storage.com",
                port: ""
            }
        ]
    }
};

export default nextConfig;
