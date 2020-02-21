/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

const cards = document.querySelector('.cards')

axios.get('https://api.github.com/users/ahaberman25')
  .then((response) => { 
    console.log(response.data)
    cards.appendChild(followerCard(response.data))
  })
  .catch((err) => { 
    console.log(err) 
  })

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

// const followersArray = ['tetondan','dustinmyers','justsml','luishrd','bigknell','weinerjm14'];

// followersArray.forEach((follower) => {
//   axios.get(`https://api.github.com/users/${follower}`)
//   .then((response) => { 
//     console.log(response.data)
//       cards.appendChild(followerCard(response.data))
//   })
//   .catch((err) => { 
//     console.log(err) 
//   })
// })

  axios.get('https://api.github.com/users/ahaberman25/followers')
    .then(response => response.data.forEach((item) => {
      axios.get(item.url)
        .then((newResponse) => {
          cards.appendChild(followerCard(newResponse.data))
        })
        .catch((err) => {
          console.log('you did something wrong here', err)
        })
      })
    )
    .catch((err) => {
      console.log('you did something wrong here', err)
    })
    


/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>
*/

function followerCard(data) {

  const newCard = document.createElement('div')
  newCard.classList.add('card')

  const cardImg = document.createElement('img')
  cardImg.src = data.avatar_url 

  const cardInfo = document.createElement('div')
  cardInfo.classList.add('card-info')

  const cardName = document.createElement('h3')
  cardName.classList.add('name')
  cardName.textContent = data.name

  const cardUsername = document.createElement('p')
  cardUsername.classList.add('username')
  cardName.textContent = data.login

  const cardLocation = document.createElement('p')
  cardLocation.textContent = `Location: ${data.location}`

  const cardProfile = document.createElement('p')
  cardProfile.textContent = 'Profile: '
  const cardProfileLink = document.createElement('a')
  cardProfileLink.setAttribute('href', data.html_url)
  cardProfileLink.textContent = data.html_url

  const cardFollowers = document.createElement('p')
  cardFollowers.textContent = `Followers: ${data.followers}`

  const cardFollowing = document.createElement('p')
  cardFollowing.textContent = `Following: ${data.following}`

  const cardBio = document.createElement('p')
  cardBio.textContent = `Bio: ${data.bio}`

  newCard.appendChild(cardImg)
  newCard.appendChild(cardInfo)
  cardInfo.appendChild(cardName)
  cardInfo.appendChild(cardUsername)
  cardInfo.appendChild(cardLocation)

  cardInfo.appendChild(cardProfile)
  cardProfile.appendChild(cardProfileLink)

  cardInfo.appendChild(cardFollowers)
  cardInfo.appendChild(cardFollowing)
  cardInfo.appendChild(cardBio)

  return newCard;
}





/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
