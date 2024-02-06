const db = firebase.database();
const jagdstaendeListe = document.getElementById("jagdstaende");
const addStandBtn = document.getElementById("addStandBtn");

// Funktion zum Rendern der Jagdstände
function renderJagdstaende() {
  jagdstaendeListe.innerHTML = "";
  db.ref('jagdstaende').once('value', (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const stand = childSnapshot.val();
      const listItem = document.createElement("li");
      listItem.textContent = `${stand.name} - ${stand.ort}`;
      jagdstaendeListe.appendChild(listItem);
    });
  });
}

// Event-Listener für das Hinzufügen eines Jagdstands
addStandBtn.addEventListener("click", () => {
  const name = prompt("Name des Jagdstandes:");
  const ort = prompt("Ort des Jagdstandes:");
  if (name && ort) {
    db.ref('jagdstaende').push({
      name: name,
      ort: ort
    }).then(() => {
      renderJagdstaende();
    });
  }
});

// Initialisierung: Jagdstände rendern
renderJagdstaende();
