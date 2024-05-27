firebase.auth().onAuthStateChanged(user => {

    if (user) {
       
        buscarDados(user); // Chama a função buscarDados com o usuário autenticado
    }
});


function buscarDados(user) {
    
    
    
    const db = firebase.firestore();

    // Consulta ao Firestore para obter o documento do usuário pelo UID
    db.collection("usuarios").where('uid', '==', user.uid).get()
        .then((querySnapshot) => {
            if (!querySnapshot.empty) {
                const userData = querySnapshot.docs[0].data();

                // Preenche os elementos HTML com os dados do usuário
                document.getElementById("principal-nome").textContent = userData.nome;
                document.getElementById("nome").textContent = `Nome: ${userData.nome}`;
                document.getElementById("email").textContent = `Email: ${userData.email}`;
                document.getElementById("uid").textContent = `ID: ${userData.uid}`;
            } else {
                alert("Documento do usuário não encontrado no Firestore.");
            }
        })
        .catch((error) => {
            
            alert("Erro ao buscar dados. Consulte o console para mais detalhes.");
        });
}


