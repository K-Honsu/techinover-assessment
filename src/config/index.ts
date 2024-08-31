export const APP_NAME = "techinnover"

export const configuration = () => ({
    port: parseInt(process.env.PORT) || 3004,
    db: {
        uri: process.env.MONGO_URI || `mongodb://127.0.0.1:27017/${APP_NAME}`,
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'insecure',
        issuer: APP_NAME,
        expiresIn: '7d',
    },
});