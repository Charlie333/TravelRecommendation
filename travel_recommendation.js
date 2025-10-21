const srchButton = document.getElementById("btnSearch");
const searchInput = document.getElementById('conditionInput');
const resultDiv = document.getElementById('result');
resultDiv.innerHTML = '';


fetch('./travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {
        console.log("Travel Recommendation Data:", data);

        srchButton.addEventListener('click', () => {
            const searchTerm = searchInput.value.toLowerCase();
            console.log(searchTerm);
            const searchResult = getSearchItem(data,searchTerm);
            console.log(searchResult);
            console.log(data[searchResult][0].name);
            if (data[searchResult].length > 0 &&(data[searchResult][0].name="beaches" ||"temples"))
            for(var i = 0; i<data[searchResult].length; i++){
              resultDiv.innerHTML += `<p style ="font-weight:bold">${data[searchResult][i].name}</p>`;
              resultDiv.innerHTML += `<p>${data[searchResult][i].description}</p>`;
              resultDiv.innerHTML += `<img src="${data[searchResult][i].imageUrl}" alt="picture">`;
            }
        })
    }
);


function getSearchItem(data,searchItem){
    for (let key in data){
        if (key.includes(searchItem)){
            console.log(key);
            return key;
        }
    }
}