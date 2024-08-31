const functions = require("firebase-functions");
const admin = require("firebase-admin");
const stripe = require("stripe")(functions.config().stripe.secret);

admin.initializeApp();
const db = admin.firestore();

exports.createCheckoutSession = functions.https.onRequest(async (req, res) => {
    const YOUR_DOMAIN = 'http://localhost:4242'; // Substitua pelo seu domínio real

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'BRL',
                        product_data: {
                            name: 'Muito Mais Que Um Jogo', // Nome do produto
                        },
                        unit_amount: 2500, // Valor em centavos (R$25,00)
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${YOUR_DOMAIN}/success.html`,
            cancel_url: `${YOUR_DOMAIN}/cancel.html`,
        });

        // Retorne a ID da sessão para o cliente
        res.json({ sessionId: session.id });
    } catch (error) {
        console.error("Erro ao criar a sessão de checkout", error);
        res.status(500).send(error.message);
    }
});
