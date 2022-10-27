const infoText = document.querySelectorAll(".infoText");
let inputValue = document.querySelector(".inputValue");
const searchBtn = document.querySelector(".search-btn");

const apiKey = "at_8L1PYQbGQim9CFqSsWifniWWNS5pR";

function initializedMap() {
  map = L.map("map").setView([0, 0], 13);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
  L.marker([0, 0]).addTo(map);
}

initializedMap();
async function getUserIp(ipOrDomain) {
  const reponse = await fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=at_8L1PYQbGQim9CFqSsWifniWWNS5pR&ipAddress=${
      ipOrDomain ? ipOrDomain : ""
    }&domain=${ipOrDomain ? ipOrDomain : ""}`
  );
  const data = await reponse.json();
  return data;
}

setUserData(getUserIp());

async function setUserData(userData) {
  const {
    ip,
    location: { country, timezone, lat, lng },
    isp,
  } = await userData;

  infoText.forEach((text) => {
    if (text.classList.contains("ipAddress")) document.querySelector(".ipAddress").textContent = ip;
    if (text.classList.contains("country")) document.querySelector(".country").textContent = country;
    if (text.classList.contains("timezone")) document.querySelector(".timezone").textContent = timezone;
    if (text.classList.contains("isp")) document.querySelector(".isp").textContent = isp;
  });
  map.setView([lat, lng], 13);
  L.marker([lat, lng]).addTo(map);
}

searchBtn.addEventListener("click", async () => {
  if (!inputValue.value) return;
  const data = getUserIp(inputValue.value);
  setUserData(data);
});
