var city = document.getElementById('city');
var image = document.getElementById('image');
var celcius =  document.getElementById('celcius');
var fahrenheit =  document.getElementById('fahrenheit');
var loc = document.getElementById('loc');
var reg =  document.getElementById('reg');
var option = document.getElementsByClassName('option')[0];
var body = document.getElementsByTagName('body')[0];
var btn = document.getElementById('btn');

document.addEventListener('DOMContentLoaded',function(){
    navigator.geolocation.getCurrentPosition(success,fail);
    
})

var xhr = new XMLHttpRequest();
function load(lat,long,callback){
    xhr.open('GET',`https://cors-anywhere.herokuapp.com/http://api.weatherapi.com/v1/current.json?key=ddda5451bf114a61bf9160038201010&q=${lat},${long}`,true);
    xhr.onload = function(){
        if(this.status == 200){
            var msg = JSON.parse(this.responseText);
            callback(msg);
        }
    }
    xhr.send();
}

function load_search(val,callback){
    xhr.open('GET',`https://cors-anywhere.herokuapp.com/http://api.weatherapi.com/v1/current.json?key=ddda5451bf114a61bf9160038201010&q=${val}`,true);
    xhr.onload = function(){
        if(this.status == 200){
            var msg = JSON.parse(this.responseText);
            callback(msg);
        }
    }
    xhr.send();
}

function load_img(condition,callback){
    xhr.open('GET',`https://cors-anywhere.herokuapp.com/https://api.unsplash.com/search/photos/?query=${condition}&client_id=2W0dzVgSCk3OS--eFquY36P3CqBUooebuqsptNEIgGY`,true);
    xhr.onload = function(){
        if(this.status == 200){
            var msg = JSON.parse(this.responseText);
            callback(msg);
        }
    }
    xhr.send();
}

function success(position){
    lat = position.coords.latitude;
    long = position.coords.longitude;
    load(lat,long,resData);
    
}

function resData(data){
    var condition = data.current.condition.text;
    load_img(condition,resImg);
    reg.innerText = data.location.region;
    loc.firstElementChild.innerHTML = data.location.name;
    celcius.innerHTML = `<h1>${data.current.temp_c}° C</h1>`;
}

function resImg(data){
    var background = data.results[0].urls.full;
    body.style.background = `url(${background})`;
    body.style.backgroundRepeat = 'no-repeat';
    body.style.backgroundSize = 'cover';
}


function fail(){
    console.log("not retreived");
}

btn.addEventListener('click',function(e){
    target = e.target;
    var val = target.previousElementSibling.value;
    if(val){
        load_search(val,resData);
    }
    target.previousElementSibling.value = '';
    
    

})






