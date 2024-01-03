const voteCounts = {};

document.addEventListener('DOMContentLoaded', () => {
    // Fetch characters from the server
    fetch('http://localhost:3000/characters')
        .then(response => response.json())
        .then(data => {
            console.log("Characters data:", data); // Debugging log
            let animalsList = document.getElementById('animals');
            data.forEach(character => {
                voteCounts[character.id] = character.votes;
                let listItem = document.createElement('li');
                listItem.textContent = character.name;
                listItem.addEventListener('click', () => { 
                    showAnimalDetails(character.id); 
                    alert("you picked a character"); 
                });
                animalsList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error fetching character list:', error));
});

function showAnimalDetails(characterId) {
    fetch(`http://localhost:3000/characters/${characterId}`)
        .then(response => response.json())
        .then(character => {
            console.log("Selected character:", character); // Debugging log
            const characterDetails = document.getElementById('character-details');
            characterDetails.innerHTML = `
              <div class="character-container">
                  <h2>${character.name}</h2>
                  <img src="${character.image}" alt="${character.name}">
                  <p>Votes: <span id="votesCount">${character.votes}</span></p>
                  <form id="voteForm">
                      <label for="voteInput">Enter Votes:</label>
                      <input type="number" id="voteInput" name="votes" min="1" required>
                      <input type="submit" value="Vote">
                  </form>
              </div>
          `;

            const voteForm = document.getElementById('voteForm');
            voteForm.addEventListener('submit', function(event) {
                event.preventDefault();
                const votes = document.getElementById('voteInput').value;
                voteForCharacter(character.id, votes);
            });
        })
        .catch(error => console.log('Error fetching character details:', error));
}

function voteForCharacter(characterId, votes) {
    // Debugging logs
    console.log("Voting for character with ID:", characterId);
    console.log("Endpoint URL:", `http://localhost:3000/characters/${characterId}/vote`);
    
    fetch(`http://localhost:3000/characters/${characterId}/vote`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ votes: parseInt(votes) })
    })
    .then(response => {
        // Log the server response
        console.log("Server Response:", response);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("Vote response:", data);
        voteCounts[characterId] = parseInt(votes);
        const votesElement = document.getElementById('votesCount');
        votesElement.textContent = voteCounts[characterId];
        alert("Vote Added Successfully");
    })
    .catch(error => {
        console.error('Error voting for character:', error.message);
        alert("Error voting for character. Please try again.");
    });
}
