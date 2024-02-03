async function setupServerPage() {
  await ServerHtml();
}

var listDiv;

async function ServerHtml() {
  const apiUrl = `http://${server}:3001/getServerHTML`;
  const fetchOptions = {
    method: "GET",
    headers: {
      "Content-Type": "text/html",
    },
  };

  try {
    var mainServerBody = document.getElementById("mainServerBody");
    const response = await fetch(apiUrl, fetchOptions);
    const serverHTML = await response.text();
    mainServerBody.innerHTML = serverHTML;
    listDiv = document.getElementById("MainPlayerList");
    listDiv.style.display = "none";
  } catch (error) {
    console.error("Error fetching server HTML:", error);
  }
}

function toggleServerDropdown() {
  listDiv = document.getElementById("MainPlayerList");
  if (listDiv.style.display === "none") {
    listDiv.style.display = "";
  } else {
    listDiv.style.display = "none";
  }
}
