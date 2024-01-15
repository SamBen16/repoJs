fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // Boucler le nombre de figures sur la page d'accueil
        for (let i = 0; i < data.length; i++) {
            // Récupération de la classe gallery
            const gallery = document.querySelector('.gallery');

            // Création des éléments 
            const figure = document.createElement('figure');
            const img = document.createElement('img');
            const figcaption = document.createElement('figcaption');
            
            // Intégration du contenu dans chaque élément
            img.src = data[i].imageUrl;
            img.alt = data[i].title;
            figcaption.innerText = data[i].title;

            // Intégration au niveau du DOM
            figure.appendChild(img);
            figure.appendChild(figcaption);
            gallery.appendChild(figure);

            // Utilisation de la fonction pour récupérer la catégorie
            let category = getCategory(data[i]);
            figure.setAttribute('id', category);
        }

        // Partie boutons et filtres
        const categories = new Set();
        data.forEach(element => {
            let category = getCategory(element);
            console.log(category);
            categories.add(category);
        });
        console.log(categories);

        const buttons = document.querySelector('.buttons');

        // intégration du bouton "tous"
        const buttonTous = document.createElement('button');
        buttonTous.setAttribute("type", "button");
        buttonTous.setAttribute("id", "tous");
        buttonTous.innerText = "tous";
        buttons.appendChild(buttonTous);
        buttonTous.addEventListener('click', function() {
            const gallery = document.querySelector('.gallery');
            const figures = gallery.querySelectorAll('figure');
            figures.forEach(figure => {
                figure.style.display = "block";
            });
        });

        // intégration des autres boutons pour chaque catégorie
        categories.forEach(category => {
            const button = document.createElement('button');
            button.setAttribute('type', 'button');
            button.setAttribute('id', category);
            button.innerText = category;
            buttons.appendChild(button);
            button.addEventListener('click', function() {
                const gallery = document.querySelector('.gallery');
                const figures = gallery.querySelectorAll('figure');
                figures.forEach(figure => {
                    figure.style.display = (figure.getAttribute('id') === category || category === "tous") ? "block" : "none";
                });
            });
        });

        // Passage fonctionnement connexion/deconnexion
        const logoutLien = document.querySelector("#logoutId");
            logoutLien.addEventListener("click", function () {
            localStorage.clear();
        });

        // Récupère info de connexion depuis le localStorage
        const isConnected = localStorage.getItem('connection');
            console.log(isConnected);
            const gallery = document.querySelector('.gallery');
        if (isConnected == 'true') {
            document.querySelector("#loginId").style.display = "none";
            document.querySelector("#logoutId").style.display = "block";
           console.log(gallery);
        
        } else {
            document.querySelector("#loginId").style.display = "block";
            document.querySelector("#logoutId").style.display = "none";
        }
    })

.catch(error => console.error(error));

// Fonction pour récupérer la catégorie d'un élément
function getCategory(element) {
    return element.category.name;
}