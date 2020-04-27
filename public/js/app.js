const weatherForm = document.querySelector("form");
const search = document.querySelector(".search");
const para1 = document.querySelector(".p1");



weatherForm.addEventListener("submit",(e)=>{
  e.preventDefault();
  para1.textContent = "loading..."
  const location = search.value; 
  fetch(`http://localhost:3000/weather?location=${location}`).then(res=>res.json())
  .then(data=>{
      if(data.error){
         para1.textContent = `${data.error}`;
      }else{
          para1.textContent = `You location is ${data.location},${data.region} and temperature is ${data.temperature}`
      }
  })
  
})