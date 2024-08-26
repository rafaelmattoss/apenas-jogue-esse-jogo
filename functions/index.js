

const { onRequest } = require('firebase-functions/v2/https');
const mercadopago = require('mercadopago');

// Configuração do Mercado Pago
mercadopago.configure({
    access_token: 'APP_USR-7001294782620310-082600-54fb00e6fb8d453a425d9df86a2a2f17-287444255'
});

// Função para criar preferência de pagamento
exports.createPreference = onRequest(async (req, res) => {
    const product = req.body.product;

    const preference = {
        items: [
            {
                title: 'Muito Mais Que Um Jogo',
                quantity: 1,
                currency_id: 'BRL',
                unit_price: 20.00 // preço em reais
            }
        ],
        back_urls: {
            success: 'https://rafaelmattoss.github.io/apenas-jogue-esse-jogo/home.html',
            failure: 'https://rafaelmattoss.github.io/apenas-jogue-esse-jogo/registrar.htm',
        },
        auto_return: 'approved',
        notification_url: 'https://yourapp.com/notifications',
    };

    try {
        const response = await mercadopago.preferences.create(preference);
        res.status(200).json({ id: response.body.id });
    } catch (error) {
        console.error('Erro ao criar preferência:', error);
        res.status(500).send('Erro ao criar preferência de pagamento');
    }
});
