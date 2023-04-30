function register(){
    const name=document.getElementById("regName").value;
    const password=document.getElementById("regPassword").value;
    const cnfrm=document.getElementById("confirmRegPassword").value;
    var role=document.getElementById("loginRole").value;

    if (cnfrm!=password){
        window.alert("passwords dont match");
        window.location="reg.html";
    }
    else if(password.length<8){
        window.alert("password insufficent length");
        window.location="reg.html";
    }
    else{
    
        fetch("https://nbyla-backend.onrender.com/users/add", {
        method: "POST",
        body: JSON.stringify({
            name:name,
            role:role,
            password:password
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
        })   
        .then(response => response.json())
        .then(json => {
            console.log(json);
            
                sessionStorage.setItem("user",name);
                sessionStorage.setItem("role",role);
                sessionStorage.setItem("user_id",json._id);
                if(role=="terraformer"){
                    window.location="tdashboard.html";
                }
                else{
                window.location="dashboard.html"
                }
      
        });
    
    }
}


//Login
function login(){
    var name=document.getElementById("loginName").value;
    var password=document.getElementById("loginPassword").value;
    var role=document.getElementById("loginRole").value;
    fetch("https://nbyla-backend.onrender.com/users/validate", {
     method: "POST",
     body: JSON.stringify({
        name:name,
        
        password:password
    }),
     

    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
    })
    
    .then(response => response.json())
    .then(json => {
        console.log(json.validate,role,json.role);
        if (json.validate && role==json.role){
            sessionStorage.setItem("user",name);
            sessionStorage.setItem("role",role);
            sessionStorage.setItem("user_id",json._id);
            if(role=="terraformer"){
                window.location="tdashboard.html";
            }
            else{
            window.location="dashboard.html"
            }
        }
        else{
            window.alert("wrong Credentials or wrong Role");
            sessionStorage.clear();
            window.location="login.html";
        }
    });



}

