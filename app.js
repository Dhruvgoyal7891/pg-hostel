document.addEventListener("DOMContentLoaded", () => {
  const pgList = document.getElementById("pgList");
  const searchInput = document.getElementById("searchInput");

  fetch("data/pgs.json")
    .then(res => res.json())
    .then(data => {
      displayPGs(data);

      searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        const filtered = data.filter(pg =>
          pg.name.toLowerCase().includes(query) ||
          pg.location.toLowerCase().includes(query)
        );
        displayPGs(filtered);
      });
    });

  function displayPGs(pgs) {
    pgList.innerHTML = "";
    pgs.forEach(pg => {
      const col = document.createElement("div");
      col.className = "col-md-4";
      col.innerHTML = `
        <div class="card h-100">
          <img src="${pg.image}" class="card-img-top" alt="${pg.name}">
          <div class="card-body">
            <h5 class="card-title">${pg.name}</h5>
            <p class="card-text">📍 ${pg.location}</p>
            <p class="card-text">💰 ₹${pg.price}/month</p>
            <button class="btn btn-primary" onclick="showDetails('${pg.name}','${pg.location}',${pg.price},'${pg.image}')">View Details</button>
          </div>
        </div>`;
      pgList.appendChild(col);
    });
  }

  window.showDetails = (name, location, price, image) => {
    document.getElementById("pgTitle").innerText = name;
    document.getElementById("pgLocation").innerText = location;
    document.getElementById("pgPrice").innerText = price;
    document.getElementById("pgImage").src = image;
    new bootstrap.Modal(document.getElementById("pgModal")).show();
  };
});
