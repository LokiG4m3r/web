document.addEventListener('DOMContentLoaded', () => {
    const navigation = document.getElementById('navigation');
    const content = document.getElementById('content');
    
    // Datos del torneo
    const tournamentData = [
        {
            phase: "Fase 1: Todos contra todos",
            description: "Descripción: Un todos contra todos por puntos donde cada ganador va adquiriendo una carta insignia del perdedor.",
            matches: [
                { player1: "A", player2: "B", winner: "?" },
                { player1: "C", player2: "D", winner: "?" },
                { player1: "B", player2: "C", winner: "?" },
                { player1: "A", player2: "D", winner: "?" },
                { player1: "C", player2: "A", winner: "?" },
                { player1: "D", player2: "B", winner: "?" }
            ]
        },
        {
            phase: "Fase 2: Semifinal de eliminación",
            description: "Descripción: Una semifinal de eliminación en un formato de 'el mejor de 3'.",
            matches: [
                { player1: "#1", player2: "#3", winner: "#1" },
                { player1: "#2", player2: "#4", winner: "#2" }
            ]
        },
        {
            phase: "Fase 3: Concierto del Axere",
            description: "Descripción: Concierto del Axere.",
            matches: []  // No hay partidos en esta fase
        },
        {
            phase: "Fase 4: Final",
            description: "Descripción: Final (única).",
            matches: [
                { player1: "Ganador (#1 vs #3)", player2: "Ganador (#2 vs #4)", winner: "?" }
            ]
        },
        {
            phase: "Fase 5: Canjeo de Cartas Insignias",
            description: "Descripción: El Ganador del Torneo canjea las cartas insignias por cartas de valor.",
            matches: []  // No hay partidos en esta fase
        },
        {
            phase: "Fase 6: Partido Especial",
            description: "Descripción: Partido Especial entre el Ganador del Torneo y Monina.",
            matches: [
                { player1: "Ganador del Torneo", player2: "Monina", winner: "Ganador del Torneo" }
            ]
        },
        {
            phase: "Fase 7: Premiación",
            description: "Descripción: Premiación del Torneo.",
            matches: []  // No hay partidos en esta fase
        }
    ];

    // Función para crear el bracket
    function createBracket(data) {
        const container = document.getElementById('bracketContainer');
        let rounds = [];

        data.forEach((phaseData, phaseIndex) => {
            const round = document.createElement('div');
            round.classList.add('round');
            
            const roundTitle = document.createElement('h2');
            roundTitle.textContent = phaseData.phase;
            round.appendChild(roundTitle);

            const roundDescription = document.createElement('p');
            roundDescription.textContent = phaseData.description;
            round.appendChild(roundDescription);

            // Crear los partidos de la fase
            phaseData.matches.forEach(match => {
                const matchElement = document.createElement('div');
                matchElement.classList.add('match');

                const matchText = document.createElement('p');
                matchText.textContent = `${match.player1} vs ${match.player2}`;

                const winnerText = document.createElement('p');
                winnerText.classList.add('winner');
                winnerText.textContent = `Ganador: ${match.winner}`;

                matchElement.appendChild(matchText);
                matchElement.appendChild(winnerText);

                const line = document.createElement('div');
                line.classList.add('line');
                matchElement.appendChild(line);

                round.appendChild(matchElement);
            });

            rounds.push(round);
        });

        // Agregar todas las rondas al contenedor
        rounds.forEach(round => {
            container.appendChild(round);
        });
    }

    // Función para cargar contenido (decks, bracket, etc.)
    async function loadContent(url) {
        try {
            content.style.opacity = '0';
            content.style.transform = 'translateY(20px)';
            
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const html = await response.text();
            
            setTimeout(() => {
                content.innerHTML = html;
                content.style.opacity = '1';
                content.style.transform = 'translateY(0)';
                initializeDecks(); // Inicializar decks después de cargar el contenido
                createBracket(tournamentData); // Crear el bracket después de cargar el contenido
            }, 300);
            
        } catch (error) {
            console.error('Failed to load content:', error);
            content.innerHTML = `<p>Failed to load content.</p>`;
        }
    }

    // Inicializamos el comportamiento de los botones
    navigation.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
            const buttons = navigation.querySelectorAll('button');
            buttons.forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');
            
            const target = event.target.dataset.target;
            loadContent(target);
        }
    });

    // Agregar efectos al pasar el mouse sobre los botones
    const buttons = navigation.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
        });
    });

    // Inicializamos los decks después de cargar el contenido
    initializeDecks();
    createBracket(tournamentData); // Crear el bracket después de la inicialización
});

// Función para inicializar los decks
function initializeDecks() {
    const deckItems = document.querySelectorAll('.deck-item');

    deckItems.forEach(item => {
        // Añadir un botón "Detalles" debajo de la imagen
        const detailsButton = document.createElement('button');
        detailsButton.textContent = 'Detalles';
        detailsButton.classList.add('details-button');
        detailsButton.style.display = 'none'; // Inicialmente el botón está oculto

        // Asignar un URL único para cada deck usando el atributo 'data-url'
        let url;
        switch (item.textContent.trim()) {
            case 'Joey Wheeler':
                url = 'https://ygoprodeck.com/deck/torneo-joey-wheeler-589821';
                break;
            case 'Mai Valentine':
                url = 'https://www.example.com/mai-valentine';
                break;
            case 'Mako Tsunami':
                url = 'https://www.example.com/mako-tsunami';
                break;
            case 'Maximiliam Pegasus':
                url = 'https://www.example.com/pegasus';
                break;
            case 'Rex Raptor':
                url = 'https://www.example.com/rex-raptor';
                break;
            case 'Seto Kaiba':
                url = 'https://www.example.com/seto-kaiba';
                break;
            case 'Weevil Underwood':
                url = 'https://www.example.com/weevil-underwood';
                break;
            case 'Yugi Muto':
                url = 'https://www.example.com/yugi-muto';
                break;
            default:
                url = 'https://www.example.com';
        }
        
        detailsButton.setAttribute('data-url', url); // Asignar el URL al botón

        // Agregar el botón de detalles al deck
        item.appendChild(detailsButton);

        item.addEventListener('click', () => {
            // Si el deck está expandido, colapsarlo
            if (item.classList.contains('expanded')) {
                item.classList.remove('expanded');
                detailsButton.style.display = 'none'; // Ocultar el botón cuando se colapsa
            } else {
                // Colapsar otros decks si están abiertos
                document.querySelectorAll('.deck-item.expanded').forEach(expandedItem => {
                    expandedItem.classList.remove('expanded');
                    expandedItem.querySelector('.details-button').style.display = 'none'; // Ocultar el botón en otros decks
                });

                // Expandir el deck clicado
                item.classList.add('expanded');
                detailsButton.style.display = 'block'; // Mostrar el botón cuando se expande
            }
        });

        // Agregar el comportamiento para el botón de detalles
        detailsButton.addEventListener('click', (e) => {
            e.stopPropagation(); // Evitar que el clic en el botón expanda el deck
            const url = detailsButton.getAttribute('data-url');
            window.location.href = url; // Redirigir al usuario a la URL definida
        });
    });
}
