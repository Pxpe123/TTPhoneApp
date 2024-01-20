function toggleSidebar() {
    const sidebar = document.querySelector('.sidenav');
    const menuBtn = document.querySelector('.menu-btn');
    
    sidebar.classList.toggle('sidenav-closed');
    menuBtn.classList.toggle('menu-btn-shifted');
}

