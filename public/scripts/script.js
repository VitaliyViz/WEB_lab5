let Ships = [];
let isSorted = false;
const originalOrder = [];

async function fetchShips() {
    try {
        const response = await fetch('http://localhost:5000/Ships');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        Ships = await response.json();
        originalOrder.push(...Ships.map(Ship => Ship.id));
        renderShipCards(Ships);
    } catch (error) {
        console.error('Fetch error: ', error);
    }
}

function renderShipCards(ships) {
    const container = document.getElementById('ship-data-container');
    container.innerHTML = '';
    ships.forEach(Ship => {
        const cardHTML = `
            <div class="card m-2 col-md-4 shadow-sm" id="ship-${Ship._id}">
                <div class="card-body">
                    <h5 class="card-title">${Ship.Name}</h5>
                    <p class="card-text">Weight: ${Ship.weight} tons</p>
                    <button class="btn btn-primary" onclick="editShip('${Ship._id}')">Edit</button>
                    <button class="btn btn-danger" onclick="deleteShip('${Ship._id}')">Delete</button>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', cardHTML);
    });
}

function calculateTotalWeight() {
    const total = Ships.reduce((sum, ship) => sum + ship.weight, 0);
    document.querySelector('.text-secondary').textContent = `Total weight: ${total} tons`;
}

function ShipSort() {
    if (!isSorted) {
        Ships.sort((a, b) => b.weight - a.weight);
    } else {
        resetShipsOrder();
    }
    isSorted = !isSorted;
    renderShipCards(Ships);
}

function resetShipsOrder() {
    Ships.sort((a, b) => originalOrder.indexOf(a.id) - originalOrder.indexOf(b.id));
}

function searchShips() {
    const searchInput = document.querySelector('input[type="search"]');
    const query = searchInput.value.toLowerCase();

    const filteredShips = Ships.filter(ship =>
        ship.name.toLowerCase().includes(query)
    );

    renderShipCards(filteredShips);
}

async function deleteShip(shipId) {
    try {
        const response = await fetch(`http://localhost:5000/Ships/${shipId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete the ship');
        }

        Ships = Ships.filter(ship => ship._id !== shipId);

        renderShipCards(Ships);
        calculateTotalWeight();
    } catch (error) {
        console.error('Delete error: ', error);
    }
}

function editShip(shipId) {
    window.location.href = `page/form.html?shipId=${shipId}`;
}

document.getElementById('calculate-summary-weight-btn').addEventListener('click', calculateTotalWeight);
document.getElementById('sort-by-weight-btn').addEventListener('change', ShipSort);
document.querySelector('input[type="search"]').addEventListener('input', searchShips);

fetchShips();
