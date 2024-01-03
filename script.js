const voteCounts = {};

document.addEventListener('DOMContentLoaded', () => {
    // Fetch characters from the server
    fetch('http://localhost:3000/characters')
        .then(response => response.json())
        .then(data => {
            console.log("Characters data:", data); 
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
          console.log("Selected character:", character); 
          const characterDetails = document.getElementById('character-details');
          characterDetails.innerHTML = `
              <div class="character-container">
                  <h2>${character.name}</h2>
                  <img src="${character.image}" alt="${character.name}">
                  <p>Votes: <span id="votesCount">${character.votes}</span></p>
                  <form id="voteForm">
                      <input type="hidden" id="characterIdInput" value="${character.id}">
                      <label for="voteInput">Enter Votes:</label>
                      <input type="number" id="voteInput" name="votes" min="1" required>
                      <input type="submit" value="Vote">
                  </form>
                  <button onclick="resetVotes(${character.id})" class="green-button">Reset Votes</button>
                  <button onclick="deleteAnimal(${character.id})" class="red-button">Delete Animal</button>
                  <p>Current Votes: <span id="currentVotesCount">${voteCounts[character.id]}</span></p>
              </div>
          `;
      })
      .catch(error => console.log('Error fetching character details:', error));
}

// // Function to handle voting for a character
// document.getElementById('voteForm').addEventListener('submit', function(event) {
//     event.preventDefault();
//     const characterId = document.getElementById('characterIdInput').value;
//     const votes = document.getElementById('voteInput').value;
//     voteForCharacter(characterId, votes);
// });

function voteForCharacter(characterId, votes) {
    fetch(`http://localhost:3000/characters/${characterId}/vote`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ votes: parseInt(votes) })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        voteCounts[characterId] = parseInt(votes);
        const votesElement = document.getElementById('votesCount');
        votesElement.textContent = voteCounts[characterId];
        const currentVotesElement = document.getElementById('currentVotesCount');
        currentVotesElement.textContent = voteCounts[characterId];
        alert("Vote Added Successfully");
    })
    .catch(error => {
        console.error('Error voting for character:', error.message);
        alert("Error voting for character. Please try again.");
    });
}

// Function to reset votes for a character
function resetVotes(characterId) {
    fetch(`http://localhost:3000/characters/${characterId}/reset-votes`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        voteCounts[characterId] = data.votes;
        const votesElement = document.getElementById('votesCount');
        votesElement.textContent = voteCounts[characterId];
        const currentVotesElement = document.getElementById('currentVotesCount');
        currentVotesElement.textContent = voteCounts[characterId];
        alert("Votes Reset Successfully");
    })
    .catch(error => console.error('Error resetting votes:', error));
}

// Function to delete a character
function deleteAnimal(characterId) {
    fetch(`http://localhost:3000/characters/${characterId}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        alert("Animal Deleted Successfully");
    })
    .catch(error => console.error('Error deleting animal:', error));
}
