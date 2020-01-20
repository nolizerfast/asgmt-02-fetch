'use strict';

const city = 'London';
const lang = 'ja';
const units = 'metric';
const appid = '4b5774e9f3d2a07b84f0f2f88e486224';
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appid}&lang=${lang}&units=${units}`;

fetch(url)
    .then(data => { // res
        if(data.ok){
            return data.json();
        } else {
            throw new Error();
        }
    })
    .then(function(data){
        //console.log(data);        
        const city = data.name;
        const date = new Date(toJSTime(data.dt));
        const myMonth = date.getMonth() + 1;
        const myDate = date.getDate();
        const theWeek = ["日", "月", "火", "水", "木", "金", "土"];
        const numDay = date.getDay();
        const myWeek = theWeek[numDay];
        const myHours = date.getHours();
        const myMin = String(date.getMinutes()).padStart(2, '0');
        const desc = data.weather[0].description;
        const temp = Math.round(data.main.temp * 10) / 10;
        const tempMin = Math.round(data.main.temp_min * 10) /10;
        const tempMax = Math.round(data.main.temp_max * 10) /10;
        const windspeed = data.wind.speed;
        const imagePath = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        
        const currentWeather = `

        <h1>${city}の天気</h1>

        <ul class="date">
        <li>${myMonth}月${myDate}日（${myWeek}）</li>
        <li>${myHours}時${myMin}分</li>
        </ul>

        <div class="fore-outer">
        <h2><img src="${imagePath}"></h2>
        <ul class="fore">
        <li class="desc">${desc}</li>
        <li class="temp">${temp} ℃</li>
        </ul>
        </div>
    
        <ul>
        <li>最高気温：${tempMax} ℃</li>
        <li>最低気温：${tempMin} ℃</li>
        <li>風速：${windspeed}m/秒</li>
        </ul>`;

        $(`#weather`).html(currentWeather);

    })
    .catch(err => {
        console.log(err);
    })
    
function toJSTime(utcTime) {
    return utcTime * 1000;
}