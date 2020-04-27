const fetch = require("node-fetch");

// geoCode
const geoCode=(address,callback)=>{

 const geoURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYW5raXQ1NDMiLCJhIjoiY2s2ZG9tamIxMDNzMDNkbXZub2Z5c2FmZyJ9.-jsIs4wfC2Lcww2_0aZCrw`;
 
 fetch(geoURL).then(res=>{
     if(res.status >= 200 && res.status < 300){
         return res.json();
     }else{
         callback("Error while connecting to server, please try again later",undefined)
     }
 }).then(data=>{
     if(data.features.length === 0){
         callback("please provide a valid address",undefined)
     }else{
         callback(undefined,data.features[0].center)
     }
 }).catch(err=>{
     if(err.type === "system"){
         callback("Please check your internet connection",undefined)
     }
 })
  

}




module.exports = geoCode;