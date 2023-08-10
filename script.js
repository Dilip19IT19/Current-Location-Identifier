document.querySelector(".btn").addEventListener("click",function(){
  if(window.navigator.geolocation)
  {
    document.querySelector(".btn").innerHTML="Please allow to know the current location";
    window.navigator.geolocation.getCurrentPosition(success,error);
  }
  else
  {
    document.querySelector(".btn").innerHTML="Your browser does not support this feature";
  }

})

function success(position)
{
  document.querySelector(".btn").innerHTML="Getting Location Information...";
  let cordinates=position.coords;
  let lat=cordinates.latitude;
  let long=cordinates.longitude;
  const API_KEY="8deb412534dc453c94d6ec04b9dc78f7";
  fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=${API_KEY}`)
  .then((response)=>{
    return response.json();
  })
  .then((data)=>{
    let city=data.results[0].components.city;
    let district=data.results[0].components.city_district;
    let state=data.results[0].components.state;
    let country=data.results[0].components.country;
    document.querySelector(".btn").innerHTML=`City : ${city}, State : ${state}, District : ${district} , Country : ${country}`;
  })
  .catch()
  {
    document.querySelector(".btn").innerHTML="something went wrong";
  }

}

function error(err)
{
  if(err.code==1)
  {
    document.querySelector(".btn").innerHTML=err.message;
  }
  else if(err.code==2)
  {
    document.querySelector(".btn").innerHTML="Location is not available❗"
  }
  else
  {
    document.querySelector(".btn").innerHTML="Something went wrong"
  }
  document.querySelector(".btn").setAttribute("disabled","true");
}