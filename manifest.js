// you can copy the base structure of manifest object.
export const manifestForPlugIn = {
    registerType: 'autoUpdatge',
    includeAssests: ['favicon.ico', "apple-touc-icon.png"],
    manifest: {
        name: "PapasWillows",
        short_name: "PapasWillows",
        description: "PapasWillows",
        icons: [
            {
                src: 'android-chrome-192x192.png',
                sizes: '192x192',
                type: 'image/png',
                purpose: 'any maskable'
            },
            {
                src: 'android-chrome-512x512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'any maskable'
            },
            {
                src: '/apple-touch-icon.png',
                sizes: '180x180',
                type: 'image/png',
                purpose: 'apple touch icon',
            },
        ],
        theme_color: '#171717',
        background_color: '#f0e7db',
        display: "standalone",
        scope: '/',
        start_url: "/",
        orientation: 'portrait'
    }
}