document.addEventListener("DOMContentLoaded", function() {
    const createEventForm = document.getElementById("createEventForm");
    const eventsList = document.getElementById("events");
    const clearListButton = document.getElementById("clearListButton");
    const saveToDBButton = document.getElementById("saveToDBButton");
    const searchNameButton = document.getElementById("searchNameButton");
    const searchDateButton = document.getElementById("searchDateButton");

    let events = [];

    createEventForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const eventName = document.getElementById("eventName").value;
        const eventDate = document.getElementById("eventDate").value;
        const eventDescription = document.getElementById("eventDescription").value;

        const eventObj = {
            name: eventName,
            date: eventDate,
            description: eventDescription
        };

        events.push(eventObj);
        displayEvent(eventObj);

        createEventForm.reset();
    });

    clearListButton.addEventListener("click", function() {
        events = [];
        eventsList.innerHTML = "";
    });

    saveToDBButton.addEventListener("click", function() {
        // Lógica para salvar em banco de dados (exemplo usando localStorage)
        localStorage.setItem("events", JSON.stringify(events));
        alert("Eventos armazenados com sucesso!");
    });

    searchNameButton.addEventListener("click", function() {
        const searchName = document.getElementById("searchName").value.toLowerCase();
        const filteredEvents = events.filter(event => event.name.toLowerCase().includes(searchName));
        displayEvents(filteredEvents);
    });

    searchDateButton.addEventListener("click", function() {
        const searchDate = document.getElementById("searchDate").value;
        const filteredEvents = events.filter(event => event.date === searchDate);
        displayEvents(filteredEvents);
    });

    function displayEvent(event) {
        const listItem = document.createElement("li");
        listItem.textContent = `${event.name} - ${event.date}: ${event.description}`;
        eventsList.appendChild(listItem);
    }

    function displayEvents(eventsToDisplay) {
        eventsList.innerHTML = "";
        eventsToDisplay.forEach(event => displayEvent(event));
    }

    // Carregar eventos do localStorage ao inicializar (se existirem)
    if (localStorage.getItem("events")) {
        events = JSON.parse(localStorage.getItem("events"));
        displayEvents(events);
    }
});
