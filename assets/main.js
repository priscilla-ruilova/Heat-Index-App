
//GOAL:  Build a simple front-end app that displays data returned from an api that would be beneficial to someone in the trades (construction, hvac, plumbing, etc)

//PROJECT DESCRIPTION: 
//This Heat Index App will take a zip code and return the heat index for the area and then provide recommendations for how to best potect yourself as an outdoor worker to prevent heat-related illness. 

//LOGIC BREAKDOWN:
//The user will input the zip code. We will use a click event to fetch the api data and print the heat index to the DOM. We will use if conditionals to share recommendatiosnf for how best to protect yourself from heat related illness..

document.querySelector('button').addEventListener('click', getHeat)


function getHeat(){
    const zipCode = document.querySelector('#zipCode').value
   
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${zipCode}&appid=eb4b81b31ac748906e6f9e97406f8759`

    fetch (url)
        .then (res => res.json())
        .then (data=> {
            console.log(data)
            const realTemp = (data.main.feels_like - 273.15) * (9/5) + 32 //Convert the Kelvin to Farenheit
            const finalTemp = realTemp.toFixed(2)
            document.querySelector('h2').innerText = `Today's heat index is: ${finalTemp}°F`
            
            //begin conditionals that share recommendations
            if (finalTemp >= 125){
                document.querySelector('h4').innerText = 'Classification: Extreme Danger' 
            }else if(finalTemp >= 80 && finalTemp < 91){
                document.querySelector('h4').innerText = 'Classification: Caution.'
            }else if(finalTemp >= 92 && finalTemp < 103){
                document.querySelector('h4').innerText = 'Classification: Extreme Caution.'
            }else if(finalTemp >=104 && finalTemp < 125){
                document.querySelector('h4').innerText = 'Classification: Danger.'
            }else{
                 document.querySelector('h4').innerText = 'Classification: None. You are in the clear'
            }
        })
        .catch(err => {
                console.log(`error ${err}`)
            });
}
// const url = 'https://services.arcgis.com/fLeGjb7u4uXqeF9q/arcgis/rest/services/lhhp_lead_certifications/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json'

//NOTES: This api works. Now I need a geocoding API to use so I can input an address and match it to it's correct coordinates for the weatherURL to then tell me the heat index based on humidity and temperature.