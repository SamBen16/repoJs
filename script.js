
let figure;
let figureModal;
fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // Boucler le nombre de figures sur la page d'accueil
        for (let i = 0; i < data.length; i++) {
            // Récupération de la classe gallery
            const gallery = document.querySelector('.gallery');

            // Création des éléments 
            figure = document.createElement('figure');
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
           document.querySelector("#logoOuvrirModal1").style.display = "block";
           document.querySelector("#ouvrirModal1").style.display = "block";
           console.log(gallery);
        
        } else {
            document.querySelector("#loginId").style.display = "block";
            document.querySelector("#logoutId").style.display = "none";
        };

        // affichage 1ère modal
        const ouvrirModal1 = document.querySelector('#ouvrirModal1');
        const modal1 = document.querySelector('#modal1');
        const fermerModal1 = document.getElementById("fermerModal1");

        ouvrirModal1.addEventListener('click', function() {
            const galleryModal = document.querySelector('.galleryModal');
            console.log(galleryModal);

            data.forEach(element => {
                const figureModal = document.createElement('figure');
                const imgModal = document.createElement('img');
                const deleteImg = document.createElement('i');

                imgModal.src = element.imageUrl;
                imgModal.alt = element.title;

                figureModal.classList.add('gallery-item');
                figureModal.style.position = 'relative';
                deleteImg.classList.add('fas', 'fa-trash-alt');
                deleteImg.style.position = 'absolute';
                deleteImg.style.top = '6px';
                deleteImg.style.right = '6px';
                deleteImg.style.zIndex = '1';
                deleteImg.style.opacity = '1';
                deleteImg.style.border = '2px solid black';
                deleteImg.style.backgroundColor = "black";
                deleteImg.style.color = "white";

                figureModal.appendChild(imgModal);
                figureModal.appendChild(deleteImg);
                galleryModal.appendChild(figureModal);

                console.log('figure:', figure);
                console.log(figureModal);
                
                deleteImg.addEventListener('click', function() {
                    const id = element.id;
                    const token = localStorage.getItem("token");
                     console.log(token);
                    // Vérifier la présence du token
                    if (token) {
                        console.log(id);
                        fetch(`http://localhost:5678/api/works/${id}`, {
                            method: 'DELETE',
                            headers: {
                                'Accept': '*/*',
                                'Authorization': `Bearer ${token}`,
                            },
                        })
                        .then(response => {
                            figure.style.display = 'none';
                            figureModal.style.display = 'none';
                        })
                    }
                });
                modal1.style.display = "block";
            });
            
        });

              // fermeture modal1 avec la croix
        fermerModal1.addEventListener("click", function() {
                console.log("fermer");
                modal1.style.display = "none";
        });

            // fonctionnement modal2
        ouvrirModal2.addEventListener('click', function() {
            modal2.style.display = "block";
        })

        flecheModal2.addEventListener('click', function() {
            const flecheModal2 = document.getElementById('flecheModal2');
            modal2.style.display = "none"; 
            modal1.style.display = "block";
        })
        fermerModal2.addEventListener('click', function() {
            const fermerModal2 = document.getElementById('fermerModal2');
            const redirection = "index.html";
            console.log('fermer modal2');
            window.location.href= redirection;
        })

        const formulaireModal2 = document.getElementById('formulaireModal2');
        formulaireModal2.addEventListener('submit', function(event) {
            event.preventDefault();
            const titreModal2 = document.getElementById('titreModal2').value;
            const categorieModal2 = document.getElementById('categoryModal2').value;
            const imageInput = document.getElementById('image');
            const image = imageInput.files[0];
        
            const formData = new FormData();
            formData.append('title', titreModal2);
            formData.append('category', categorieModal2);
            formData.append('image', image);
        
            const token = localStorage.getItem("token");
            fetch('http://localhost:5678/api/works', {
                method: 'POST',
                headers: {
                    // 'Accept': 'application/json', 
                    // 'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            })
            .then(response => response.json())
            .then(data => {
                alert("projet ajouté");
                console.log('Projet ajouté avec succès:', data);
            })
            
            .catch(error => {
                console.log('Réponse complète du serveur:', error.response);
            });            

        })
    })
    .catch(error => console.error(error));

// Fonction pour récupérer la catégorie d'un élément
function getCategory(element) {
    return element.category.name;
}

document.addEventListener("DOMContentLoaded", function () {
    const imageInput = document.getElementById("image");
    const previewImage = document.getElementById("previewImage");
    const previewImageContainer = document.getElementById("previewImageContainer");
    const iconImage = document.querySelector('.fa-regular.fa-image');

    imageInput.addEventListener("change", function () {
        const file = imageInput.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = function (e) {
                iconImage.style.display = "none";
                previewImage.src = e.target.result;
                previewImage.style.display = "block";
                

               
            };

            reader.readAsDataURL(file);
        } else {
            previewImage.src = "";
            previewImage.style.display = "none";
        }
    });
})

