
let dropoptions = document.querySelector(".dropoptions");
let droper=document.querySelector('#droper');
let addexpensebtn = document.querySelector("#addexpensebtn");
let amount1=document.querySelector('#amount');
let category1 = document.querySelector("#category");
let description1=document.querySelector('#description');
let userdeatail=document.querySelector('.userdetail');
let expensedetails = document.querySelector(".expensedetails");
let alertpopup = document.querySelector("#alertpopup");
let ifempty=document.querySelector('.ifempty');
let logout=document.querySelector('#logout');
let dropshow=document.querySelector('#dropshow');
let subscriptionbtn=document.querySelector('#buysub');
let hidedrop = document.querySelector("#hidedrop");
let body = document.querySelector("body");
let subfeature = document.querySelector(".subfeatures");
let whitetheme=document.querySelector('#whitetheme');
let pag=document.querySelector('.pag');



addexpensebtn.addEventListener('click',(e)=>{
    let token = localStorage.getItem("token");

    e.preventDefault();
    let amount=amount1.value;
    let category=category1.value;
    let description=description1.value;


if(amount==""||category==""||description==""){
alertempty(e);
}
else{
    let obj={
        amount:amount,
        category:category,
        description:description
    }

    axios.post("http://localhost:8400/addexpense",{obj},{ headers: {"authorization" : token} })
    .then(result=>{
        console.log(result.data.result);
        getallexpenses();
        AlertItem(e);
        amount1.value="";
        category1.value="";
        description1.value="";
    })
    .catch(err=>{
        console.log(err);
    })

}

});

document.addEventListener('DOMContentLoaded',()=>{
        let token = localStorage.getItem("token");
        axios
          .get("http://localhost:8400/getexpenses", {
            headers: { authorization: token },
          })
          .then((result) => {
            let k1 = 0;
            let k2 = 0;
            let k3 = 0;
            let k4 = 0;
            let k5 = 0;
            let k6 = 0;
            console.log(result.data.result[1].category);

            for (let j = 0; j < result.data.result.length; j++) {
              if (result.data.result[j].category == "food") {
                k1 += result.data.result[j].amount;
              }
              if (result.data.result[j].category == "glosaries") {
                k2 += result.data.result[j].amount;
              }
              if (result.data.result[j].category == "gas") {
                k3 += result.data.result[j].amount;
              }
              if (result.data.result[j].category == "fuel") {
                k4 += result.data.result[j].amount;
              }
              if (result.data.result[j].category == "electricity") {
                k5 += result.data.result[j].amount;
              }
              if (result.data.result[j].category == "others") {
                k6 += result.data.result[j].amount;
              }
            }
              console.log(k1,k2,k3,k4,k5,k6);
            let xValues = [
              "food",
              "fuel",
              "electricity",
              "gas",
              "glosaries",
              "others",
            ];
            let yValues = [k1, k4, k5, k3, k2, k6];
            let barColors = [
              "red",
              "green",
              "blue",
              "orange",
              "yellow",
              "black",
            ];

            new Chart("myChart1", {
              type: "pie",
              data: {
                labels: xValues,
                datasets: [
                  {
                    backgroundColor: barColors,
                    data: yValues,
                  },
                ],
              },
              options: {
                title: {
                  display: true,
                  text: "all  Expenses",
                },
              },
            });
          })
          .catch((err) => {
            console.log(err);
          });

axios.get("http://localhost:8400/getuserdata",{ headers: {"authorization" : token} })
.then(result=>{

if(result.data.suc=='yes'){

    userdeatail.innerHTML = result.data.result[0].name.split(" ")[0]; 
}
 

})
.then(err=>{
    console.log(err);
});

});
getallexpenses();


function getallexpenses(){
        let token = localStorage.getItem("token");

    axios
      .get("http://localhost:8400/limitexpenses?page=0&limit=10", {
        headers: { authorization: token },
      })
      .then((result) => {
        let allexp = "";
        console.log(result);

        for (let i = 0; i < result.data.result.length; i++) {
          let res = result.data.result[i];

          allexp += `
        <div class="singleexpense" >

        <span class="gprice">${res.amount}</span>
        <span class="gcategory">${res.category}</span>
        <span class="gdescription" style="font-size:16px;">${res.description}</span>
        <button id="${res.id}"  style="background-color:red; float:right; color:white; border:none; padding:6px; margin-top:-8px;"><i class="fa-solid fa-trash"></i></button>
        </div>
        `;
        }
        expensedetails.innerHTML = allexp;

      })
      .catch((err) => {
        console.log(err);
      });
};



function AlertItem(e) {
  const notification = document.createElement("div");
  notification.classList.add("notification");
  notification.innerHTML = `<h5> your expense stored </h5>`;
  alertpopup.appendChild(notification);
  setTimeout(() => {
    notification.remove();
  }, 2800);
}

