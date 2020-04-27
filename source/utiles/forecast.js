const fetch = require("node-fetch");

const forecast=(location,callback)=>{
    let weatherUrl = `http://api.weatherstack.com/current?access_key=2434c5ce002da4f239aeca4ad9451287&query=${location[1]},${location[0]}`
  
    fetch(weatherUrl).then(res=>{
        if(res.status >= 200 && res.status < 300){
            return res.json()
        }else{
             callback("error while connecting to server, please try again letter",undefined);
        }
    }).then(data=>{
        if(data.error){
            callback("Please provide a valid location",undefined)
        }else{
            callback(undefined,[data.location.name,data.location.region,data.current.temperature]);
        }
    }).catch(err=>{
        if(err.type === "system"){
          callback("Please check your internet connection",undefined)
        }
    })
}


module.exports = forecast;