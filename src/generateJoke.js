



 function generateJoke() {
 

    fetch('https://icanhazdadjoke.com',{
      method: 'GET',
      headers: {
        Accept: 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => {
       document.querySelector('#joke').innerHTML = data.joke
    })

 }

 document.querySelector('#jokeBtn').addEventListener('click', generateJoke)



 export default generateJoke;