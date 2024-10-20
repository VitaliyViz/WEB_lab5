let form = document.getElementById("createForm");
let submitButton = document.getElementById("submit-button");
let formTitle = document.getElementById("form-title");
let shipIdToEdit = null;

let showAlert = (message, type = 'warning') => {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show fixed-bottom w-75`;
    alertDiv.style.bottom = '0';
    alertDiv.style.left = '50%';
    alertDiv.style.transform = "translateX(-50%)";
    alertDiv.style.zIndex = '1050';

    alertDiv.innerHTML = `
        <div class="container">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;

    document.body.appendChild(alertDiv);

    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
};

let createShip = (data) => {
    fetch("http://localhost:5000/ships", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(data => {
            if (data._id) {
                showAlert("Корабель успішно створено", "success");
                form.reset();
            } else {
                showAlert("Виникла помилка при створенні корабля", "warning");
            }
        })
        .catch(e => {
            console.error(e);
            showAlert(`Виникла помилка: ${String(e)}`, "error");
        });
};

function updateShip(shipId, data) {
    fetch(`http://localhost:5000/ships/${shipId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(updatedShip => {
            showAlert('Корабель успішно оновлено', 'success');
            form.reset();
            shipIdToEdit = null;
        })
        .catch(e => {
            console.error(e);
            showAlert(`Помилка при оновленні корабля: ${String(e)}`, 'error');
        });
}

window.addEventListener('DOMContentLoaded', (event) => {
    const params = new URLSearchParams(window.location.search);
    const shipId = params.get('shipId');

    if (shipId) {
        fetch(`http://localhost:5000/ships/${shipId}`)
            .then(response => response.json())
            .then(ship => {
                document.getElementById('name-ship').value = ship.Name;
                document.getElementById('weight').value = ship.weight;

                shipIdToEdit = shipId;
            })
            .catch(error => console.error('Error fetching ship data:', error));
    }
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let formData = new FormData(form);
    const shipData = {
        Name: formData.get('name'),
        weight: Number(formData.get('weight'))
    };

    if (shipIdToEdit) {
        updateShip(shipIdToEdit, shipData);
    } else {
        createShip(shipData);
    }
});
