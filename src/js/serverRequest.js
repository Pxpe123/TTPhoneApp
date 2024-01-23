const server = "141.145.202.202";

var mainOnline = false;
var betaOnline = false;

function getServerAlive() {
    const apiUrl = `http://${server}:3001/ServerAlive.json`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('ServerAlive response:', data);
            var mainStatus = data.main;
            var betaStatus = data.beta;

            mainOnline = mainStatus === "online";
            betaOnline = betaStatus === "online";

            toggleLed(mainOnline, betaOnline);
         })
        .catch(error => {
            console.error('Error:', error.message);
        });
}2

function setupHome() {
    getServerAlive();
    setTimeout(getServerAlive, 150000); // Refresh every 2.5 minutes (150,000 milliseconds)
}

setupHome();
