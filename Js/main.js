// // let httpReq = new XMLHttpRequest();
// // httpReq.open("GET","http://api.weatherapi.com/v1/current.json?key=1ec3f26ea2fc4b8291360918210105&q=London" );
// // httpReq.send()
// // httpReq.addEventListener("readystatechange",function (){
// //     if(httpReq.readyState == 4)
// //     {

// //         obj = JSON.parse(httpReq.response);
// //         console.log(obj);

// //          allRegionsWeatherData = Array.from(obj.location);

// //         console.log(allRegionsWeatherData);

// //     }
// // })


// /****************************************************************************************************************************/

// array to store wether data of three days
let allDaysWeatherData = [];

// object to srore data of day 01
// let day01Wheather  ;
// object to srore data of day 02
// let day02Wheather ;

// object to srore data of day 03
// let day03Wheather ;


let searchInput = document.getElementById("searchInput");
let searchButton = document.getElementById("searchButton");
let colsParent = document.getElementById("colsParent");


// function to fetch the api
async function getData(region) {
    
    let weatherData = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=4985eed44d6441bf9db64515210105&q=${region}&days=7`);
    let convertData = await weatherData.json();


    // day 01 weather data
    let day01Wheather = {
        weekDayName: getWeekDayName(convertData.forecast.forecastday[0].date),
        date: getDaysNumsInMonth(convertData.forecast.forecastday[0].date) + " " + getMonthsNames(convertData.forecast.forecastday[0].date),
        name: convertData.location.name,
        temp: convertData.current.temp_c,
        weatherCase: convertData.current.condition.text,
        weatherIcon: convertData.current.condition.icon,
        humidity: convertData.current.humidity,
        windDir: convertData.current.wind_dir,
        windSpeed: convertData.current.wind_kph
    }


    // day 02 weather data
    let day02Wheather = {
        weekDayName: getWeekDayName(convertData.forecast.forecastday[1].date),
        maxTemp: convertData.forecast.forecastday[1].day.maxtemp_c,
        minTemp: convertData.forecast.forecastday[1].day.mintemp_c,
        weatherCase: convertData.forecast.forecastday[1].day.condition.text,
        weatherIcon: convertData.forecast.forecastday[1].day.condition.icon,
    }


    // day 03 weather data
    let day03Wheather = {
        weekDayName: getWeekDayName(convertData.forecast.forecastday[2].date),
        maxTemp: convertData.forecast.forecastday[2].day.maxtemp_c,
        minTemp: convertData.forecast.forecastday[2].day.mintemp_c,
        weatherCase: convertData.forecast.forecastday[2].day.condition.text,
        weatherIcon: convertData.forecast.forecastday[2].day.condition.icon,
    }

    //push all objects in the array 
    allDaysWeatherData.push(day01Wheather);
    allDaysWeatherData.push(day02Wheather);
    allDaysWeatherData.push(day03Wheather);

    
    displayData();


}
getData("cairo");


// function to get week days names 
function getWeekDayName(date) {
    let d = new Date(date);
    let n = d.getDay()
    let day = " ";

    switch (n) {
        case 0:
            day = "Sunday";
            break;
        case 1:
            day = "Monday";
            break;
        case 2:
            day = "Tuesday";
            break;
        case 3:
            day = "Wednesday";
            break;
        case 4:
            day = "Thursday";
            break;
        case 5:
            day = "Friday";
            break;
        case 6:
            day = "Saturday";
            break;

        default:
            break;
    }
    //}‏

    return day;
}

// function to get days numbers in th month
function getDaysNumsInMonth(date) {
    var d = new Date(date);
    var dayNumInMonth = d.getDate();
    return dayNumInMonth;
}


// function to get monthes names
function getMonthsNames(date) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    let d = new Date(date);
    let monthName = d.getMonth();
    return monthNames[monthName];

}


// seacrch input event to call function that fetch tha api to get data
searchInput.addEventListener("keyup", function () {
    let searchKeyWord = searchInput.value;
    if (searchKeyWord.length >= 3) {
        getData(searchKeyWord);
    }

    
})

// seacrch button event to call function that fetch tha api to get data

searchButton.addEventListener("click", function () {
    let searchKeyWord = searchInput.value;
    if (searchKeyWord.length >= 3) {
        getData(searchKeyWord);
    }

})


// the function that will display the data comming from api
function displayData() {
    let box = ``;
    box = ` 
        <div class="col-md-4  ">
            <div class="item">
                <div class="date-day-cont d-flex justify-content-between px-2 py-1 " >
                    <h6>${allDaysWeatherData[0].weekDayName}</h6>
                    <h6>${allDaysWeatherData[0].date}</h6>

                </div>
                <div class="degree-details py-4 px-3">
                    <h5>${allDaysWeatherData[0].name}</h5>
                    <div class="degree my-3 d-flex  align-items-center ">
                        <span class="d-block mr-5">${allDaysWeatherData[0].temp}<sup>o</sup>C</span>
                        <div class="img-continer text-center">
                            <img src="https:${allDaysWeatherData[0].weatherIcon}" alt="" >
                        </div>
                    
                    </div>
                    <span class="text-primary">${allDaysWeatherData[0].weatherCase}</span>
                    <ul class="case list-unstyled d-flex justify-content-between mt-4">
                        <li><img src="Img/icon-umberella.png" alt="" title="Humidity"> <span >${allDaysWeatherData[0].humidity}%</span></li>
                        <li><img src="Img/icon-wind.png" alt="" title="Wind Speed"> <span>${allDaysWeatherData[0].windSpeed}km/h </span></li>
                        <li><img src="Img/icon-compass.png" alt="" title="Wind Direction"> <span>${allDaysWeatherData[0].windDir}</span></li>
                    </ul>

                </div>
            </div>
        </div>


        
        <div class="col-md-4 ">
            <div class="item2  ">
                <div class="date-day-cont text-center px-2 py-1 " >
                    <h6>${allDaysWeatherData[1].weekDayName}</h6>
                </div>
                <div class="degree-details py-5 d-flex flex-column align-items-center" >
                
                    <div class="img-continer text-center w-50">
                        <img src="https:${allDaysWeatherData[1].weatherIcon}" alt="" class="h-75">
                    </div>

                    <div class="degree my-2  text-center">
                        <span class="d-block mt-2 spn1">${allDaysWeatherData[1].maxTemp}<sup>o</sup>C</span>
                        <span class="d-block mt-2 mb-3 spn2"> ${allDaysWeatherData[1].minTemp}<sup>o</sup></span>

                    </div>

                    <span class="text-primary">${allDaysWeatherData[1].weatherCase}</span>
                </div>
            </div>
        </div>


        <div class="col-md-4 ">
            <div class="item2  ">
                <div class="date-day-cont text-center px-2 py-1 " >
                    <h6>${allDaysWeatherData[2].weekDayName}</h6>
                </div>
                <div class="degree-details py-5 d-flex flex-column align-items-center" >
                
                    <div class="img-continer text-center w-50">
                        <img src="https:${allDaysWeatherData[2].weatherIcon}" alt="" class="h-75">
                    </div>

                    <div class="degree my-2  text-center">
                        <span class="d-block mt-2 spn1">${allDaysWeatherData[2].maxTemp}<sup>o</sup>C</span>
                        <span class="d-block mt-2 mb-3 spn2"> ${allDaysWeatherData[2].minTemp}<sup>o</sup></span>

                    </div>

                    <span class="text-primary">${allDaysWeatherData[2].weatherCase}</span>
                </div>
            </div>
        </div>

    `;


     colsParent.innerHTML = box;
     

    //  to empty the array after every displaying of data
     allDaysWeatherData.length = 0 ;
     
}



















































/*********************************************************************************** */
// const monthNames = ["January", "February", "March", "April", "May", "June",
//   "July", "August", "September", "October", "November", "December"
// ];

// const d = new Date("2021-05-02");
// console.log(monthNames[d.getMonth()]);




// var d = new Date();

// var date = d.getDate();
