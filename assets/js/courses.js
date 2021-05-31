
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
    fetchData();
  };

async function fetchData(){
    const response = await fetch("https://softeng.jbtabz.com/courses?page=1&limit=50", {
        headers: {
            'X-Component-Key': localStorage.getItem("component_key"),
            'X-Session-Token': localStorage.getItem("session_token"),
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
        }
    });
    const data = await response.json().then(data => {
        filter(data);
    });
}

async function filter(_data){
    var courses = [];
    for(dt of _data){
        courses.push(dt.name);
    }
    var total = Array(courses.length).fill(0);
    var regular = Array(courses.length).fill(0);
    var irregular = Array(courses.length).fill(0);
    
    const response = await fetch("https://softeng.jbtabz.com/enrollments?page=1&limit=50", {
        headers: {
            'X-Component-Key': localStorage.getItem("component_key"),
            'X-Session-Token': localStorage.getItem("session_token"),
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
        }
    });
    const data = await response.json().then(data => {
        for (let i=0; i<courses.length; i++) {
            for (let j=0; j<data.length; j++) {
                if(courses[i] == data[j].course_name){
                    total[i]++;
                    if(data[j].status == "Regular"){
                        regular[i]++;
                    } else if(data[j].status == "Irregular"){
                        irregular[i]++;
                    }
                }
            }
        }
        drawTable(_data, total, regular, irregular);
    });
}

function drawTable(data, total, regular, irregular){
    var table = document.getElementById("table");
    var htmlcontent = "";
    // var tr, td;
    // var thead, tr, td;
    // table.appendChild(thead = document.createElement("thead"));
    // thead.appendChild(tr = document.createElement("tr1"));
    // tr.appendChild(td = document.createElement("td"));
    // td.innerHTML = "Course Code";
    // tr.appendChild(td = document.createElement("td"));
    // td.innerHTML = "Course";
    // tr.appendChild(td = document.createElement("td"));
    // td.innerHTML = "Total No. of Students";
    // tr.appendChild(td = document.createElement("td"));
    // td.innerHTML = "Total No. of Regular Students";
    // tr.appendChild(td = document.createElement("td"));
    // td.innerHTML = "Total No. of Irregular Students";

    for (let i=0; i<data.length; i++) {
        htmlcontent += "<tr><td>"+data[i].code +"</td>"+ "<td>"+data[i].name +"</td>"+
                           "<td>"+total[i] +"</td>" +  "<td>"+regular[i] +"</td>" + 
                           "<td>"+irregular[i] +"</td></tr>";
        // tr = document.createElement("tr");
        // tr.setAttribute("id", "row"+i);
        // table.appendChild(tr)

        // td = document.createElement("td");
        // td.innerHTML = data[i].code
        // tr.appendChild(td)

        // td = document.createElement("td");
        // td.innerHTML = data[i].name
        // tr.appendChild(td)
    }
    table.insertAdjacentHTML('beforeend', htmlcontent);
}