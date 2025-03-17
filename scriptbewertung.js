// Funktion zum Laden der Bewertungen aus dem localStorage
function ladeBewertungen() {
    const bewertungen = JSON.parse(localStorage.getItem('bewertungen')) || [];
    bewertungen.forEach((bewertung) => {
        erstelleBewertung(bewertung.text, bewertung.name, bewertung.id);
    });
}

// Funktion zum Erstellen und Hinzufügen einer Bewertung
function erstelleBewertung(bewertungText, kundeName, id) {
    const bewertungDiv = document.createElement('div');
    bewertungDiv.classList.add('bewertung');
    bewertungDiv.innerHTML = `
        <p class="bewertung-text">"${bewertungText}"</p>
        <p class="kunde">- ${kundeName}</p>
        <button class="delete-button" onclick="loescheBewertung('${id}', '${kundeName}')">Löschen</button>
    `;
    document.getElementById('bewertungen-container').appendChild(bewertungDiv);
}

// Event-Listener für das Bewertungsformular
document.getElementById('bewertungsformular').addEventListener('submit', function(event) {
    event.preventDefault(); // Verhindert das Standardverhalten des Formulars

    // Werte aus dem Formular abrufen
    const bewertungText = document.getElementById('bewertung-text').value;
    const kundeName = document.getElementById('kunde-name').value;

    // Eindeutige ID für die Bewertung generieren
    const bewertungId = Date.now().toString(); // Zeitstempel als ID verwenden

    // Bewertung erstellen und anzeigen
    erstelleBewertung(bewertungText, kundeName, bewertungId);

    // Bewertungen im localStorage speichern
    const bewertungen = JSON.parse(localStorage.getItem('bewertungen')) || [];
    bewertungen.push({ text: bewertungText, name: kundeName, id: bewertungId });
    localStorage.setItem('bewertungen', JSON.stringify(bewertungen));

    // Formular zurücksetzen
    document.getElementById('bewertungsformular').reset();
});

// Funktion zum Löschen einer Bewertung
function loescheBewertung(id, kundeName) {
    // Bewertungen aus dem localStorage abrufen
    const bewertungen = JSON.parse(localStorage.getItem('bewertungen')) || [];
    
    // Bewertung finden und löschen
    const neueBewertungen = bewertungen.filter(bewertung => bewertung.id !== id || bewertung.name !== kundeName);
    
    // Aktualisierte Bewertungen im localStorage speichern
    localStorage.setItem('bewertungen', JSON.stringify(neueBewertungen));
    
    // Container für Bewertungen leeren
    document.getElementById('bewertungen-container').innerHTML = '';
    
    // Alle Bewertungen erneut laden
    ladeBewertungen();
}

// Bewertungen beim Laden der Seite laden
window.onload = ladeBewertungen;