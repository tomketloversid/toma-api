const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 3000;

// Middleware CORS
app.use(cors());

// Endpoint untuk mengambil harga TOMA dari Gate.io
app.get('/api/', async (req, res) => {
    try {
        // Fetch data dari API Gate.io
        const response = await axios.get('https://www.gate.io/apiw/v2/pre_market/currencies/TOMA');
        
        // Ambil data yang dibutuhkan
        const tomaData = response.data.data;
        const latestDealPrice = parseFloat(tomaData.latest_deal_price);

        // Kirim data sebagai respons
        res.json({
            currency: tomaData.currency,
            full_name: tomaData.full_name,
            latest_deal_price: latestDealPrice
        });
    } catch (error) {
        console.error('Error fetching data from Gate.io:', error);
        res.status(500).json({ error: 'Error fetching data' });
    }
});

// Jalankan server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
