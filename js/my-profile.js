let name = document.getElementById('insertName');
let secondName = document.getElementById('inserSecondName');
let lastName = document.getElementById('insertLastName');
let secondLastName = document.getElementById('insertSecondLastName');
let email = document.getElementById('elEmail');
let telephone = document.getElementById('insertTelephone');
let saveProfile = document.getElementById('saveProfile')





elEmail.value = localStorage.getItem("email")
document.getElementById('elEmail').innerHTML = localStorage.getItem('email');

saveProfile.addEventListener('click', function(){
    let profile = {
        name: insertName.value,
        secondname: insertSecondName.value,
        lastname: insertLastName.value,
        secondlastname: insertSecondLastName.value,
        email: insertEmail.value,
        telephone: insertTelephone.value
     }


        
    let jsonProfile = JSON.stringify(profile);
    localStorage.setItem('profile', jsonProfile);
    localStorage.setItem('email', profile.email);
    document.getElementById('userEmail').innerHTML = profile.email; 

    document.getElementById('secondname').innerHTML = profile.secondname;
    document.getElementById('lastname').innerHTML = profile.lastname;
    document.getElementById('name').innerHTML = profile.name;
    document.getElementById('secondlastname').innerHTML = profile.secondlastname;
    document.getElementById('telephone').innerHTML = profile.telephone;
    $('#changeProfile').modal('hide')
    
})



let buttonModal = document.getElementById('buttonModal');
if(!localStorage.getItem('email')){
    buttonModal.disabled = true;
    document.getElementById('ifNotUser').innerHTML = `
    <span class="badge-danger p-1" >Debe Iniciar sesión para modificar su perfil</span>
    ` 
}

document.addEventListener("DOMContentLoaded", function (e) {
    let jsonParseado = JSON.parse(localStorage.getItem('profile'));
    document.getElementById('name').innerHTML = jsonParseado.name;
    document.getElementById('secondname').innerHTML = jsonParseado.secondname;
    document.getElementById('lastname').innerHTML = jsonParseado.lastname;
    document.getElementById('secondlastname').innerHTML = jsonParseado.secondlastname;
    document.getElementById('telephone').innerHTML = jsonParseado.telephone;
    
});
