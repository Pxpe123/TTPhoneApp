var serverUrl = "141.145.202.202:3002"; 

document.addEventListener('DOMContentLoaded', function () {
    var homePageBody = document.getElementById('homePage');
    var homePageBtn = document.getElementById('homePageBtn');

    var userPageBody = document.getElementById('userPage');
    var userPageBtn = document.getElementById('userPageBtn');

    homePageBtn.addEventListener('click', function () {
        loadingScreen.classList.toggle('loadingScreen-hide');
        fetch('./pages/home.html')
            .then(response => response.text())
            .then(data => {
                setTimeout(() => {
                    MainBody.innerHTML = data;
                    loadingScreen.classList.toggle('loadingScreen-hide');
                    setupHome();
                }, 300);
            });
    });

    userPageBtn.addEventListener('click', function () {
        loadingScreen.classList.toggle('loadingScreen-hide');
        fetch('./pages/user.html')
            .then(response => response.text())
            .then(data => {
                setTimeout(() => {
                    MainBody.innerHTML = data;
                    loadingScreen.classList.toggle('loadingScreen-hide');
                }, 300);
            });
    });
});

var MainBody = document.getElementById('PagesBody')
var loadingScreen = document.getElementById('loadingScreen')

async function InitialSetup() {
    fetch('./pages/home.html')
    .then(response => response.text())
    .then(data => {
        MainBody.innerHTML = data;
        setTimeout(() => {
            loadingScreen.classList.toggle('loadingScreen-hide');
            setupHome();
        }, 300);
    });
}
InitialSetup()