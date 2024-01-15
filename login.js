function seConnecter() {
    const seConnecterForm = document.querySelector(".formulaire");
    if (seConnecterForm) {
        seConnecterForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const user =  {
            email: event.target.querySelector("[name=email]").value,
            password: event.target.querySelector("[name=password]").value,
        };
        console.log(user);

    
        const chargeUtile = JSON.stringify(user);
        fetch('http://localhost:5678/api/users/login', {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: chargeUtile,
        })
        .then(response => response.json())
        .then(data => {
        console.log(data)
       
//        if (email == true && password == true) {
    if (typeof data.message === "undefined") {

            // enregistrement dans localStorage
            localStorage.setItem('connection', 'true');
            localStorage.setItem("userId", data.userId);
            localStorage.setItem("token", data.token);
            console.log(data.token);
            //mise en place parametre ds l'URL avec la méthode GET 
            const redirection = "index.html";
            // redirection
             window.location.href= redirection;
       } else {
            //Gérer le cas où l'authentification a échoué
            console.log(data.message)
           alert("L'e-mail et/ou le mot de passe sont incorrects.");
       }
        
    })
  });    
}}

seConnecter();
