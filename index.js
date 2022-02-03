// Import stylesheets
import './style.css';

// I initially looked to do this with the Simpsons but couldn't find an API for them. I then considered Marvel but theirs required too many hoops to jump through.
// I chose HP as I was able to find their API without requiring a key.
// Also, who doesn't love Harry Potter?

const charactersList = document.getElementById('charactersList');
const searchBar = document.getElementById('searchBar');
let hpCharacters = [];

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();
    // we use this to check if the character info matches the search parameters
    // if we wanted to search by name alone we could comment out the code for the house search, and vice versa
    const filteredCharacters = hpCharacters.filter((character) => {
        return (
            character.name.toLowerCase().includes(searchString) ||
            character.house.toLowerCase().includes(searchString)
        );
    });
    displayCharacters(filteredCharacters);
});

// the API call is made here
const loadCharacters = async () => {
    try {
        const res = await fetch('https://hp-api.herokuapp.com/api/characters');
        hpCharacters = await res.json();
        displayCharacters(hpCharacters);
    } catch (err) {
        console.error(err);
    }
};

// a function for displaying the characters in the way we want
// we could alter it to include any information we'd like that's retrieved from the API
const displayCharacters = (characters) => {
    const htmlString = characters
        .map((character) => {
            return `
            <li class="character">
                <h2>${character.name}</h2>
                <p>House: ${character.house}</p>
                <img src="${character.image}"></img>
            </li>
        `;
        })
        .join('');
    charactersList.innerHTML = htmlString;
};

loadCharacters();
