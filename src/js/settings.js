function openMinDxpPopup() {
    document.getElementById('minDxpOverlay').style.display = 'block';
    document.getElementById('minDxpPopup').style.display = 'block';
}

function closeMinDxpPopup() {
    document.getElementById('minDxpOverlay').style.display = 'none';
    document.getElementById('minDxpPopup').style.display = 'none';
}


function setMinDxpSetting(hours, minutes) {
    const minDxpSetting = document.getElementById('minDxpSetting');
    minDxpSetting.innerText = `Set for ${hours} hours ${minutes} minutes`;
}