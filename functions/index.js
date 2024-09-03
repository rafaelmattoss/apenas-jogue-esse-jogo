const functions = require("firebase-functions");
const admin = require("firebase-admin");
const stripe = require('stripe')(functions.config().stripe.secret);


const cors = require("cors")({ origin: true }); // Permite todas as origens

admin.initializeApp();
const db = admin.firestore();

exports.createCheckoutSession = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {
        const YOUR_DOMAIN = 'https://rafaelmattoss.github.io/apenas-jogue-esse-jogo'; // Substitua pelo seu domínio real

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
                success_url: `${YOUR_DOMAIN}/aprov.html?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${YOUR_DOMAIN}/neg.html`,
                metadata: {
                    userId: req.body.userId // Envia o userId como metadado
                }
            });

            // Retorne a ID da sessão para o cliente
            res.json({ sessionId: session.id });

        } catch (error) {
            console.error("Erro ao criar a sessão de checkout ou ao atualizar o banco de dados", error);
            res.status(500).send(error.message);
        }
    });
});

exports.verifyCheckoutSession = functions.https.onRequest(async (req, res) => {
    const sessionId = req.query.session_id;

    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (session.payment_status === 'paid') {
            // Atualize o status do usuário no Firestore
            const userId = session.metadata.userId;
            await db.collection('usuarios').doc(userId).update({ premium: true });

            res.json({ paid: true, userId });
        } else {
            res.json({ paid: false });
        }
    } catch (error) {
        console.error("Erro ao verificar a sessão de checkout", error);
        res.status(500).send("Erro ao verificar a sessão.");
    }
});

exports.updateUserStatus = functions.https.onRequest(async (req, res) => {
    const { userId, premium } = req.body;

    try {
        await db.collection('usuarios').doc(userId).update({ premium });
        res.status(200).send('Usuário atualizado com sucesso');
    } catch (error) {
        console.error("Erro ao atualizar status do usuário", error);
        res.status(500).send("Erro ao atualizar status do usuário.");
    }
});




