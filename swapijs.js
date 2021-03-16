
const mainElement = document.querySelector('main');
const ulElement = document.querySelector('.list');
const characterSection = document.querySelector('.characterSection');
const nameList = document.querySelector('.nameList');
const planetSection = document.querySelector('.planetSection');
const mainSection = document.querySelector('.mainSection');
const nextElement = document.createElement('button');
const previousElement = document.createElement('button');
const nameSection = document.querySelector('.nameSection');
const breakRow = document.createElement('br');

nextElement.textContent = "   ->   ";
previousElement.textContent = "   <-   ";


urlPeople = 'http://swapi.dev/api/people/';

function getData(url, callback) {
 
    fetch(url)
    .then(response => response.json())
        .then(callback)
        .catch(error => console.log(error))    
}

 
function renderCharacterName(characters) {
    removeAllChildNodes(nameList);
    for (let i = 0; i < characters.results.length; i++) {

        const _user = characters.results[i];

        const namebutton = document.createElement('li');

        namebutton.setAttribute('name-button', _user.name);
        namebutton.textContent = _user.name;
        nameList.appendChild(namebutton);

    }


nameList.appendChild(breakRow);
nameList.appendChild(previousElement);
nameList.appendChild(nextElement);

previousElement.addEventListener('click', function() {
        getData(characters.previous, renderCharacterName);
    }, false );

nextElement.addEventListener('click', function() {
        getData(characters.next, renderCharacterName);
        }, false );
    
    function onClick(evt) {

        const name = evt.target.getAttribute("name-button");

        for (let i = 0; i < characters.results.length; i++) {

            const user = characters.results[i];
            const planet = characters.results[i].homeworld;
            if (characters.results[i].name == name) {

                renderCharacter(user);
                getData(planet, renderPlanet);
                break;
            }
        }

    }
                
    nameList.addEventListener('click', onClick);

}

function renderCharacter(characters) {
    removeAllChildNodes(characterSection);
    

    mainSection.appendChild(characterSection);
    

    const name = characters.name;
    const height = characters.height;
    const weight = characters.mass;
    const hair_color = characters.hair_color;
    const skin_color = characters.skin_color;
    const eye_color = characters.eye_color;
    const birth = characters.birth_year;
    const gender = characters.gender;

    const h2Element = document.createElement('h2');
    const heightElement = document.createElement('p');
    const weightElement = document.createElement('p');
    const skinElement = document.createElement('p');
    const eyeElement = document.createElement('p');
    const birthElement = document.createElement('p');
    const genderElement = document.createElement('p');
    const hairElement = document.createElement('p');
    
    h2Element.textContent = "Name: " + name;
    heightElement.textContent = "Height: " + height +"cm";
    weightElement.textContent = 'Weight: ' + weight + "kg";
    hairElement.textContent = 'Hair-color: ' + hair_color;
    skinElement.textContent = 'Skin-color: ' + skin_color;
    eyeElement.textContent = "eye-color: " + eye_color;
    birthElement.textContent = "Year of birth: " + birth;
    genderElement.textContent = "Gender: " + gender;


    characterSection.appendChild(h2Element);
    characterSection.appendChild(heightElement);
    characterSection.appendChild(weightElement);
    characterSection.appendChild(hairElement);
    characterSection.appendChild(skinElement);
    characterSection.appendChild(eyeElement);
    characterSection.appendChild(birthElement);
    characterSection.appendChild(genderElement);
}

function renderPlanet(planet) {
    removeAllChildNodes(planetSection);
    mainSection.appendChild(planetSection);
    const planetName = planet.name;
    const planetTerrain = planet.terrain;
    const planetClimate = planet.climate;
    const planetPop = planet.population;

    const nameElement = document.createElement('h2');
    const terrainElement = document.createElement('p');
    const climateElement = document.createElement('p');
    const popElement = document.createElement('p');


    nameElement.textContent = "Home-Planet: " + planetName;
    terrainElement.textContent = "Terrain: " + planetTerrain;
    climateElement.textContent = "Climate: " + planetClimate;
    popElement.textContent = "Population: " + planetPop;


    planetSection.appendChild(nameElement);
    planetSection.appendChild(terrainElement);
    planetSection.appendChild(climateElement);
    planetSection.appendChild(popElement);

}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}


removeAllChildNodes(mainSection);

getData(urlPeople, renderCharacterName);

