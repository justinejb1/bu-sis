window.onload = function() {
    isLoggedIn();
}

function isLoggedIn () {
    const token = localStorage.getItem('session_token')
    if (!token){       
        swal({
            title: "Oppss!",
            text: "You must Log in first.",
            icon: "warning",
          }).then((result) => {
            if (result) {
              window.location.href = "login.html";
            }else{
                swal("Please Wait! hihi", {
                    title: "Loading...",
                    button: false,
                    timer: 1000,
                  });
            }
          });
          
    } 
}