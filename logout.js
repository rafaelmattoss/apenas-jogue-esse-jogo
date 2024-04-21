
$("#sair").click(logOut)

function logOut() {
    if (firebase.auth().currentUser) {
        
        firebase.auth().signOut()
            .then(() => {
                window.location.href = 'index.html';
            })
            .catch((error) => {
                
                alert('Erro ao fazer logout. Por favor, tente novamente.');
            });
    } else {
       
        window.location.href = 'index.html';
    }
}
