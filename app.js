const STRIPE_PUBLISHABLE_KEY = "pk_live_51PjN8Z086aDpYuyzVT7w6smVTTlZa0jT219xzUNwxxOf52uHbYJhEUKetPwBrcu9Qh2JXrOtgaPNrT5Cc2MPctny00XElaXj4A"; // Substitua pela sua chave publicável do Stripe

// Inicializar o Stripe no front-end com a chave publicável
const stripe = stripe(STRIPE_PUBLISHABLE_KEY);

// Exemplo de uso para criar uma sessão de checkout ou gerenciar pagamentos
// function exemploUsoStripe() {
//     // Seu código de integração com o Stripe no front-end
// }
