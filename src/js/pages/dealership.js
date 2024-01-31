var response;

async function setupDealershipPage() {
    await getDealershipJson();
    CreateDynamicBoxes();
}

setupDealershipPage();

async function getDealershipJson() {
    var userdataURL = "http://141.145.202.202:3001/Dealership";
    const fetchOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    response = await fetch(userdataURL, fetchOptions);
    response = await response.json();
}

let timestampValue; 

function CreateDynamicBoxes() {
    Object.keys(response).forEach(function (category) {
        if (category === "timestamp") {
            // If the category is timestamp, save the value
            timestampValue = response[category];
            return;
        }

        // Skip if response[category] is not an array
        if (!Array.isArray(response[category])) {
            console.error("Invalid data structure for category:", category);
            return;
        }

        var dropdownContainer = document.createElement("div");
        dropdownContainer.classList.add("dropdown");
        var dropdownId = "dropdown" + (Object.keys(response).indexOf(category) + 1);
        dropdownContainer.id = dropdownId;
        dropdownContainer.setAttribute("onclick", "toggleDropdown('" + dropdownId + "')");

        var dropdownHeader = document.createElement("h3");
        dropdownHeader.innerHTML = category;
        var arrowIcon = document.createElement("i");
        arrowIcon.classList.add("fa-solid", "fa-arrow-down");
        dropdownHeader.appendChild(arrowIcon);

        var adropdownContainer = document.createElement("div");
        adropdownContainer.classList.add("adropdown");
        var adropdownId = "adropdown" + (Object.keys(response).indexOf(category) + 1);
        adropdownContainer.id = adropdownId;

        dropdownContainer.appendChild(dropdownHeader);
        dropdownContainer.appendChild(adropdownContainer);

        document.getElementById("dealershipInnerPage").appendChild(dropdownContainer);

        response[category].forEach(function (car) {
            var vehicleDiv = document.createElement("div");
            vehicleDiv.classList.add("vehicleDiv");

            var vehicleImage = document.createElement("img");
            vehicleImage.classList.add("vehicleImage");
            vehicleImage.src = car.Image;
            vehicleImage.alt = car.name + " " + car.model;

            var carNameHeader = document.createElement("h3");
            carNameHeader.innerHTML = car.name;

            var modelNameHeader = document.createElement("h6");
            modelNameHeader.innerHTML = "(" + car.model + ")";

            var carPriceParagraph = document.createElement("p");
            carPriceParagraph.innerHTML = FormatPrice(car.price);

            vehicleDiv.appendChild(vehicleImage);
            vehicleDiv.appendChild(carNameHeader);
            vehicleDiv.appendChild(modelNameHeader);
            vehicleDiv.appendChild(carPriceParagraph);

            adropdownContainer.appendChild(vehicleDiv);
        });
    });
}

function toggleDropdown(id) {
    var dropdown = document.getElementById("a" + id);

    setTimeout(function() {
        if (dropdown.style.display === "block") {
            dropdown.style.display = "none";
        } else {
            dropdown.style.display = "block";
        }
    }, 10);
}

function FormatPrice(price) {
    const formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(price);

    return formattedPrice;
}
