const div = document.querySelector("article")
const loadImg_btn = document.getElementById("loadImg_btn")
const  xhttp = new XMLHttpRequest();
const api_code = 'c048ce2a38931304f7485b087d52f07c';
const cities = [];

loadImg_btn.addEventListener('click', function(){  
  const search_city = document.getElementById("city").value.trim();
  sendRequest(search_city);
  document.getElementById("city").value = ''
});


function sendRequest(city){
  xhttp.open("GET",
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_code}&units=metric`,
  true );
  xhttp.send();
}


xhttp.onreadystatechange = function(){
    if(this.readyState === 4 && this.status === 200){
    const data =JSON.parse(this.responseText)
      if(!cities.includes(data.name)){
        createCard(data.id);
        handleResponse(data.id, data);
        cities.push(data.name)
      }else {
        handleResponse(data.id, data);
      }}}


function createCard(id){
  let my_Card = 
`
<div class="card" id='c${id}' >
<div>
            <div class="title">
                <h2>   <b class='city'></b> <b class='country'></b> </h2>
                <span onclick="refresh(${id})" ><img src="arrow-clockwise.svg" alt=""></span>
            </div>
            <div class="images">
            <img class='icon'>
            </div>
            <div class="description">
            <div class="totale_span">
            <div class="totale_span1">
                <span class=" span1" style="font-size: 20px; width: 100% !important;" >  <b class='temp'></b> <img style="width: 30px;" src="2.png" alt=""></span>
               <div style="display:flex ;">
                 <span class="span2 " id="s"> <b class='temp_max'></b>  <img src="temp max.svg" alt="" style="width:30px ;"></span>
                 <span class="span3 "> <b class='temp_min'></b> <img src="temp min.svg" alt="" style="width:30px ;"></span>
               </div>
            </div> 
            <div class="totale_span2" style="display:flex ;">
                <span class="span4 "> <b class='wind_speed'></b> <img style="width: 30px;" src="3.png" alt=""></span>
                <span class="span5 ">  <b class='humidite'></b> <img style="width: 30px;" src="1.png" alt=""> </span>
                <span class="span6 ">  <b class='pressure'></b><img style="width: 30px;" src="5.png" alt=""> </span>
            </div>
            </div>
            </div>
        </div>
</div>
`
div.innerHTML += my_Card
}


function handleResponse(id, data){
const card = document.querySelector(`#c${id}`);
card.querySelector('.icon').src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`  
card.querySelector('.temp').innerHTML = Math.round(data.main.temp) + ' °C';
card.querySelector('.temp_min').innerHTML =  Math.round(data.main.temp_min);
card.querySelector('.temp_max').innerHTML =  Math.round(data.main.temp_max);
card.querySelector('.pressure').innerHTML = data.main.pressure + ' hpa';
card.querySelector('.city').innerHTML = data.name;
card.querySelector('.country').innerHTML = data.sys.country;
card.querySelector('.wind_speed').innerHTML = data.wind.speed + ' m/s';
card.querySelector('.humidite').innerHTML = data.main.humidity + ' %';
}



// function reafrech
function refresh(id) {
  const card = document.querySelector(`#c${id}`);
  const city = card.querySelector('.city').innerHTML
  sendRequest(city)
}

   
function getlocation(){

  var liveMap;
  if(navigator.geolocation){
    liveMap =  navigator.geolocation.watchPosition(function(position){
      let latitude = position.coords.latitude
      let longitude = position.coords.longitude
      // console.log(latitude)
      // console.log(longitude) 
      const  xhttp_city = new XMLHttpRequest();
      xhttp_city.open("GET",
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api_code}&units=metric`,
      true );
      xhttp_city.send();
      xhttp_city.onreadystatechange = function(){
    if(this.readyState === 4 && this.status === 200){
    const dataa =JSON.parse(this.responseText)
    console.log(  'LOCATION : ' ,dataa)
    console.log(  'city : ' ,dataa.name)
  
    if(!cities.includes(dataa.name)){
            createCard(dataa.id);
            handleResponse(dataa.id, dataa);
            cities.push(dataa.name)
          }else {
            handleResponse(dataa.id, dataa);
          }
  }}
  },
  function(error){
      console.log(error)
  })
  }
}

getlocation()




































