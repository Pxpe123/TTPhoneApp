var playerOnline = false;
var playerName;
var playerId;
var playerIcon;
var playerStatus = "Offline";

var response;

window.token = "fM2KBxCrQ8qtFjUe3bqqij:APA91bFZqWXNgO6kcQAnEnV_TCEeadIrEv4Ikx-nlUo4vFz4wChtCyaY0tAZ324KkDMtbi0aicVIWxrwtpXMf4ro3ipsWkQZfDu8haTEAhKvL8xoNGq9CXvzPEibNUkcTGSK0dO76MmW"

async function setupUserInfo() {
    await getUserData()
    setUserData()
    togglePlayerLed(playerOnline)
}

function togglePlayerLed(playerOnline) {
    const playerLed = document.querySelector('.playerLed');
  
    playerLed.classList.toggle('Led-checked', playerOnline);
}

async function getUserData() {
    var userdataURL = "http://141.145.202.202:3001/get-accountdata";
    const fetchOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'userToken': window.token
        }
    };
    response = await fetch(userdataURL, fetchOptions);
    response = await response.json(); // Await the JSON parsing
    console.log(response);
}

function setUserData() {
    const userInfoText = document.getElementById('userInfoText');
    const userIcon = document.getElementById('user-icon');
    const userIdText = document.getElementById('playerUserId')
    playerId = response.userId;
    playerName = response.userData.UserName;
    playerIcon = response.userData.playerIcon;

    //userInfoText.innerText = playerStatus + " | "+ playerName;
    userIcon.src = playerIcon;
    userIdText.innerText = "UserID: " + playerId
}
