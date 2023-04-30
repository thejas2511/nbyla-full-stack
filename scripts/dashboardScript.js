function checkStatus(){
    const user=sessionStorage.getItem("user");
    const role=sessionStorage.getItem("role");
    console.log(user);
    if (!user){
        window.alert("login/Register First")
        window.location="login.html";
    }
    if(role=="terraformer"){
      window.alert("Not an applicant");
      window.location="login.html";
    }
}


var user1=document.getElementById("user")
var user_id=sessionStorage.getItem("user_id");
var user=sessionStorage.getItem("user");
user1.innerHTML=sessionStorage.getItem("user");

fetch("https://nbyla-backend.onrender.com/jobs/getApplicant", {})
    
.then(response => response.json())
.then(json=>{const jobsContainer = document.getElementById("jobs-container");
json.forEach(job => {
  const card = generateJobCard(job);      
  jobsContainer.appendChild(card);
});})




function generateJobCard(job) {

const card = document.createElement("div");
card.className = "job-card";
card.draggable = true;
var color;


var dead=Math.floor(Math.abs(new Date(job.deadline.slice(0,10)) - new Date()) / (1000 * 60 * 60 * 24));

if (dead>=21){color="green"}
else if(dead>3 && dead<21){color="yellow"}
else if(dead<3){color="red"}

var interested=job.interested;


var arch,color1;
if (job.interested.includes(user)){
  arch=" Already Interested";
  color1="green";
}
else{
  arch="Interested?";
  color1="#4070f4";
}

card.innerHTML = `
    
  <h3 class="job-title" style="background-color: ${color};text-align:center"}>${job.title}</h3>
  <p class="job-description">${job.description}</p>
  <ul class="job-details">
    <li class="job-location"><strong>Location:</strong> ${job.location}</li>
    <li class="job-deadline"><strong>Deadline:</strong> ${job.deadline.slice(0,10)}</li>
    <li class="job-contact"><strong>Contact:</strong> ${job.contactPhoneNumber} / ${job.contactEmail}</li>
  </ul>
  <div class="buttonCenter"><Button class="interested" style="background-color:${color1} ;" id="but_${job._id}" onclick="interested('${job._id}')">${arch}</Button></div>
  
`;

card.addEventListener("dragstart", dragstartHandler);
card.addEventListener("dragover", dragoverHandler);
card.addEventListener("drop", dropHandler);
return card;
}
function dragstartHandler(event) {
dragCard = this;
event.dataTransfer.setData("text/html", this.innerHTML);
event.dataTransfer.effectAllowed = "move";
}

function dragoverHandler(event) {
event.preventDefault();
event.dataTransfer.dropEffect = "move";
this.classList.add("dragover");
}

function dropHandler(event) {
event.preventDefault();
event.stopPropagation();
if (dragCard !== this) {
  this.parentNode.insertBefore(dragCard, this);
}
this.classList.remove("dragover");
}

function signOut(){
  sessionStorage.clear();
  window.location="login.html"
}


function interested(_id){
  
  var but=document.getElementById(`but_${_id}`)
  if(but.innerHTML=="Interested?"){
    but.innerHTML="Already Interested"
    but.style.backgroundColor="green";
  }
  else{
    but.innerHTML="Interested?";
    but.style.backgroundColor="#4070f4";
  }
  fetch("https://nbyla-backend.onrender.com/jobs/interested", {
   method: "POST",
   body: JSON.stringify({
      _id:_id,
      user:sessionStorage.getItem("user")
  }),
   

  headers: {
      "Content-type": "application/json; charset=UTF-8"
  }
  })
}

  
