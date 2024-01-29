var serverUrl = "141.145.202.202:3002"; 

document.addEventListener('DOMContentLoaded', function () {
    var homePageBody = document.getElementById('homePage');
    var homePageBtn = document.getElementById('homePageBtn');

    var userPageBody = document.getElementById('userPage');
    var userPageBtn = document.getElementById('userPageBtn');

    var settingsPageBody = document.getElementById('settingPage');
    var settingsPageBtn = document.getElementById('settingsPageBtn');

    var myModal = document.getElementById('myModal')

    var activePage = 'home'; // Track the active page

    homePageBtn.addEventListener('click', function (event) {
        if (activePage === 'home') {
            event.preventDefault(); // Prevent the default behavior of the link
            return;
        }

        loadingScreen.classList.toggle('loadingScreen-hide');
        fetch('./pages/home.html')
            .then(response => response.text())
            .then(data => {
                setTimeout(() => {
                    MainBody.innerHTML = data;
                    loadingScreen.classList.toggle('loadingScreen-hide');
                    setupHome();
                    activePage = 'home'; // Update the active page
                }, 300);
            });
    });

    userPageBtn.addEventListener('click', function (event) {
        if (activePage === 'user') {
            event.preventDefault(); // Prevent the default behavior of the link
            return;
        }

        loadingScreen.classList.toggle('loadingScreen-hide');
        fetch('./pages/user.html')
            .then(response => response.text())
            .then(data => {
                setTimeout(() => {
                    MainBody.innerHTML = data;
                    setupUserInfo();
                    loadingScreen.classList.toggle('loadingScreen-hide');
                    activePage = 'user'; // Update the active page
                }, 300);
            });
    });

    //MODAL SECTION
    settingsPageBtn.addEventListener('click', function (event) {
        if (activePage === 'settings') {
            event.preventDefault(); // Prevent the default behavior of the link
            return;
        }

        loadingScreen.classList.toggle('loadingScreen-hide');
        fetch('./pages/settings.html')
            .then(response => response.text())
            .then(data => {
                setTimeout(() => {
                    if (myModal.style.display == "block") {
                        myModal.style.display = "none";
                    }
                    MainBody.innerHTML = data;
                    loadingScreen.classList.toggle('loadingScreen-hide');
                    activePage = 'settings';
                }, 300);
            });
    });
});

var MainBody = document.getElementById('PagesBody');
var loadingScreen = document.getElementById('loadingScreen');

async function InitialSetup() {
    fetch('./pages/settings.html')
        .then(response => response.text())
        .then(data => {
            MainBody.innerHTML = data;
            setTimeout(() => {
                loadingScreen.classList.toggle('loadingScreen-hide');
                setupHome();
                activePage = 'home';
            }, 300);
        });
}

InitialSetup();
