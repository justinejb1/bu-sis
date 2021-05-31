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
  
  async function fetchCourse() {
    const response = await fetch(
      "https://softeng.jbtabz.com/courses?page=1&limit=50",
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
    const data = await response.json();
    return data;
  }
  
  async function fetchData() {
    const response = await fetch(
      "https://softeng.jbtabz.com/departments?page=1&limit=50",
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
      drawTable(data);
    });
  }
  
  async function drawTable(data) {
    var table = document.getElementById("table");
    var thead, th, td, tbody;
  
    table.appendChild((thead = document.createElement("thead")));
    thead.appendChild((tr = document.createElement("tr")));
    tr.appendChild((td = document.createElement("td")));
    td.innerHTML = "ID";
    td.style.fontWeight = "bold";
    td.style.fontSize = "1rem";
    tr.appendChild((td = document.createElement("td")));
    td.innerHTML = "Department Name";
    td.style.fontWeight = "bold";
    td.style.fontSize = "1rem";
    tr.appendChild((td = document.createElement("td")));
    td.innerHTML = "Action";
    td.style.fontWeight = "bold";
    td.style.fontSize = "1rem";
    table.appendChild((tbody = document.createElement("tbody")));
    tr.setAttribute("id", "table-data");
  
    for (i = 0; i < data.length; i++) {
      let entry = data[i];
      tr = document.createElement("tr");
      tr.setAttribute("id", "row" + i);
      tbody.appendChild(tr);
  
      td = document.createElement("td");
      td.innerHTML = entry.id;
      tr.appendChild(td);
  
      td = document.createElement("td");
      td.innerHTML = entry.name;
      tr.appendChild(td);
  
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "btn-btn-primary btn-sm";
      btn.id = "btn" + i;
      btn.innerHTML = '<i class="fa fa-eye" aria-hidden="true"></i>';
      btn.onclick = (function (entry) {
        return function () {
          click(entry);
        };
      })(entry);
      tr.appendChild(btn);
    }
  
    async function click(_data) {
      document.getElementById("id01").style.display = "block";
      let count = 0;
      var populace = [];
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
        for (i = 0; i < data.length; i++) {
          if (data[i].department_name == _data.name) {
            populace.push(data[i]);
            count++;
          }
        }
        graphEmAll(populace, _data.name);
        document.getElementById("population").innerHTML = count;
      });
    }
  }
  
  async function graphEmAll(data, deptname) {
    let names = [];
    let regular = 0;
    let irregular = 0;
    let transferee = 0;
    var opened = false;
  
    if (opened == false) {
      opened = true;
      genderChart(0, 0, 0);
      courseChart([], []);
    }
  
    for (i = 0; i < data.length; i++) {
      names.push(data[i].student_id);
      if (data[i].status == "Regular") {
        regular++;
      } else if (data[i].status == "Irregular") {
        irregular++;
      } else if (data[i].status == "Transferee") {
        transferee++;
      }
    }
    document.getElementById("regular").innerHTML = regular;
    document.getElementById("irregular").innerHTML = irregular;
    document.getElementById("transferee").innerHTML = transferee;
  
    if (names.length > 0) {
      let male = 0;
      let female = 0;
      let others = 0;
      var getData = [];
      var courses = [];
  
      for (course of await fetchCourse()) {
        if (course.department_name == deptname) {
          courses.push(course.name);
        }
      }
      var coursepop = Array(courses.length).fill(0);
  
      for (i = 0; i < data.length; i++) {
        for (j = 0; j < courses.length; j++) {
          if (data[i].course_name == courses[j]) {
            coursepop[j]++;
          }
        }
      }
      courseChart(courses, coursepop);
  
      for (const name of names) {
        getData.push(
          fetch("https://softeng.jbtabz.com/student/" + name, {
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
      let students = await Promise.all(getData);
  
      for (student of students) {
        if (student.sex == "Male") {
          male++;
        } else if (student.sex == "Female") {
          female++;
        } else {
          others++;
        }
      }
      genderChart(male, female, others);
    }
  
    document.getElementById("modalbtn").onclick = function () {
      document.getElementById("id01").style.display = "none";
      document.getElementById("regular").innerHTML = 0;
      document.getElementById("irregular").innerHTML = 0;
      document.getElementById("transferee").innerHTML = 0;
      male = 0;
      female = 0;
      others = 0;
      names = [];
      data = [];
  
      var data = google.visualization.arrayToDataTable([
        ["Course", "No. of Student"],
      ]);
      var options = {
        title: "Course Population",
      };
      var chart = new google.visualization.PieChart(
        document.getElementById("donutchart")
      );
      chart.draw(data, options);
  
      var data2 = google.visualization.arrayToDataTable([
        ["Gender", "No. of Student"],
      ]);
      var options2 = {
        title: "Student Gender",
      };
      var chart2 = new google.visualization.PieChart(
        document.getElementById("donutchart")
      );
      chart2.draw(data2, options2);
    };
  }
  
  function courseChart(courses, coursepop) {
    var content = Array(courses.length).fill([]);
    for (i = 0; i < courses.length; i++) {
      content[i] = [courses[i], coursepop[i]];
    }
  
    var data2 = google.visualization.arrayToDataTable([
      ["Course", "No. of Student"],
    ]);
    var options2 = {
      title: "Course Population",
    };
  
    if (data2.getColumnLabel(1) == "No. of Student") {
      data2.addColumn("number", "Your Values", "col_id");
      data2.removeColumn(1);
      options2.legend = { position: "right" };
    }
  
    var chart2 = new google.visualization.PieChart(
      document.getElementById("piechart")
    );
    for (let i = 0; i < courses.length; i++) {
      data2.addRow([courses[i], coursepop[i]]);
    }
    chart2.draw(data2, options2);
  }
  
  function genderChart(male, female, others) {
    var data2 = google.visualization.arrayToDataTable([
      ["Gender", "No. of Student"],
    ]);
    var options2 = {
      title: "Student Gender",
    };
  
    if (data2.getColumnLabel(1) == "No. of Student") {
      data2.addColumn("number", "Your Values", "col_id");
      data2.removeColumn(1);
      options2.legend = { position: "right" };
    }
    var chart2 = new google.visualization.PieChart(
      document.getElementById("donutchart")
    );
    data2.addRow(["Male", male]);
    data2.addRow(["Female", female]);
    data2.addRow(["Others", others]);
    chart2.draw(data2, options2);
  }
  
  $(document).ready(function () {
    $("#search").on("keyup", function () {
      var value = $(this).val().toLowerCase();
      $("tbody tr ").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
      });
    });
  });
  