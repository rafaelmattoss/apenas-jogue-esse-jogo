const functions = require('firebase-functions');
const express = require('express');
const bodyParser = require('body-parser');
const mercadopago = require('mercadopago');

// Configuração do Mercado Pago
mercadopago.configure({
    access_token: 'APP_USR-7001294782620310-082600-54fb00e6fb8d453a425d9df86a2a2f17' // Substitua pelo seu access token do Mercado Pago
});

const app = express();

// Middleware para processar JSON
app.use(bodyParser.json());

// Rota para criar uma preferência de pagamento
app.post('/create_preference', async (req, res) => {
    try {
        const preference = {
            items: [
                {
                    title: 'Muito Mais Que Um Jogo',
                    quantity: 1,
                    currency_id: 'BRL',
                    unit_price: 25.00
                }
            ],
            payer: {
                email: req.body.email, // Pode ser passado do frontend
            },
            back_urls: {
                success: window.location.href = 'index.html',
                failure: window.location.href = 'home.html',
                
            },
            auto_return: 'approved',
        };

        const response = await mercadopago.preferences.create(preference);
        res.status(200).json({ id: response.body.id });
    } catch (error) {
        console.error('Erro ao criar preferência:', error);
        res.status(500).send('Erro ao criar a preferência de pagamento');
    }
});

// Expor o app do Express como uma função do Firebase
exports.api = functions.https.onRequest(app);
