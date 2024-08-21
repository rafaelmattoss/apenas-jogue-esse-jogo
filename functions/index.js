/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const functions = require('firebase-functions');
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
                unit_amount: 2000, // em centavos (20,00 USD)
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