function alertempty(e) {
  const notification = document.createElement("div");
  notification.classList.add("alertempty");
  notification.innerHTML = `<h6> please enter all the feilds </h6>`;
  alertpopup.appendChild(notification);
  setTimeout(() => {
    notification.remove();
  }, 4800);
}

logout.addEventListener('click',()=>{

  let result=  confirm("do you want to loggout ");
  if(result){
    localStorage.clear();
    location.replace('../login/login.html')
  }

});

dropshow.addEventListener('click',(e)=>{ 
dropoptions.style.display='block';
});
hidedrop.addEventListener("click", () => {
  dropoptions.style.display = "none";
});

document.addEventListener("DOMContentLoaded", () => {
  let token = localStorage.getItem("token");

  axios
    .get("http://localhost:8400/getuserdata", {
      headers: { authorization: token },
    })
    .then((result) => {
      if (result.data.result[0].issubcribed == true) {
        subfeature.innerHTML = `
     <li class="text-dark" id="subscriptiontheme" >dark gray theme</li>
                  <li><a href="../leaderboard/board.html" id="leaderboard">leaderboard</a></li>
             <li><a href="../reportpage/report.html" id="report">report</a></li>

        `;

        let subscriptiontheme = document.querySelector("#subscriptiontheme");
        let leaderboard = document.querySelector("#leaderboard");
        let report = document.querySelector("#report");

        subscriptiontheme.addEventListener("click", () => {
          body.style.backgroundColor='darkgray';
        });

      }
    })
    .then((err) => {
      console.log(err);
    });
});


subscriptionbtn.addEventListener('click', buySubscription);

async function buySubscription(e){
        let token = localStorage.getItem("token");

    e.preventDefault();
        const response = await axios.get("http://localhost:8400/subscription", {
          headers: { authorization: token },
        });
        console.log(response);
        var options = {
          key: response.data.key_id, // Enter the Key ID generated from the Dashboard
          name: "siva tech",
          order_id: response.data.order.id, // For one time payment
          prefill: {
            name: "siva ",
            email: "siva@example.com",
            contact: "9347633052",
          },
          theme: {
            color: "#528FF0",
          },
          //  handle the success payment
          handler: function (response) {
            console.log(response);
            axios
              .post(
                "http://localhost:8400/updatetransaction",
                {
                  order_id: options.order_id,
                  payment_id: response.razorpay_payment_id,
                },
                { headers: { authorization: token } }
              )
              .then(() => {
                alert("You are a Premium User Now");
                location.reload();
              })
              .catch(() => {
                alert("Something went wrong. Try Again!!!");
              });
          },
        };


      const rzp1 = new Razorpay(options);
      rzp1.open();
      e.preventDefault();

      rzp1.on('payment.failed', function (response){
        alert("payment failed");
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
    });

  }

  expensedetails.addEventListener('click',(e)=>{
    let token=localStorage.getItem('token');

    if(e.target.classList.contains('fa-trash')){
      let id = e.target.parentElement.id;
      axios.delete(
          `http://localhost:8400/delete/expense/${id}
`,
          { headers: { authorization: token } }
        )
        .then((result) => {
          getallexpenses();
        })
        .catch((err) => {
          console.log(err);
        });
console.log(e.target.parentElement.id);
    }
  })


  
let c = 0;
let cc = 1;

let k = Number(localStorage.getItem("count"));

function btnlimit() {
  let token = localStorage.getItem("token");
  axios
    .get(`http://localhost:8400/getexpenses`, {
      headers: { authorization: token },
    })
    .then((result) => {
      let k = 10;

      let j = Math.trunc((result.data.result.length / k) + 1);
      console.log(k);

      for (let i = 0; i < j; i++) {
        pag.innerHTML += `<button class="allbtns" id="?page=${c++}&limit=${k}">${cc++}</button> `;
      }
    });
}
pag.addEventListener("click", (e) => {
  let token = localStorage.getItem("token");
  console.log(e.target.id);
  let t = e.target.id;

  axios
    .get(`http://localhost:8400/limitexpenses${t}`, {
      headers: { authorization: token },
    })
    .then((result) => {
              let allexp = "";
              console.log(result);

              for (let i = 0; i < result.data.result.length; i++) {
                let res = result.data.result[i];
                console.log(res.id);

                allexp += `
        <div class="singleexpense" >

        <span class="gprice">${res.amount}</span>
        <span class="gcategory">${res.category}</span>
        <span class="gdescription" style="font-size:16px;">${res.description}</span>
        <button id="${res.id}"  style="background-color:red; float:right; color:white; border:none; padding:6px; margin-top:-8px;"><i class="fa-solid fa-trash"></i></button>
        </div>
        `;
              }
              expensedetails.innerHTML = allexp;

      
    })
    .catch((err) => {
      console.log(err);
    });
});


btnlimit();
