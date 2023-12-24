// Fetch the data from the server
fetch('db.json')
    .then(response => response.json())
    .then(data => {
        const charactersData = data.characters;

        // Function to create a character card
        function createCharacterCard(character) {
            const card = document.createElement('article');
            card.classList.add('character-card');

            const img = document.createElement('img');
            img.src = character.image;
            img.alt = character.name;
            card.appendChild(img);

            const name = document.createElement('h2');
            name.textContent = character.name;
            name.dataset.characterId = character.id; // Assign the character's ID as a data attribute
            card.appendChild(name);

            const votes = document.createElement('p');
            votes.textContent = `Votes: ${character.votes}`;
            card.appendChild(votes);

            return card;
        }

        // Function to render characters
        function renderCharacters(characters) {
            const container = document.getElementById('characters-container');
            characters.forEach(character => {
                const card = createCharacterCard(character);
                container.appendChild(card);
            });
        }

        // Function to display details of a specific character
        function displayCharacterDetails(character) {
            const detailsDiv = document.getElementById('animal-details');
            detailsDiv.innerHTML = `
                <h2>${character.name}</h2>
                <img src="${character.image}" alt="${character.name}">
                <p>Votes: ${character.votes}</p>
            `;
        }

        // Event listener for character clicks
        const container = document.getElementById('characters-container');
        container.addEventListener('click', event => {
            if (event.target.tagName === 'H2') {
                // Get the character ID from the data attribute
                const characterId = event.target.dataset.characterId;
                // Find the character object in the charactersData array
                const character = charactersData.find(char => char.id === characterId);
                // Display the character details
                displayCharacterDetails(character);
            }
        });

        // Render the characters initially
        renderCharacters(charactersData);
    });
