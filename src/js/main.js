const serverUrl = "141.145.202.202:3002";
const MainBody = document.getElementById('PagesBody');
const loadingScreen = document.getElementById('loadingScreen');
const myModal = document.getElementById('myModal');

const pages = {
    'home':       { btn: document.getElementById('homePageBtn'),       path: './pages/home.html',           setup: setupHome },
    'user':       { btn: document.getElementById('userPageBtn'),       path: './pages/user.html',           setup: setupUserInfo },
    'server':     { btn: document.getElementById('serverPageBtn'),     path: './pages/server.html',         setup: null },
    'storage':    { btn: document.getElementById('storagePageBtn'),    path: './pages/storage.html',        setup: null },
    'dealership': { btn: document.getElementById('dealershipPageBtn'), path: './pages/dealership.html',     setup: setupServerPage },    
    'settings':   { btn: document.getElementById('settingsPageBtn'),   path: './pages/modal/settings.html', setup: null }
};

let activePage = 'home';
 
function loadPage(page) {
    if (activePage === page) {
        event.preventDefault();
        return;
    }

    loadingScreen.classList.toggle('loadingScreen-hide');
    fetch(pages[page].path)
        .then(response => response.text())
        .then(data => {
            setTimeout(() => {
                if (myModal.style.display == "block") {
                    myModal.style.display = "none";
                }
                MainBody.innerHTML = data;
                loadingScreen.classList.toggle('loadingScreen-hide');
                if (pages[page].setup) {
                    pages[page].setup();
                }
                activePage = page;
            }, 300);
        });
}

function setupPageListeners() {
    for (const page in pages) {
        pages[page].btn.addEventListener('click', event => loadPage(page));
    }
}

document.addEventListener('DOMContentLoaded', function () {
    setupPageListeners();
    InitialSetup();
});

async function InitialSetup() {
    try {
        const response = await fetch(pages.home.path);
        const data = await response.text();
        MainBody.innerHTML = data;
        await new Promise(resolve => setTimeout(resolve, 300));
        loadingScreen.classList.toggle('loadingScreen-hide');
        setupHome();
        activePage = 'home';
    } catch (error) {
        console.error("Error during InitialSetup:", error);
    }
}
