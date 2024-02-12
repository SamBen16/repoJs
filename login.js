function seConnecter() {
    const seConnecterForm = document.querySelector(".formulaire");
    if (seConnecterForm) {
        seConnecterForm.addEventListener('submit', function(event) {
            event.preventDefault();
        
            const user =  {
                email: event.target.querySelector("[name=email]").value,
                password: event.target.querySelector("[name=password]").value,
            };
    
            const chargeUtile = JSON.stringify(user);
            fetch('http://localhost:5678/api/users/login', {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: chargeUtile,
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                
                if (typeof data.userId !== "undefined" && typeof data.token !== "undefined") {
                    // Enregistrement dans localStorage
                    localStorage.setItem('connection', 'true');
                    localStorage.setItem("userId", data.userId);
                    localStorage.setItem("token", data.token);
                    const redirection = "index.html";
                    window.location.href = redirection;
                } else {
                    alert("L'e-mail et/ou le mot de passe sont incorrects.");
                }
            })
            .catch(error => {
                console.error('Erreur lors de la requête de connexion :', error);
            });
        });    
    }
}

seConnecter();

