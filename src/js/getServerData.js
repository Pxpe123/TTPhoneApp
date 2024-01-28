async function getServerData(endpointName, serverType, serverText, container) {
    const endpointData = await FetchData(container);

    console.log(endpointData);

    // Check if the 'server' property and 'dxp' property exist in endpointData
    if (endpointData && endpointData.server && endpointData.server.dxp) {
        const dxp = endpointData.server.dxp;
        console.log(dxp);

        const players = endpointData.players.length;
        const uptime = endpointData.server.uptime;

        updateUI(container, players, uptime, dxp);
    } else if (endpointData.offlineTimestamp) {
        console.log('ServerOffline: ', endpointData.offlineTimestamp);
    }
     else {
        console.error('Invalid data format:', endpointData);
    }
}

function updateUI(container, players, uptime, dxp) {
    const playersText = document.querySelector(`#${container}Players`);
    const uptimeText = document.querySelector(`#${container}Uptime`);

    playersText.innerText = `Players: ${players}`;
    uptimeText.innerText = `Uptime: ${uptime}`;

    if (dxp[0] != false) {
        const dxpText = document.querySelector(`#${container}DXP`);
        var dxpTimeSec = dxp[2] + dxp[3];
        var dxpTime = formatTime(dxpTimeSec);
        var dxpHost = dxp[1]
        dxpText.innerText = `Dxp: ${dxpTime} (${dxpHost})`;
    }
    else {
        const dxpText = document.querySelector(`#${container}DXP`);

        dxpText.innerText = `Dxp: Inactive`
    }
}

async function getAllServerData() {
    await getServerData("Main.Serverplayers", "none", "", "Main");
    await getServerData("Main.Serverplayers", "none", "", "Beta");
}

async function FetchData(Server) {
    const apiUrl = `http://${server}:3001/ServerData`;
    const fetchOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Server': Server
        }
    };

    const response = await fetch(apiUrl, fetchOptions);

    if (response.ok) {
        const responseData = await response.json();
        return responseData;
    } else {
        console.error('Failed to fetch data:', response.statusText);
        return null;
    }
}

const intervalId = setInterval(() => {
    getAllServerData();
}, 4 * 60 * 1000);

getAllServerData();

function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const formattedHours = hours > 0 ? `${hours}h ` : '';
    const formattedMinutes = minutes > 0 ? `${minutes}m` : '';

    return formattedHours + formattedMinutes;
}