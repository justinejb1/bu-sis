
function signout(){
    swal({
        title: "Ready to Leave?",
        text: "Click OK to leave. Cancel to stay",
        icon: "info",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          logout();
        } else {
          return;
        }
      });
}

async function logout(){
    const out = await fetch('https://softeng.jbtabz.com/auth/logout', {
        headers: {
             'X-Session-Token': localStorage.getItem("session_token"),
             'X-Component-Key': localStorage.getItem("component_key")
        }
    });
    const status = await out.json(); 
    if(status.code == 200){
        localStorage.removeItem("session_token");
        localStorage.removeItem("component_key");
        window.location.href = "login.html";
    }
}