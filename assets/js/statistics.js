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
    fetchDataEnrollment();
    fetchDataStudent();
  };
  
  async function fetchTwoData(data) {
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
    provinceChart(elements);
    genderChart(elements);
  }
  
  async function fetchDataStudent() {
    const response = await fetch(
      "https://softeng.jbtabz.com/enrollments",
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
      fetchTwoData(data);
    });
  }
  
  async function fetchDataEnrollment() {
    const response = await fetch(
      "https://softeng.jbtabz.com/enrollments",
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
      departmentChart(data);
      headCount(data);
      yearChart(data);
      // attendanceChart();
    });
  }
  // functional
  function headCount(data) {
    let regular = 0;
    let irregular = 0;
    let transferee = 0;
  
    for (i = 0; i < data.length; i++) {
      if (data[i].status == "Regular") {
        regular++;
      } else if (data[i].status == "Irregular") {
        irregular++;
      } else if (data[i].status == "Transferee") {
        transferee++;
      }
    }
  
    document.getElementById("enrolled").innerHTML =
      "<center>" + data.length + "</center>";
    document.getElementById("regular").innerHTML =
      "<center>" + regular + "</center>";
    document.getElementById("irregular").innerHTML =
      "<center>" + irregular + "</center>";
    document.getElementById("transferee").innerHTML =
      "<center>" + transferee + "</center>";
  }
  // functional
  function yearChart(data) {
    var student = {
      first: 0,
      second: 0,
      third: 0,
      fourth: 0,
      fifth: 0,
    };
  
    for (i = 0; i < data.length; i++) {
      switch (data[i].course_schedule_year_level) {
        case "First Year":
          student.first++;
          break;
        case "Second Year":
          student.second++;
          break;
        case "Third Year":
          student.third++;
          break;
        case "Fourth Year":
          student.fourth++;
          break;
        default:
          student.fifth++;
          break;
      }
    }
    var data4 = google.visualization.arrayToDataTable([
      [
        "Year Level",
        "1st Year",
        "2nd Year",
        "3rd Year",
        "4th Year",
        "5th Year",
        { role: "annotation" },
      ],
      [
        "Student",
        student.first,
        student.second,
        student.third,
        student.fourth,
        student.fifth,
        "",
      ],
    ]);
    var options4 = {
      legend: { position: "top", maxLines: 3 },
      bar: { groupWidth: "75%" },
      isStacked: true,
    };
    var chart4 = new google.visualization.BarChart(
      document.getElementById("dual_x_div")
    );
    chart4.draw(data4, options4);
  }
  // functional
  function genderChart(data) {
    var gender = {
      male: 0,
      female: 0,
      others: 0,
    };
  
    for (i of data) {
      switch (i.sex) {
        case "Male":
          gender.male++;
          break;
        case "Female":
          gender.female++;
          break;
        default:
          gender.others++;
          break;
      }
    }
    var data2 = google.visualization.arrayToDataTable([
      ["Gender", "No. of Student"],
      ["Male", gender.male],
      ["Female", gender.female],
      ["Others", gender.others],
    ]);
  
    var options2 = {
      title: "Student Gender",
    };
    var chart2 = new google.visualization.PieChart(
      document.getElementById("donutchart")
    );
    chart2.draw(data2, options2);
  }
  // functional
  function provinceChart(data) {
    var province = {
      albay: 0,
      camnorte: 0,
      camsur: 0,
      catanduanes: 0,
      masbate: 0,
      sorsogon: 0,
      others: 0,
    };
    for (i = 0; i < data.length; i++) {
      switch (data[i].a_province) {
        case "Albay":
          province.albay++;
          break;
        case "Camarines Norte":
          province.camnorte++;
          break;
        case "Camarines Sur":
          province.camsur++;
          break;
        case "Catanduanes":
          province.catanduanes++;
          break;
        case "Masbate":
          province.masbate++;
          break;
        case "Sorsogon":
          province.sorsogon++;
          break;
        default:
          province.others++;
          break;
      }
    }
    var data5 = google.visualization.arrayToDataTable([
      ["Province", "Total No. of Students"],
      ["Albay", province.albay],
      ["Camarines Norte", province.camnorte],
      ["Camarines Sur", province.camsur],
      ["Catanduanes", province.catanduanes],
      ["Masbate", province.masbate],
      ["Sorsogon", province.sorsogon],
      ["Others", province.others],
    ]);
    var options5 = {
      title: "Geographical Data of Students",
      pieHole: 0.4,
    };
    var chart5 = new google.visualization.PieChart(
      document.getElementById("studpop")
    );
    chart5.draw(data5, options5);
  }
  // functional
  function departmentChart(data) {
    var department = {
      gc: 0,
      pc: 0,
      tc: 0,
      cn: 0,
      cs: 0,
      ce: 0,
      cal: 0,
      cit: 0,
      caf: 0,
      ceng: 0,
      cssp: 0,
      cbem: 0,
      ipesr: 0,
      ia: 0,
      others: 0,
    };
  
    for (i = 0; i < data.length; i++) {
      switch (data[i].department_name) {
        case "Gubat Campus (GC)":
          department.gc++;
          break;
        case "Polangui Campus":
          department.pc++;
          break;
        case "Tabaco Campus":
          department.tc++;
          break;
        case "College of Agriculture and Forestry":
          department.caf++;
          break;
        case "College of Industrial Technology":
          department.cit++;
          break;
        case "College of Business, Economics and Management":
          department.cbem++;
          break;
        case "College of Social Sciences and Philosophy":
          department.cssp++;
          break;
        case "Institute of Physical Education Sports and Recreation":
          department.ipesr++;
          break;
        case "College of Nursing":
          department.cn++;
          break;
        case "College of Science":
          department.cs++;
          break;
        case "College of Education":
          department.ce++;
          break;
        case "College of Engineering":
          department.ceng++;
          break;
        case "College of Arts and Letters":
          department.cal++;
          break;
        case "Institute of Architecture":
          department.ia++;
          break;
        default:
          department.others++;
          break;
      }
    }
  
    var data = google.visualization.arrayToDataTable([
      ["Language", "Speakers (in millions)"],
      ["BUCS", department.cs],
      ["BUCN", department.cn],
      ["BUPC", department.pc],
      ["BUCSSP", department.cssp],
      ["BUCBEM", department.cbem],
      ["BUCAL", department.cal],
      ["BUCENG", department.ceng],
      ["BUIA", department.ia],
      ["BUIPESR", department.ipesr],
      ["BUTC", department.tc],
      ["BUCAF", department.caf],
      ["BUGC", department.gc],
      ["BUCE", department.ce],
      ["BUCIT", department.cit],
      ["OTHERS", department.others],
    ]);
    var options = {
      title: "Student Population by Department",
      pieSliceText: "label",
      slices: {
        4: { offset: 0.2 },
        12: { offset: 0.3 },
        14: { offset: 0.4 },
        15: { offset: 0.5 },
      },
    };
    var chart = new google.visualization.PieChart(
      document.getElementById("piechart")
    );
    chart.draw(data, options);
  }
  