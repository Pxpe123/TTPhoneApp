function toggleSidebar() {
    const sidebar = document.querySelector('.sidenav');
    const menuBtn = document.querySelector('.menu-btn');
    
    sidebar.classList.toggle('sidenav-closed');
    menuBtn.classList.toggle('menu-btn-shifted');
}

function toggleLed(mainOnline, betaOnline) {
  const mainLed = document.querySelector('.mainLed');
  const betaLed = document.querySelector('.betaLed');

  mainLed.classList.toggle('Led-checked', mainOnline);
  betaLed.classList.toggle('Led-checked', betaOnline);
}
