// Import axios untuk membuat request ke API eksternal
const axios = require('axios');

// Handler untuk endpoint serverless
export default async function handler(req, res) {
    // Pastikan metode request adalah GET
    if (req.method === 'GET') {
        try {
            // Mengambil data dari API Gate.io
            const response = await axios.get('https://www.gate.io/apiw/v2/pre_market/currencies/TOMA');
            
            // Ambil data yang diperlukan dari respons
            const tomaData = response.data.data;
            const latestDealPrice = parseFloat(tomaData.latest_deal_price);

            // Kirim data dalam format JSON sebagai respons
            res.status(200).json({
                currency: tomaData.currency,
                full_name: tomaData.full_name,
                latest_deal_price: latestDealPrice
            });
        } catch (error) {
            // Tampilkan error pada konsol dan kirim respons error
            console.error('Error fetching data from Gate.io:', error);
            res.status(500).json({ error: 'Error fetching data' });
        }
    } else {
        // Jika metode request bukan GET, kembalikan error 405
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
