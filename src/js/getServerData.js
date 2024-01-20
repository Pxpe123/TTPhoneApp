async function getServerData(endpointName, serverType, serverText, container) {
    try {
        var endpointData = await GetEndpointName(endpointName, serverType, serverText, container);

        if (endpointData) {
            console.log(endpointData);

            var { dxp, uptime } = endpointData.server;
            var { players } = endpointData; // Corrected this line
            console.log(container);
            console.log(players.length); // Corrected this line
            console.log(uptime);
            console.log(dxp);

            updateUI(container, players.length, uptime, dxp);
        }
    } catch (error) {
        console.error('Error in getServerData:', error);
    }
}

function updateUI(container, players, uptime, dxp) {
    const playersText = document.querySelector(`#${container}Players`);
    const uptimeText = document.querySelector(`#${container}Uptime`);
    const dxpText = document.querySelector(`#${container}DXP`);

    playersText.innerText = `Players: ${players}`;
    uptimeText.innerText = `Uptime: ${uptime}`;

    if (dxp[0] !== false) {
        const dxpTimeSec = dxp[2] + dxp[3];
        const dxpTime = formatTime(dxpTimeSec);
        const dxpHost = dxp[1];

        dxpText.innerText = `Dxp: ${dxpTime} (${dxpHost})`;
    } else {
        dxpText.innerText = `Dxp: Inactive`;
    }

    const test = document.getElementById('ServerData-Title')
    if (test) {
        console.log("123")
    }
}

async function getAllServerData() {
    await getServerData("Main.Serverplayers", "none", "", "Main");
    await getServerData("Main.Serverplayers", "none", "", "Beta"); // Corrected this line
}

function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);

    const formattedHours = hours > 0 ? `${hours}h ` : '';
    const formattedMinutes = minutes > 0 ? `${minutes}m` : '';

    return formattedHours + formattedMinutes;
}

const maxLoops = 1;
let loopCount = 0;

const intervalId = setInterval(() => {
    getAllServerData();
    loopCount++;

    if (loopCount >= maxLoops) {
        clearInterval(intervalId);
    }
}, 1000);