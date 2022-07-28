let email2=document.querySelector('#emaillog');


let btn=document.querySelector('#btnlogin');
let pwdlink = document.querySelector(".pwdlink");

btn.addEventListener('click',(e)=>{
e.preventDefault();

let email=email2.value;

axios.post("http://localhost:8400/forgot/password",{email}).then(result=>{
    if(result.data==null){
pwdlink.innerHTML="Email not Found"
    }
    else{
console.log(result.data);

pwdlink.innerHTML=result.data;

    }
})
.catch(err=>{
    console.log(err);
})


})