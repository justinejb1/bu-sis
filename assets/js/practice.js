let enrolled = document.getElementById("enrolled");
window.onload = function() {
    contents = fetchData();
}

async function fetchData(){
    const response = await fetch("http://localhost:8081/auth/login", {
        headers: {
            'X-Component-Key': localStorage.getItem("component_key"),
            'X-Session-Token': localStorage.getItem("session_token")
        }
    })
    const data = await response.json().then(data => {
        // console.log(data);
        enrolled.innerHTML = data.length;
        drawTable(data);
    });
}

function drawTable(_data){
    var student = document.getElementById("table");
    var htmlcontent = ""
    var male = 0;
    var female = 0;

    for(i=0; i<_data.length; i++){
        if(_data[i].sex == 'Male'){
            male++;
        }
        if(_data[i].sex == 'Female'){
            female++;
        }
        htmlcontent += "<tr><td>"  + _data[i].id             + "</td><td>" + _data[i].school_id    +
                       "</td><td>" + _data[i].first_name     + "</td><td>" + _data[i].middle_name  + 
                       "</td><td>" + _data[i].last_name      + "</td><td>" + _data[i].sex          + 
                       "</td><td>" + _data[i].birth_date     + "</td><td>" + _data[i].address      + 
                       "</td><td>" + _data[i].email_address  + "</td><td>" + _data[i].phone_number + 
                       "</td></tr>";
    }
    student.insertAdjacentHTML('beforeend', htmlcontent);

    google.charts.load("current", {packages:["corechart"]});
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
    var data = google.visualization.arrayToDataTable([
        ['Gender', 'No. of Student'],
        ['Male', male],
        ['Female', female]
    ]);

    var options = {
        title: 'Student Gender',
        is3D: true,
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
    chart.draw(data, options);
    }
}

