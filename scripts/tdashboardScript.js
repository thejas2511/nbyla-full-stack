function checkStatus(){
    const user=sessionStorage.getItem("user");
    const role=sessionStorage.getItem("role");
    if (!user){
        window.alert("login/Register First")
        window.location="login.html";
    }
    if(role=="applicant"){
      window.alert("Not an applicant");
      window.location="login.html";
    }
}

var br=0;

fetch("https://nbyla-backend.onrender.com/jobs/get", {})
    
    .then(response => response.json())
    .then(json=>{const jobsContainer = document.getElementById("jobs-container");
    json.forEach(job => {
      const card = generateJobCard(job);      
      jobsContainer.appendChild(card);
    });
  })




  function generateJobCard(job) {

    const card = document.createElement("div");
    card.className = "job-card";
    card.draggable = true;
    var color;
    var arch,color1;
    var interestedUsers="";
    var interested=job.interested;
    for(var i=0;i<interested.length;i++){
      interestedUsers=interestedUsers+`<li><a href="#">${interested[i]}</a></li>`
    }
    console.log(interestedUsers);
    var dead=Math.floor(Math.abs(new Date(job.deadline.slice(0,10)) - new Date()) / (1000 * 60 * 60 * 24));
 
    if (dead>=21){color="green"}
    else if(dead>3 && dead<21){color="yellow"}
    else if(dead<3){color="red"}
    
    if (job.isArchived==true){
      arch="Archived";
      color1="red";
    }
    else{
      arch="Archive";
      color1="#4070f4";
    }


  
  
    
    card.innerHTML = `
        
      <h3 class="job-title" style="background-color:${color};text-align:center"}>${job.title}</h3>
      
      <ul class="job-details">
      <li class="job-ldescription"><strong>Description:</strong> ${job.description}</li>
        <li class="job-location"><strong>Location:</strong> ${job.location}</li>
        <li class="job-deadline"><strong>Deadline:</strong> ${job.deadline.slice(0,10)}</li>
        <li class="job-contact"><strong>Contact:</strong> ${job.contactPhoneNumber} / ${job.contactEmail}</li>
        
      </ul>
      <div class="buttonCenter">
      <div class="dropdown">
            <button class="dropdown_button"
                onclick="show_list('${job._id}')">
                See Interested
            </button>
 
            <div id="dropdown_id_${job._id}" class="dropdown-content">
                ${interestedUsers}
            </div>
    </div>
      <Button class="archive" style="background-color:${color1} ;" id="but_${job._id}" onclick="archive('${job._id}')">${arch}</Button>
      </div>
      
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

  function archive(_id){
    console.log(_id);
    var but=document.getElementById(`but_${_id}`)
    if(but.innerHTML=="Archive"){
      but.innerHTML="Archived"
      but.style.backgroundColor="red";
    }
    else{
      but.innerHTML="Archive";
      but.style.backgroundColor="#4070f4";
    }
    fetch("https://nbyla-backend.onrender.com/jobs/archive", {
     method: "POST",
     body: JSON.stringify({
        _id:_id
    }),
     

    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
    })
  }


  function addNew(){
    window.location="addNew.html"
  }

  function signOut(){
    sessionStorage.clear();
    window.location="login.html"
  }

  function show_list(id) {
    var dropdown = document.getElementById("dropdown_id_"+id);

    if (dropdown.style.display == "block") {
        dropdown.style.display = "none";
    } else {
        dropdown.style.display = "block";
    }
  }
    window.onclick = function (event) {
    if (!event.target.matches('.dropdown_button')) {
        document.getElementById('dropdown_id')
            .style.display = "none";
    }
  }   
  

  
