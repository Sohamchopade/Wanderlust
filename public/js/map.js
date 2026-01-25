 document.addEventListener("DOMContentLoaded", () => {
  const mapDiv = document.getElementById("map");
  if (!mapDiv) return;

  const mapCoords = JSON.parse(mapDiv.dataset.coords);
  const mapTitle = mapDiv.dataset.title;

  const lat = Number(mapCoords[1]);
  const lng = Number(mapCoords[0]);

  const map = L.map("map").setView([lat, lng], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);

  const marker = L.marker([lat, lng], { zIndexOffset: 1000 }).addTo(map);

  marker.on("click", () => {
    marker.bindPopup(
      `<strong>${mapTitle}</strong><br/>Exact location provided after booking`
    ).openPopup();
  });

  //   IMPORTANT: fix Bootstrap layout issue
  setTimeout(() => {
    map.invalidateSize();
  }, 200);
});
