const infoText = document.querySelectorAll(".infoText");
const inputValue = document.querySelector(".inputValue");
const searchBtn = document.querySelector(".search-btn");

const apiKey = "at_8L1PYQbGQim9CFqSsWifniWWNS5pR";
var map;
function initializedMap() {
  map = L.map("map").setView([51.505, -0.09], 13);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
  L.marker([51.5, -0.09]).addTo(map);
}

initializedMap();
async function getUserIp(ipOrDomain) {
  try {
    const reponse = await fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ipOrDomain ? ipOrDomain : ""}&domain=${
        ipOrDomain ? ipOrDomain : ""
      }`
    );
    const data = await reponse.json();
    return data;
  } catch (error) {
    throw error;
  }
}

async function setUserData(userData) {
  try {
    const {
      ip,
      location: { country, timezone, lat, lng },
      isp,
    } = userData;
    infoText.forEach((text) => {
      if (text.classList.contains("ipAddress")) document.querySelector(".ipAddress").textContent = ip;
      if (text.classList.contains("country")) document.querySelector(".country").textContent = country;
      if (text.classList.contains("timezone")) document.querySelector(".timezone").textContent = timezone;
      if (text.classList.contains("isp")) document.querySelector(".isp").textContent = isp;
    });
    map.flyTo([lat, lng], 11);
    L.marker([lat, lng]).addTo(map);
  } catch (error) {
    throw error;
  }
}

searchBtn.addEventListener("click", async (e) => {
  try {
    e.preventDefault();
    inputValue.classList.remove("wrong-search");
    if (!inputValue.value) return;
    const data = await getUserIp(inputValue.value);
    if (data.code === 422) inputValue.classList.add("wrong-search");
    setUserData(data);
    inputValue.value = "";
  } catch (error) {
    console.log(error);
  }
});
