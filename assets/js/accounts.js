window.onload = function () {
    if (localStorage.getItem("session_token") === null) {
      swal({
        title: "Oppss!",
        text: "You must Log in first.",
        icon: "warning",
      }).then((result) => {
        if (result) {
          window.location.href = "login.html";
        }
      });
    } else {
      swal("Please Wait! hihi", {
        title: "Loading...",
        button: false,
        timer: 1000,
      });
    }
    contents = fetchData();
  };
  
  async function fetchData() {
    const response = await fetch("https://softeng.jbtabz.com/auth/whoami", {
      headers: {
        "X-Component-Key": localStorage.getItem("component_key"),
        "X-Session-Token": localStorage.getItem("session_token"),
      },
    });
    const data = await response.json().then((data) => {
      if (data.phone_number === null) {
        document.getElementById("phone_number").innerHTML = "None";
      } else {
        document.getElementById("phone_number").innerHTML = data.phone_number;
      }
      document.getElementById("name").innerHTML =
        data.first_name + " " + data.middle_name + " " + data.last_name;
      document.getElementById("username").innerHTML = data.username;
      document.getElementById("username").innerHTML = data.username;
      document.getElementById("address").innerHTML = data.address;
      document.getElementById("privilege").innerHTML = data.privilege;
    });
    return data;
  }
  