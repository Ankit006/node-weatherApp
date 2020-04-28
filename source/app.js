const path = require("path");
const express = require("express");
const geoCode = require("./utiles/geoCode");
const forecast = require("./utiles/forecast");
const hbs = require("hbs");
const app = express();
const port = process.env.PORT || 3000;
// setup static webpage
app.use(express.static(path.join(__dirname,"../public")))

// setup handlebars engine and views location
app.set("view engine","hbs");
app.set("views",path.join(__dirname,"./templates/views"));

const partialsPath = path.join(__dirname,"./templates/partials");
hbs.registerPartials(partialsPath)
// serve static directory
app.get("",(req,res)=>{
    res.render("index",{
        title:"weather",
        name:"Ankit"
    })
})

app.get("/about",(req,res)=>{
    res.render("about",{
        title:"About",
        name:"Ankit"
    })
})

app.get("/help",(req,res)=>{
    res.render("help",{
        title:"Help",
        name:"Ankit"
    })
})


app.get("/weather",(req,res)=>{
    if(!req.query.location){
        res.send({
            error:"Please provide a location"
        })
    }else{
        geoCode(req.query.location,(err,data)=>{
            if(err){
                res.send({
                    error:err
                })
            }else{
                forecast(data,(err,forecastData)=>{
                    if(err){
                        res.send({
                            error:err
                        })
                    }else{
                        res.send({
                            location:forecastData[0],
                            region:forecastData[1],
                            temperature:forecastData[2],
                        })
                    }
                })
            }
        })
    }
})

app.get("/products",(req,res)=>{
   if(!req.query.search){
       res.send({
           error:"Must provide a search term"
       })
   }else{
    res.send({
        products:[]
    })
   }
})

// error handling
app.get("/help/*",(req,res)=>{

   res.render("helpErr",{
       title:"Help article"
   })
})

app.get("*",(req,res)=>{
    res.render("error",{
        title:"page"
    })
})

app.listen(port,()=>{
    console.log(`Server is up on port ${port}`)
});

