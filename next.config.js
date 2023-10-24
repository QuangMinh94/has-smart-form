/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    webpack: (config) => {
        config.module.rules.push(
            {
                test: /\.(pdf|node)$/,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ]
            }
        );

        return config;
    },
}

module.exports = nextConfig
