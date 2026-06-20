const base = process.env.PAYPAL_API_URL || 'https://api-m.sandbox.paypal.com';

export const payplal = {}

// Generate an access token for the PayPal API
const generateAccessToken = async () => {
    const { PAYPAL_CLIENT_ID, PAYPAL_APP_SECRET } = process.env;
    const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_APP_SECRET}`).toString(
        'base64'
    );

    const response = await fetch(`${base}/v1/oauth2/token`, {
        method: 'POST',
        body: 'grant_type=client_credentials',
        headers: {
            Authorization: `Basic ${auth}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });

    const jsonData = await handleResponse(response);
    return jsonData.access_token;

    async function handleResponse(response: Response) {
        if (response.status === 200 || response.status === 201) {
            return response.json();
        }

        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }
}