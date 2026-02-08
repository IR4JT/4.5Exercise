const API_KEY = "e05c0908da729885ae5030fb94d8e7aa";
const BASE_URL = "https://api.aviationstack.com/v1";

async function loadFlights() {
  const flightsContainer = document.getElementById("flights");

  try {
    const res = await fetch(
      `${BASE_URL}/flights?access_key=${API_KEY}&limit=5`
    );
    const data = await res.json();

    data.data.forEach(flight => {
      const card = document.createElement("div");
      card.className = "border rounded-lg p-4 bg-gray-50";

      card.innerHTML = `
        <p class="font-semibold">
          ${flight.airline?.name || "Unknown Airline"}
          (${flight.flight?.iata || "N/A"})
        </p>
        <p class="text-sm text-gray-600">
          ${flight.departure?.airport || "Unknown"} →
          ${flight.arrival?.airport || "Unknown"}
        </p>
        <p class="text-sm">
          Status: <span class="font-medium">${flight.flight_status || "N/A"}</span>
        </p>
      `;

      flightsContainer.appendChild(card);
    });
  } catch (error) {
    flightsContainer.innerHTML = "<p>Failed to load flights.</p>";
  }
}

async function loadAirports() {
  const airportsContainer = document.getElementById("airports");

  try {
    const res = await fetch(
      `${BASE_URL}/airports?access_key=${API_KEY}&limit=6`
    );
    const data = await res.json();

    data.data.forEach(airport => {
      const card = document.createElement("div");
      card.className = "border rounded-lg p-4 bg-gray-50";

      card.innerHTML = `
        <p class="font-semibold">${airport.airport_name || "Unknown Airport"}</p>
        <p class="text-sm text-gray-600">
          ${airport.city || "Unknown City"},
          ${airport.country_name || "Unknown Country"}
        </p>
        <p class="text-sm">
          IATA: <span class="font-medium">${airport.iata_code || "N/A"}</span>
        </p>
      `;

      airportsContainer.appendChild(card);
    });
  } catch (error) {
    airportsContainer.innerHTML = "<p>Failed to load airports.</p>";
  }
}

loadFlights();
loadAirports();