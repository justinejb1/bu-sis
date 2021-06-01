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
    const headers = ["enrollments", "attendances", "courses", "departments"];
    let values = await Promise.all([
      fetch("https://softeng.jbtabz.com/enrollments", {
        headers: {
          "X-Component-Key": localStorage.getItem("component_key"),
          "X-Session-Token": localStorage.getItem("session_token"),
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept",
        },
      }).then((response) => response.json()),
      fetch("https://softeng.jbtabz.com/attendances", {
        headers: {
          "X-Component-Key": localStorage.getItem("component_key"),
          "X-Session-Token": localStorage.getItem("session_token"),
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept",
        },
      }).then((response) => response.json()),
      fetch("https://softeng.jbtabz.com/courses", {
        headers: {
          "X-Component-Key": localStorage.getItem("component_key"),
          "X-Session-Token": localStorage.getItem("session_token"),
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept",
        },
      }).then((response) => response.json()),
      fetch("https://softeng.jbtabz.com/departments", {
        headers: {
          "X-Component-Key": localStorage.getItem("component_key"),
          "X-Session-Token": localStorage.getItem("session_token"),
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept",
        },
      }).then((response) => response.json()),
    ]);
    for (let i = 0; i < headers.length; i++) {
      document.getElementById(headers[i]).innerHTML = values[i].length;
    }
  }
  