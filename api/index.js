const axios = require('axios');

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const response = await axios.get('https://www.gate.io/apiw/v2/pre_market/currencies/TOMA');
            
            const tomaData = response.data.data;
            const latestDealPrice = parseFloat(tomaData.latest_deal_price);

            res.status(200).json({
                currency: tomaData.currency,
                full_name: tomaData.full_name,
                latest_deal_price: latestDealPrice
            });
        } catch (error) {
            console.error('Error fetching data from Gate.io:', error);
            res.status(500).json({ error: 'Error fetching data' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
