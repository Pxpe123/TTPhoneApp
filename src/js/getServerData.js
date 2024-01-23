async function getServerData(endpointName, serverType, serverText, container) {
    try {
        const endpointData = await GetEndpointName(endpointName, serverType, serverText, container);

        if (endpointData) {
            console.log(endpointData);

            const dxp = endpointData.server.dxp;

            const players = endpointData.players.length;
            const uptime = endpointData.server.uptime;

            updateUI(container, players, uptime, dxp);
        }
    } catch (error) {
        console.error('Error in getServerData:', error);
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


let loopCount = 0;
const maxLoops = 1;

const intervalId = setInterval(() => {
    getAllServerData();
    
    loopCount++;

    if (loopCount >= maxLoops) {
        clearInterval(intervalId);
    }
}, 1000);


function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const formattedHours = hours > 0 ? `${hours}h ` : '';
    const formattedMinutes = minutes > 0 ? `${minutes}m` : '';

    return formattedHours + formattedMinutes;
}

