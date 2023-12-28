// Fetch the JSON data
fetch('db.json')
  .then(response => response.json())
  .then(data => renderCharacters(data.characters))
  .catch(error => console.error('Error fetching data:', error));

// Renders the characters to the DOM
function renderCharacters(characters) {
  const list = document.getElementById('charactersList');
  
  
  characters.forEach(character => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <div class="container">
        <img src="${character.image}" alt="${character.name}">
        <span>${character.name}</span>
      </div>
      <div class="buttons">
        <button class="vote-btn" data-id="${character.id}">Vote</button>
        <button class="reset-btn" data-id="${character.id}">Reset</button>
      </div>
      <div></div>
      <div></div>
    `;
    list.appendChild(listItem);
  
    // Attach click event to display character details
    listItem.addEventListener('click', () => displayCharacterDetails(character));
  });
  

  // Add event listeners after appending elements
  list.addEventListener('click', function(event) {
    if (event.target.classList.contains('vote-btn')) {
      addVote(Number(event.target.dataset.id)); // Convert to number if necessary
    }
    if (event.target.classList.contains('reset-btn')) {
      resetVotes(Number(event.target.dataset.id)); // Convert to number if necessary
    }
  });
  listItem.addEventListener('click', () => displayAnimalDetails(character));

}

function displayCharacterDetails(character) {
  const detailsContainer = document.getElementById('characterDetails');
  
  detailsContainer.innerHTML = '';
  
  const name = document.createElement('h2');
  name.textContent = character.name;
  
  const image = document.createElement('img');
  image.src = character.image;
  image.alt = character.name;

  const votes = document.createElement('p'); 
  votes.textContent = `Votes: ${character.votes}`;

  detailsContainer.appendChild(name);
  detailsContainer.appendChild(image);
  detailsContainer.appendChild(votes);
}
