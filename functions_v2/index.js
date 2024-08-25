const functions = require('firebase-functions/v2');
const admin = require('firebase-admin');
const stripe = require('stripe')(functions.config().stripe.secret);

admin.initializeApp();

exports.createCheckoutSession = functions.https.onCall(async (data, context) => {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
            price_data: {
                currency: 'brl',
                product_data: {
                    name: 'Muito Mais Que Um Jogo',
                },
                unit_amount: 2000, // em centavos (20,00 BRL)
            },
            quantity: 1,
        }],
        mode: 'payment',
        success_url: 'https://rafaelmattoss.github.io/apenas-jogue-esse-jogo/index.html',
        cancel_url: 'https://rafaelmattoss.github.io/apenas-jogue-esse-jogo/index.html/home.html',
    });

    return {
        id: session.id,
    };
});
