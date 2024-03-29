let figure;
let figureModal;
let figureModalArray = [];
let figureArray = [];
let index;
fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(data => {
        for (let i = 0; i < data.length; i++) {
            let gallery = document.querySelector('.gallery');

            figure = document.createElement('figure');
            const img = document.createElement('img');
            const figcaption = document.createElement('figcaption');
            
            img.src = data[i].imageUrl;
            img.alt = data[i].title;
            figcaption.innerText = data[i].title;

            figure.appendChild(img);
            figure.appendChild(figcaption);
            gallery.appendChild(figure);

            function getCategory(element) {
                return element.category.name;
            }

            let category = getCategory(data[i]);
            figure.setAttribute('data-category', category);

            figureArray.push(figure);
        }

        // création de l'objet
        let categories = new Set();
        data.forEach(element => {
            let category = getCategory(element);
            categories.add(category);
        });
    
        // création des boutons qui filtrent par catégorie
        const buttons = document.querySelector('.buttons');

        const buttonTous = document.createElement('button');
        buttonTous.setAttribute("type", "button");
        buttonTous.setAttribute("data-category", "Tous");
        buttonTous.innerText = "Tous";
        buttons.appendChild(buttonTous);
        buttonTous.addEventListener('click', function() {
            const gallery = document.querySelector('.gallery');
            const figures = gallery.querySelectorAll('figure');
            figures.forEach(figure => {
                figure.style.display = "block";
            });
        });

        categories.forEach(category => {
            const button = document.createElement('button');
            button.setAttribute('type', 'button');
            button.setAttribute('data-category', category);
            button.innerText = category;
            buttons.appendChild(button);
            button.addEventListener('click', function() {
                const gallery = document.querySelector('.gallery');
                const figures = gallery.querySelectorAll('figure');
                figures.forEach(figure => {
                    figure.style.display = (figure.getAttribute('data-category') === category || category === "tous") ? "block" : "none";
                });
            });
        });

        // connection authentification
        const logoutLien = document.querySelector("#logoutId");
            logoutLien.addEventListener("click", function () {
            localStorage.clear();
        });

        const isConnected = localStorage.getItem('connection');
            const gallery = document.querySelector('.gallery');
        if (isConnected == 'true') {
            document.querySelector("#loginId").style.display = "none";
            document.querySelector("#logoutId").style.display = "block";
           document.querySelector("#logoOuvrirModal1").style.display = "block";
           document.querySelector("#ouvrirModal1").style.display = "block";
           document.querySelector('.buttons').style.display = "none";
           document.getElementById("banniere").style.display = "block";
        
        } else {
            document.querySelector("#loginId").style.display = "block";
            document.querySelector("#logoutId").style.display = "none";
        };

        // ouverture de la 1ère modale
        const ouvrirModal1 = document.querySelector('#ouvrirModal1');
        const modal1 = document.querySelector('#modal1');
        const fermerModal1 = document.getElementById("fermerModal1");
        figureModalArray = [];
        const galleryModal = document.querySelector('.galleryModal');
        let deleteImg;
        
        data.forEach((element, index) => {
            const figureModal = document.createElement('figure');
            const imgModal = document.createElement('img');
            deleteImg = document.createElement('i');

            imgModal.src = element.imageUrl;
            imgModal.alt = element.title;

            figureModal.classList.add('gallery-item');
            figureModal.style.position = 'relative';
            deleteImg.classList.add('fas', 'fa-trash-alt');
            deleteImg.style.position = 'absolute';
            deleteImg.style.zIndex = '1';
            deleteImg.style.opacity = '1';
            deleteImg.style.fontSize = '4px';
            deleteImg.style.border = '2px solid black';
            deleteImg.style.top = '2px';
            deleteImg.style.right = '2px';
            deleteImg.style.borderRadius = '1px';
            deleteImg.style.backgroundColor = 'black';
            deleteImg.style.color = "white";

            galleryModal.appendChild(figureModal);
            figureModal.appendChild(imgModal);
            figureModal.appendChild(deleteImg);
     
            figureModalArray.push(figureModal);

        deleteImg.addEventListener('click', function() {
            event.preventDefault();
            const id = element.id;
            const token = localStorage.getItem("token");
            if (token) {
                fetch(`http://localhost:5678/api/works/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Accept': '*/*',
                        'Authorization': `Bearer ${token}`,
                    },
            })
            .then(response => {
                if (figureModal && galleryModal.contains(figureModal)) {
                    // Récupérer l'index de la figureModal dans figureModalArray
                    const modalIndex = figureModalArray.indexOf(figureModal);
                    // -1 est retourné quand l'élément n'est pas retrouvé
                    if (modalIndex !== -1) {
                        // Supprimer la figureModal de figureModalArray
                        figureModalArray.splice(modalIndex, 1);
                    }
    
                    // Supprimer la figureModal de la galerie modale
                    galleryModal.removeChild(figureModal);
    
                    // Supprimer la figure correspondante de la galerie principale
                    if (modalIndex !== -1) {
                        const figureToRemove = figureArray[modalIndex];
                        if (figureToRemove) {
                            // Supprimer la figure de figureArray
                            figureArray.splice(modalIndex, 1);
    
                            // Supprimer la figure de la galerie principale
                            if (gallery.contains(figureToRemove)) {
                                gallery.removeChild(figureToRemove);
                            }
                        }
                    }
                } else {
                    alert("le noeud enfant n existe pas");
                }
            })
            
        }
    });
});

        fermerModal1.addEventListener("click", function() {
            event.preventDefault();
            modal1.style.display = "none";
        });

        ouvrirModal1.addEventListener('click', function() {
            modal1.style.display = "block";
        });
        const modalWrapper = document.querySelector('.modal-wrapper');
        modal1.addEventListener('click', function(event) {
            // Vérifier si la modal est ouverte
            if (modal1.style.display === "block") {
                // Vérifier si le clic n'est pas à l'intérieur de la modal
                if (!modalWrapper.contains(event.target)) {
                    // Fermer la modal en changeant sa propriété display à "none"
                    modal1.style.display = "none";
                }
            }
        });
        function getCategory(element) {
            return element.category.name;
        }
    });

        // ouverture de la 2ème modale
        const ouvrirModal2 = document.querySelector('#ouvrirModal2');
        const flecheModal2 = document.getElementById('flecheModal2');
        const fermerModal2 = document.getElementById('fermerModal2');

        if (ouvrirModal2) {
            ouvrirModal2.addEventListener('click', function() {
                modal2.style.display = "block";
            });
        }
        
        flecheModal2.addEventListener('click', function() {
            modal2.style.display = "none"; 
            modal1.style.display = "block";
        })
        fermerModal2.addEventListener('click', function() {
            modal2.style.display = "none"; 
            modal1.style.display = "block";
        })
        const modalWrapper2 = document.querySelector('.modal-wrapper2');
        modal2.addEventListener('click', function(event) {
            // Vérifier si la modal est ouverte
            if (modal2.style.display === "block") {
                // Vérifier si le clic n'est pas à l'intérieur de la modal
                if (!modalWrapper2.contains(event.target)) {
                    // Fermer la modal en changeant sa propriété display à "none"
                    modal2.style.display = "none";
                    modal1.style.display = "none";
                }
            }
        });

        // modal2.addEventListener('click', function() {
        //     modal2.style.display = "none";
        //     modal1.style.display = "none";
        // })

        formulaireModal2.addEventListener('submit', function(event) {
            event.preventDefault();
            const formulaireModal2 = document.getElementById('formulaireModal2');

            const titreModal2 = document.getElementById('titreModal2').value;
            
            // Récupérer l'élément <select>
            const selectElement = document.getElementById('categoryModal2');
            // Récupérer l'option sélectionnée
            const selectedOption = selectElement.options[selectElement.selectedIndex];
            // Récupérer la valeur (entier) de l'option sélectionnée
            const categorieModal2 = selectedOption.value;
            // Récupérer le texte de l'option sélectionnée
            const selectedOptionText = selectedOption.innerText;

            // Réinitialisation de la sélection
            selectElement.selectedIndex = 0;
        
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
                    'Accept': '*/*',
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            })
            .then(response => response.json())
            .then(element => {
                //ajout sur la page d'accueil
                const gallery = document.querySelector('.gallery');

                const figure = document.createElement('figure');
                const title = document.createElement('figcaption');
                const category = document.createElement('category');
                const img = document.createElement('img');
        
                title.innerText = titreModal2;
                img.src = element.imageUrl;
                img.alt = element.title;
                
                // Utiliser le texte de l'option sélectionnée comme attribut de données
                figure.setAttribute('data-category', selectedOptionText);
        
                figure.appendChild(img);
                figure.appendChild(title);
                gallery.appendChild(figure);
                figureArray.push(figure);
        
                //ajout dans la modal1
                const galleryModal = document.querySelector('.galleryModal');
                const figureModal = document.createElement('figure');
        
                const imgModal = document.createElement('img');
                const deleteImg = document.createElement('i');
        
                imgModal.src = element.imageUrl;
                imgModal.alt = titreModal2;
                
                // Utiliser le texte de l'option sélectionnée comme attribut de données
                figureModal.setAttribute('data-category', selectedOptionText);
        
                figureModal.appendChild(imgModal);
                galleryModal.appendChild(figureModal);
                figureModal.appendChild(deleteImg);
                figureModalArray.push(figureModal);

                figureModal.classList.add('gallery-item');
                figureModal.style.position = 'relative';
                deleteImg.classList.add('fas', 'fa-trash-alt');
                deleteImg.style.position = 'absolute';
                deleteImg.style.zIndex = '1';
                deleteImg.style.opacity = '1';
                deleteImg.style.fontSize = '4px';
                deleteImg.style.border = '2px solid black';
                deleteImg.style.top = '2px';
                deleteImg.style.right = '2px';
                deleteImg.style.borderRadius = '1px';
                deleteImg.style.backgroundColor = 'black';
                deleteImg.style.color = "white";

                deleteImg.addEventListener('click', function() {
                    event.preventDefault();
                    const id = element.id;
                    const token = localStorage.getItem("token");
                    if (token) {
                        fetch(`http://localhost:5678/api/works/${id}`, {
                            method: 'DELETE',
                            headers: {
                                'Accept': '*/*',
                                'Authorization': `Bearer ${token}`,
                            },
                    })
                    .then(response => {
                        if (figureModal && galleryModal.contains(figureModal)) {
                            // Récupérer l'index de la figureModal dans figureModalArray
                            const modalIndex = figureModalArray.indexOf(figureModal);

                            // -1 est retourné quand l'élément n'est pas retrouvé
                            if (modalIndex !== -1) {
                                // Supprimer la figureModal de figureModalArray
                                figureModalArray.splice(modalIndex, 1);
                            }
            
                            // Supprimer la figureModal de la galerie modale
                            galleryModal.removeChild(figureModal);

                            // Supprimer la figure correspondante de la galerie principale
                            if ((modalIndex !== -1) && figure && gallery.contains(figure)) {
                                const figureToRemove = figureArray[modalIndex];

                                if (figureToRemove) {
                                    // Supprimer la figure de figureArray
                                    figureArray.splice(modalIndex, 1);
            
                                    // Supprimer la figure de la galerie principale
                                    if (gallery.contains(figureToRemove)) {
                                        gallery.removeChild(figureToRemove);
                                    }
                                }
                            }
                        } else {
                            alert("le noeud enfant n existe pas");
                        }
                    })
                }
            });
            formulaireModal2.reset();
            const redirection = "index.html";
            window.location.href = redirection;
            })
            .catch(error => {
                alert('Réponse complète du serveur:', error.response);
            });            
        })

// Chargement de l'image
// au chargement du contenu
document.addEventListener("DOMContentLoaded", function () {
    const imageInput = document.getElementById("image");
    const previewImage = document.getElementById("previewImage");
    const previewImageContainer = document.getElementById("previewImageContainer");
    const iconImage = document.querySelector('.fa-regular.fa-image');

    if (imageInput) {
        imageInput.addEventListener("change", function () {
            const file = imageInput.files[0];

            if (file) {
                // quand le fichier est selectionné, objet fileReader est crée => permet de lire son contenu
                const reader = new FileReader();

                reader.onload = function (e) {
                    iconImage.style.display = "none";
                    previewImage.src = e.target.result;
                    previewImage.style.display = "block";
                };

                // méthode de reader qui permet la lecture d'un contenu de fichier sous forme d'URL
                reader.readAsDataURL(file);
            } else {
                previewImage.style.display = "none";
            }
        });
    }
 });
