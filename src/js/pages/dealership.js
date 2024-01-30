// Updated JavaScript to handle dynamically loaded content
document.addEventListener('click', function (event) {
    // Check if the clicked element is inside a dropdown
    const dropdown = event.target.closest('.dropdown');

    if (dropdown) {
        const dropdownContent = dropdown.querySelector('.dropdown-content');
        dropdownContent.style.display = (dropdownContent.style.display === 'none' || dropdownContent.style.display === '') ? 'block' : 'none';
    }
});


async function setupDealershipPage() {
    await getDealershipJson()
}

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

function CreateDynamicBoxes() {

}

