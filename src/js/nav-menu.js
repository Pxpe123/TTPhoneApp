const list = document.querySelectorAll(".list");
var setupCompleted = false;

function activeLink() {
  list.forEach((item) => item.classList.remove("active"));
  this.classList.add("active");
}
list.forEach((item) => item.addEventListener("click", activeLink));

document.addEventListener('DOMContentLoaded', function () {
    var moreListItem = document.getElementById('moreListItem');
    var modal = document.getElementById('myModal');
    var closeModal = document.getElementById('closeModal');
    var hapticTestButton = document.getElementById('hapticTest');

    moreListItem.addEventListener('click', function (event) {
        event.preventDefault();
        modal.style.display = 'block';
    });

    closeModal.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});