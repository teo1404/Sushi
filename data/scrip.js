// Cargar el menú desde JSON y aplicar filtros
let dishesData = [];

fetch('menu.json')
    .then(response => response.json())
    .then(data => {
        dishesData = data.dishes;  // Guardar los datos para usar en los filtros
        displayMenu(dishesData);   // Mostrar el menú completo al inicio
    })
    .catch(error => console.error('Error al cargar el menú:', error));

// Mostrar el menú filtrado por categoría
function displayMenu(dishes) {
    const menuSection = document.querySelector('.dishes');
    menuSection.innerHTML = ''; // Limpiar el contenido

    dishes.forEach(dish => {
        const dishCard = document.createElement('div');
        dishCard.classList.add('dish-card');
        
        dishCard.innerHTML = `
            <img src="${dish.image}" alt="${dish.name}">
            <h3>${dish.name}</h3>
            <p>${dish.description}</p>
        `;

        menuSection.appendChild(dishCard);
    });
}

// Filtrar el menú según la categoría seleccionada
const filterButtons = document.querySelectorAll('#menu-filters button');

filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        const category = this.getAttribute('data-category');

        // Remover la clase 'active' de todos los botones y agregarla al botón seleccionado
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        // Filtrar los platos según la categoría
        if (category === 'ALL') {
            displayMenu(dishesData);  // Mostrar todos los platos
        } else {
            const filteredDishes = dishesData.filter(dish => dish.category === category);
            displayMenu(filteredDishes);
        }
    });
});
