const astrosUrl = 'http://api.open-notify.org/astros.json';
const wikiUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary/';
const peopleList = document.getElementById('people');
const btn = document.querySelector('button');

// Handle all fetch requests
async function getPeopleInSpace(url){
  const peopleResponse = await fetch(url);
  const peopleJSON = await peopleResponse.json();

  const profiles = peopleJSON.people.map(async (person) => {
    const craft = person.craft;
    const profileResponse = await fetch(wikiUrl + person.name);
    const profileJSON = await profileResponse.json();

    return {...profileJSON, craft}
  });

  return Promise.all(profiles)
}


// Generate the markup for each profile
function generateHTML(data) {
  data.map(person => {
    const section = document.createElement('section');
    const wiki = "https://en.wikipedia.org/wiki/"
    peopleList.appendChild(section);
    if (person.type === "standard") {
      section.innerHTML = `
      <img src=${person.thumbnail.source}>
      <span>${person.craft}</span>
      <h2>${person.title}</h2>
      <p>${person.description}</p>
      <p>${person.extract}</p>
      `;
    } else {
      section.innerHTML = `
      <h2>${person.title}</h2>
      <span>${person.craft}</span>
      <p>No description available</p>
      <p>Try to check an astronaut by <a href=${wiki}> Wiki </a></p>
      `;
    }
  })
}

btn.addEventListener('click', (event) => {
  
  event.target.textContent = 'Loading...';

  getPeopleInSpace(astrosUrl)
  .then(generateHTML)
  .finally(event.target.remove())
});