window.onload = function() {
    if(localStorage.getItem("session_token")===null){
        swal({
            title: "Oppss!",
            text: "You must Log in first.",
            icon: "warning",
            }).then((result) => {
            if (result) {
                window.location.href = 'login.html';
              }
        });
    }
    contents = fetchData();
}

async function fetchData(){
    const response = await fetch("https://softeng.jbtabz.com/enrollments?page=1&limit=50", {
        headers: {
            'X-Component-Key': localStorage.getItem("component_key"),
            'X-Session-Token': localStorage.getItem("session_token"),
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
        }
    });
    const data = await response.json().then(data => {
        drawTable(data);
    });

    async function drawTable(data){
        var htmlcontent = "";
        var btn = document.createElement("button");
        var btn = '<button onclick="action()" class="btn-btn-primary";"><i class="fa fa-eye" aria-hidden="true"></i></button>';
        for (i=0; i<data.length; i++){
            // var btn = '<button onclick="document.getElementById(\'id01\').style.display=\'block\';" class="btn-btn-primary";"><i class="fa fa-eye" aria-hidden="true"></i></button>';
            let name = data[i].student_first_name + ' ' + data[i].student_middle_name + ' ' + data[i].student_last_name;
            htmlcontent += "<tr><td>"  + await getData(data[i].student_first_name, "name")
                        +  "</td><td>" + name
                        +  "</td><td>" + data[i].course_name
                        +  "</td><td>" + await getData(data[i].student_first_name, "sex")
                        +  "</td><td>" + data[i].course_schedule_year_level
                        +  "</td><td>" + data[i].status
                        +  "</td><td>" + btn
                        +  "</td></tr>";
        }
        document.getElementById("table").insertAdjacentHTML('beforeend', htmlcontent);
    }

    async function getData(name, need){
        const response = await fetch("https://softeng.jbtabz.com/search/students/"+name+"?page=1&limit=50", {
        headers: {
            'X-Component-Key': localStorage.getItem("component_key"),
            'X-Session-Token': localStorage.getItem("session_token"),
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
        }
        });
        const data = await response.json().then(data => {
            if(need == "name"){
                return data[0].school_id;
            } else if(need == "sex"){
                return data[0].sex;
            }
        });
        return data;
    }
}

function action(){
    document.getElementById('id01').style.display='block';
}