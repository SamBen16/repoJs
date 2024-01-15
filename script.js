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
        }
    })
    .catch(error => console.error(error));