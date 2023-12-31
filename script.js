const voteCounts = {};
//Wait for DOM to be fuly loaded before executing the code
document.addEventListener('DOMContentLoaded', () => {
  //Fetch characters from the server
  fetch('http://localhost:3000/characters')
      .then(response => response.json())
      .then(data => {
          //Log the data received from the server
          console.log(data); 
          //Get the element where list will be displayed
          let animalsList = document.getElementById('animals');
          //Iterates over each character
          data.forEach(character => {
            // Initialize vote count for each character
            voteCounts[character.id] = character.votes;
              // Create a new list item for each character
              let listItem = document.createElement('li');
              listItem.textContent = character.name;
              //Adds a click event to show details when clicked
              listItem.addEventListener('click', () => {showAnimalDetails(character.id)
                  alert("you picked an animal")} );
              //Append the listItem to the animalsList
              animalsList.appendChild(listItem);
          });
      })
      
      .catch(error => console.error('Error fetching animal list:', error));
});

// Move the rest of your functions outside of the DOMContentLoaded event listener
function showAnimalDetails(characterId) {

  // Make a GET request to retrieve the details of a specific character
  fetch(`http://localhost:3000/characters/${characterId}`)
      .then(response => response.json())
      .then(animal => {

          // Display the details of the selected animal
          const animalDetails = document.getElementById('animal-details');
          animalDetails.innerHTML = `
              <h2>${animal.name}</h2>
              <img src="${animal.image}" alt="${animal.name}">
              <p>Votes: <span id="votesCount">${animal.votes}</span></p>
              <button onclick="voteForAnimal(${animal.id})">Vote</button>
          `;
      })
      .catch(error => console.log('Error fetching animal details:', error));
}

// Define voteForAnimal outside of the DOMContentLoaded event listener
function voteForAnimal(characterId) {

  // Make a POST request to vote for the specified animal
  fetch(`http://localhost:3000/characters/${characterId}/vote`, { method: 'POST' })
      .then(response => response.json())
      .then(data => {
        // Update the vote count in the local variable
        voteCounts[characterId] = parseInt(voteCounts[characterId]) + 1;

        // Update the displayed votes after a successful vote
        const votesElement = document.getElementById('votesCount');
        votesElement.textContent = voteCounts[characterId];

        
          alert("Vote Added Succesfully")
          console.log(data);
      })
      .catch(error => console.error('Error voting for animal:', error));
    }