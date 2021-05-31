window.onload = function() {
    contents = fetchData();
}

async function fetchData(){
    const response = await fetch("https://softeng.jbtabz.com/auth/whoami", {
        headers: {
            'X-Component-Key': localStorage.getItem("component_key"),
            'X-Session-Token': localStorage.getItem("session_token")
        }
    })
    const data = await response.json().then(data => {
        if(data.phone_number === null){
            document.getElementById("phone_number").innerHTML = "None";
        } else {
            
        document.getElementById("phone_number").innerHTML = data.phone_number;
        }
        document.getElementById("name").innerHTML = data.first_name + ' ' + data.middle_name + ' ' + data.last_name;        document.getElementById("username").innerHTML = data.username;
        document.getElementById("username").innerHTML = data.username;
        document.getElementById("address").innerHTML = data.address;
        document.getElementById("privilege").innerHTML = data.privilege;
    });
    return data;
}