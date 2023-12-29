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
  
    listItem.addEventListener('click', () => displayCharacterDetails(character));
  });

  // Event listener for voting and resetting
  list.addEventListener('click', function(event) {
    if (event.target.classList.contains('vote-btn')) {
      voteForCharacter(Number(event.target.dataset.id)); 
    }
    if (event.target.classList.contains('reset-btn')) {
      resetVotes(Number(event.target.dataset.id)); 
    }
  });
}

function displayCharacterDetails(character) {
  const characterDetails = document.getElementById("characterDetails");
  characterDetails.innerHTML = `
    <h2>${character.name}</h2>
    <img src="${character.image}" alt="${character.name}">
    <p>Votes: ${character.votes}</p>
    <button onclick="voteForCharacter(${character.id})">Vote</button>
  `;
}

function voteForCharacter(characterId) {
  if (!characterId) {
    console.log("Invalid CharacterId, Please try Again");
    return;
  }

  fetch(` http://localhost:3000/characters/${characterId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error Occurred. Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Vote Response:', data);
      const votesElement = document.querySelector('#characterDetails');
      if (data && data.votes !== undefined) {
        votesElement.textContent = `Votes: ${data.votes}`;
      } else {
        console.error('Invalid vote Response:', data);
      }
    })
    .catch(error => console.error('Error voting for Character', error));
}

// function resetVotes(characterId) {
//   const character = characters.find(char => char.id === characterId);
  
//   if (!character) {
//     console.log(`Character with ID ${characterId} not found.`);
//     return; // Exit the function early if character is not found
//   }

//   character.votes = 0;

//   const votesElement = document.querySelector('#characterDetails p');
//   if (votesElement) {
//     votesElement.textContent = `Votes: ${character.votes}`;
//   }
// }
