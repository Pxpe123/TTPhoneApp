
const config = 'assets/configs/config.json'
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const baseUrl1 = 'https://tycoon-';
const baseUrl2 = '.users.cfx.re';

let userID;

fetch(config)
.then(response => {
    if (!response.ok) {
      throw new Error(`Failed to fetch config (${response.status} ${response.statusText})`);
    }
    return response.json(); // This returns another promise
  })
  .then(json => {
    console.log(json); // Now you can work with the JSON data
  })
  .catch(error => {
    console.error('Error fetching config:', error);
  });


var keynames = "assets/configs/keynames.json";

var privatekey;
var publickey;

var debugMode = false;

GetTycoonKey(privatekey);
GetTycoonKey(publickey);

function GetEndpointName(dataPath, keytype, discordID, server) {
    if (debugMode) {
        return;
    }
    if (keynames) {
        return fetch(keynames)
            .then(response => response.json())
            .then(data => {
                const pathParts = dataPath.split('.');
                
                let currentData = data;
                for (const part of pathParts) {
                    currentData = currentData[part];
                    if (!currentData) {
                        console.error(`Invalid data path: ${dataPath}`);
                        return null;
                    }
                }
                
                if (currentData.includes("${userID}")) {
                    if (config) {
                        return fetch(config)
                            .then(response => response.json())
                            .then(data => {
                                if (data.userID != "") {
                                    userID = data.userID;
                                    currentData = currentData.replace(/\${userID}/g, userID);
                                } else {
                                    currentData = currentData.replace(/\${userID}/g, discordID);
                                }

                                return GetData(currentData, keytype, server);
                            })
                            .catch(error => {
                                console.error('Error fetching config:', error);
                                return null;
                            });
                    }                 
                }     
                if (currentData.includes("${discordID}")) {
                    if (config) {
                        return fetch(config)
                            .then(response => response.json())
                            .then(data => {
                                currentData = currentData.replace(/\${discordID}/g, discordID);

                                return GetData(currentData, keytype, server);
                            })
                            .catch(error => {
                                console.error('Error fetching config:', error);
                                return null;
                            });
                    }                 
                }         

                return GetData(currentData, keytype, server);
            })
            .catch(error => {
                console.error('Error fetching config:', error);
                return null;
            });
    }
}

async function GetData(type, keytype, server) {
    if (privatekey === undefined || privatekey === "") {
        privatekey = await GetTycoonKey(privatekey);
        publickey = await GetTycoonKey(publickey);
    }

    if (keytype === "public") {
        key = publickey;
    } else if (keytype === "private") {
        key = privatekey;
    } else if (keytype === "none") {
        key = "";
    } else {
        key = privatekey;
    }

    let headerData;

    switch (keytype) {
        case "private":
            headerData = { 'X-Tycoon-Key': key };
            break;
        case "public":
            headerData = { 'X-Tycoon-Public-Key': key };
            break;
        default:
            headerData = { 'X-Tycoon-Key': key };
            break;
    }

    if (server == "Main") {
        server = "2epova";
    } else if (server == "Beta") {
        server = "njyvop";
    } else {
        server = "2epova";
    }

    const url = proxyUrl + baseUrl1 + server + baseUrl2 + type;

    try {
        const response = await fetch(baseUrl1 + server + baseUrl2 + type, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch data (${response.status} ${response.statusText})`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error in GetData:', error);
        return null;
    }
}
function GetTycoonKey(type) {
    if (config) {
        return fetch(config)
            .then(response => response.json())
            .then(data => {
                privatekey = data.privatekey;
                publickey = data.publickey;
                console.log(privatekey)
                console.log(publickey)
                return type;
            })
            .catch(error => {
                console.error('Error fetching config:', error);
                return null;
            });
    }
}

function PageInit() {
    GetEndpointName("Main.SkillOfTheDay", "private")
        .then(endpointData => {
            if (endpointData) {
                
                var SOTDText = document.getElementById('SOTDText');
                var skill = endpointData.skill;
                var per = endpointData.bonus;

                console.log("SOTD: " + skill + ' ' + per + "%");
            }
        })
        .catch(error => {
            console.error('Error in PageInit:', error);
        });
}