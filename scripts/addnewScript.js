function submitJob(){
    var title=document.getElementById("job-title").value;
    var location=document.getElementById("job-location").value;
    var deadline=document.getElementById("job-deadline").value;
    var description=document.getElementById("job-description").value;
    var contactPhoneNumber=document.getElementById("contact-phone").value;
    var contactEmail=document.getElementById("contact-email").value;

    fetch("https://nbyla-backend.onrender.com/jobs/add", {
     method: "POST",
     body: JSON.stringify({
        title:title,
        location:location,
        deadline:deadline,
        description:description,
        contactPhoneNumber:contactPhoneNumber,
        contactEmail:contactEmail
    }),
     

    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
    })
    .then(response => {response.json()
           
    })
    

    
}