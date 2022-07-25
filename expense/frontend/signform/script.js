let name1=document.querySelector('#name');
let email1=document.querySelector('#email');
let phonenumber1=document.querySelector('#phonenumber');
let pwd1=document.querySelector('#pwd');
let btnsubmit=document.querySelector('#btnsubmit');


btnsubmit.addEventListener('click',(e)=>{
    e.preventDefault();


    let name=name1.value;
    let email=email1.value;
    let phonenumber=phonenumber1.value;
    let pwd=pwd1.value;

    let obj={
        name:name,
        email:email,
        phonenumber:phonenumber,
        pwd:pwd
    };


    


    axios
      .post("http://localhost:8400/register",obj)
      .then((result) => {

        if(result.data.suc==true){
          alert("sign up  completed ! please login into your account")
        }
        else{
  if(result.data.errors[0].message=='phonenumber must be unique'||'email must be unique'){
    alert("user already exist ! please login")
  }
        
              }

      })
      .catch((err) => {
        console.log(err);
      });


})



