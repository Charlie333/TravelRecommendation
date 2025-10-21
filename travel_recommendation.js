const srchButton = document.getElementById("btnSearch");
const rstButton = document.getElementById("btnReset");
const searchInput = document.getElementById('conditionInput');
const resultDiv = document.getElementById('result');
resultDiv.innerHTML = '';

fetch('./travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {
        console.log("Travel Recommendation Data:", data);

        srchButton.addEventListener('click', () => {
            var searchTerm = searchInput.value.toLowerCase();
            if (searchTerm !== ''){
                var searchResult = getSearchItem(data,searchTerm);
            } 
            console.log(searchTerm);            
            console.log(searchResult);

            if (data[searchResult].length > 0){
               if(searchResult === "beaches"||searchResult === "temples"){
                for(var i = 0; i<data[searchResult].length; i++){
                    resultDiv.innerHTML += `<p style ="font-weight:bold">${data[searchResult][i].name}</p>`;
                    resultDiv.innerHTML += `<p>${data[searchResult][i].description}</p>`;
                    resultDiv.innerHTML += `<img src="${data[searchResult][i].imageUrl}" alt="picture">`;
                  }
                }

                else if(searchResult==="countries"){
                    console.log(data[searchResult]);
                    for(var i = 0; i<data[searchResult].length; i++){
                        for(var j = 0; j<data[searchResult][i].cities.length; j++){
                        resultDiv.innerHTML += `<p style ="font-weight:bold">${data[searchResult][i].cities[j].name}</p>`;
                        resultDiv.innerHTML += `<p>${data[searchResult][i].cities[j].description}</p>`;
                        resultDiv.innerHTML += `<img src="${data[searchResult][i].cities[j].imageUrl}" alt="picture">`;
                      }
                    }
                }

                else{
                    console.log('No matching record found');
                }
            }
    })

    rstButton.addEventListener('click', () => {
        searchInput.value = '';
        resultDiv.innerHTML = '<p></p>';
    });

        // Initial reset when page loads
        resultDiv.innerHTML = '<p></p>';
});


function getSearchItem(data,searchItem){
    for (let key in data){
        if (key.includes(searchItem)){
            console.log(key);
            return key;
        }
    }
}