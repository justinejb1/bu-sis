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
    const response = await fetch(
      "https://softeng.jbtabz.com/enrollments?page=1&limit=50",
      {
        headers: {
          "X-Component-Key": localStorage.getItem("component_key"),
          "X-Session-Token": localStorage.getItem("session_token"),
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept",
        },
      }
    );
    const data = await response.json().then((data) => {
      dummy(data);
    });
  
    async function dummy(data) {
      var names = [];
      for (const student of data) {
        names.push(
          fetch("https://softeng.jbtabz.com/student/" + student.student_id, {
            headers: {
              "X-Component-Key": localStorage.getItem("component_key"),
              "X-Session-Token": localStorage.getItem("session_token"),
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Headers":
                "Origin, X-Requested-With, Content-Type, Accept",
            },
          }).then((response) => response.json())
        );
      }
      let students = await Promise.all(names);
      let elements = [];
      for (student of students) {
        elements.push(student);
      }
      drawTable(elements, data);
    }
  
    function drawTable(data1, data2) {
      var table = document.getElementById("table");
      var thead, th, td, tbody;

      table.appendChild((thead = document.createElement("thead")));
      thead.appendChild((tr = document.createElement("tr")));
      tr.appendChild((td = document.createElement("td")));
      td.innerHTML = "School ID";
      td.style.fontWeight = "bold";
      td.style.fontSize = "1rem";
      tr.appendChild((td = document.createElement("td")));
      td.innerHTML = "Name";
      td.style.fontWeight = "bold";
      td.style.fontSize = "1rem";
      tr.appendChild((td = document.createElement("td")));
      td.innerHTML = "Course";
      td.style.fontWeight = "bold";
      td.style.fontSize = "1rem";
      tr.appendChild((td = document.createElement("td")));
      td.innerHTML = "Sex";
      td.style.fontWeight = "bold";
      td.style.fontSize = "1rem";
      tr.appendChild((td = document.createElement("td")));
      td.innerHTML = "Year";
      td.style.fontWeight = "bold";
      td.style.fontSize = "1rem";
      tr.appendChild((td = document.createElement("td")));
      td.innerHTML = "Status";
      td.style.fontWeight = "bold";
      td.style.fontSize = "1rem";
      tr.appendChild((td = document.createElement("td")));
      td.innerHTML = "Action";
      td.style.fontWeight = "bold";
      td.style.fontSize = "1rem";
      table.appendChild((tbody = document.createElement("tbody")));
      tr.setAttribute("id", "table-data");
      
  
      for (i = 0; i < data1.length; i++) {
        tr = document.createElement("tr");
        tr.setAttribute("id", "row" + i);
        tbody.appendChild(tr);
        let entry1 = data1[i];
        let entry2 = data2[i];
        td = document.createElement("td");
        td.innerHTML = entry1.school_id;
        tr.appendChild(td);
  
        let name = "";
        if (entry1.middle_name == "N/A") {
          name = entry1.first_name + " " + entry1.last_name;
        } else {
          name =
            entry1.first_name + " " + entry1.middle_name + " " + entry1.last_name;
        }
        td = document.createElement("td");
        td.innerHTML = name;
        tr.appendChild(td);
  
        td = document.createElement("td");
        td.innerHTML = entry2.course_name;
        tr.appendChild(td);
  
        td = document.createElement("td");
        td.innerHTML = entry1.sex;
        tr.appendChild(td);
  
        td = document.createElement("td");
        td.innerHTML = entry2.course_schedule_year_level;
        tr.appendChild(td);
  
        td = document.createElement("td");
        if(entry2.status == "Regular"){
            td.innerHTML = '<span class="badge success">'+entry2.status+'</span>';
        }else if(entry2.status == "Irregular"){
            td.innerHTML = '<span class="badge failed">'+entry2.status+'</span>';
        } else{
            td.innerHTML = '<span class="badge trans">'+entry2.status+'</span>';
        }
        tr.appendChild(td);
  
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "btn-btn-primary";
        btn.id = "btn" + i;
        btn.innerHTML = '<i class="fa fa-eye" aria-hidden="true"></i>';
        btn.onclick = (function (entry1, entry2) {
          return function () {
            asd(entry1, entry2);
          };
        })(entry1, entry2);
        tr.appendChild(btn);
      }
      function asd(entry1, entry2) {
        document.getElementById("id01").style.display = "block";
        document.getElementById("school_id").innerHTML = entry1.school_id;
        document.getElementById("email").innerHTML = entry1.email_address;
        document.getElementById("name").innerHTML =
          entry1.first_name + " " + entry1.middle_name + " " + entry1.last_name;
        document.getElementById("address").innerHTML = entry1.address;
        document.getElementById("phone_number").innerHTML = entry1.phone_number;
        document.getElementById("department").innerHTML = entry2.department_name;
        document.getElementById("block").innerHTML = entry2.course_schedule_name;
        document.getElementById("birthdate").innerHTML = entry1.birth_date;
      }
    }
  }
  