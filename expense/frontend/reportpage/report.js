
let daily=document.querySelector('.dailydata');
let weeklydata=document.querySelector('.weeklydata');

let monthlydata=document.querySelector('.monthlydata');
document.addEventListener('DOMContentLoaded',(e)=>{
    let token=localStorage.getItem('token');
    axios
      .get("http://localhost:8400/daily/expenses", {
        headers: { authorization: token },
      })
      .then((result) => {
        let res='';

        for(let i=0;i<result.data.length;i++){
let date = result.data[i].createdAt.split("T")[0];
            res += ` <tr class="table-light">
              <td >${date}</td>
              <td>${result.data[i].category}</td>
              <td>${result.data[i].description}</td>
              <td>${result.data[i].amount}</td>
            </tr>
`;
        }
        daily.innerHTML=res;
           
      })
      .catch((err) => {
        console.log(err);
      });
});

// monthly data
document.addEventListener("DOMContentLoaded", (e) => {
  let token = localStorage.getItem("token");
  axios
    .get("http://localhost:8400/monthly/expenses", {
      headers: { authorization: token },
    })
    .then((result) => {
      let res = "";

      for (let i = 0; i < result.data.length; i++) {
        let date = result.data[i].createdAt.split("T")[0];
        res += ` <tr class="table-light">
              <td >${date}</td>
              <td>${result.data[i].category}</td>
              <td>${result.data[i].description}</td>
              <td>${result.data[i].amount}</td>
            </tr>
`;
      }
      monthlydata.innerHTML = res;
    })
    .catch((err) => {
      console.log(err);
    });
});








// 


document.addEventListener("DOMContentLoaded", (e) => {
  let token = localStorage.getItem("token");
  axios
    .get("http://localhost:8400/daily/expenses", {
      headers: { authorization: token },
    })
    .then((result) => {
      let res = "";
      let k1=0;
      let k2=0;
      let k3=0;
      let k4=0;
      let k5=0;
      let k6=0;

      for (let i = 0; i < result.data.length; i++) {

        if(result.data[i].category=='food'){
            k1+=result.data[i].amount;

        }
        if(result.data[i].category=='glosaries'){
            k2+=result.data[i].amount;
        }
        if(result.data[i].category=='gas'){
k3+=result.data[i].amount;
        }
        if(result.data[i].category=='fuel'){
            k4+=result.data[i].amount;

        }
        if(result.data[i].category=='electricity'){
           k5+= result.data[i].amount;

        }
        if(result.data[i].category=='others'){

k6+=result.data[i].amount;
        }
      }
    //   console.log(k1,k2,k3,k4,k5,k6);


    let xValues = ["food", "fuel", "electricity", "gas", "glosaries", "others"];
    let yValues = [k1, k2, k3, k4, k5, k6];
    let barColors = ["red", "green", "blue", "orange", "yellow", "black"];

    new Chart("myChart", {
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
          text: "Daily Expenses",
        },
      },
    });


    })
    .catch((err) => {
      console.log(err);
    });

    axios.get("http://localhost:8400/weekly/expenses", {
      headers: { authorization: token },
    })
    .then(result=>{
         let k1 = 0;
         let k2 = 0;
         let k3 = 0;
         let k4 = 0;
         let k5 = 0;
         let k6 = 0;

         for (let i = 0; i < result.data.length; i++) {
           if (result.data[i].category == "food") {
             k1 += result.data[i].amount;
           }
           if (result.data[i].category == "glosaries") {
             k2 += result.data[i].amount;
           }
           if (result.data[i].category == "gas") {
             k3 += result.data[i].amount;
           }
           if (result.data[i].category == "fuel") {
             k4 += result.data[i].amount;
           }
           if (result.data[i].category == "electricity") {
             k5 += result.data[i].amount;
           }
           if (result.data[i].category == "others") {
             k6 += result.data[i].amount;
           }
         }

         let xValues = [
           "food",
           "fuel",
           "electricity",
           "gas",
           "glosaries",
           "others",
         ];
         let yValues = [k1, k2, k3, k4, k5, k6];
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
               text: "WEKLY  Expenses",
             },
           },
         });

        

    })
    .catch(err=>{
        console.log(err);
    })

    axios.get("http://localhost:8400/monthly/expenses", {
      headers: { authorization: token },
    })
    .then(result=>{
let k1 = 0;
let k2 = 0;
let k3 = 0;
let k4 = 0;
let k5 = 0;
let k6 = 0;

for (let i = 0; i < result.data.length; i++) {
  if (result.data[i].category == "food") {
    k1 += result.data[i].amount;
  }
  if (result.data[i].category == "glosaries") {
    k2 += result.data[i].amount;
  }
  if (result.data[i].category == "gas") {
    k3 += result.data[i].amount;
  }
  if (result.data[i].category == "fuel") {
    k4 += result.data[i].amount;
  }
  if (result.data[i].category == "electricity") {
    k5 += result.data[i].amount;
  }
  if (result.data[i].category == "others") {
    k6 += result.data[i].amount;
  }
}

let xValues = ["food", "fuel", "electricity", "gas", "glosaries", "others"];
let yValues = [k1, k2, k3, k4, k5, k6];
let barColors = ["red", "green", "blue", "orange", "yellow", "black"];

new Chart("myChart2", {
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
      text: "MONTHLY  Expenses",
    },
  },
});

        

    })
    .catch(err=>{

    })
});



// 



document.addEventListener("DOMContentLoaded", (e) => {
  let token = localStorage.getItem("token");
  axios
    .get("http://localhost:8400/weekly/expenses", {
      headers: { authorization: token },
    })
    .then((result) => {
      let res = "";

      for (let i = 0; i < result.data.length; i++) {
        let date = result.data[i].createdAt.split("T")[0];
        res += ` <tr class="table-light">
              <td >${date}</td>
              <td>${result.data[i].category}</td>
              <td>${result.data[i].description}</td>
              <td>${result.data[i].amount}</td>
            </tr>
`;
      }
      weeklydata.innerHTML = res;

      console.log();
    })
    .catch((err) => {
      console.log(err);
    });
});


// 
// let xValues = ["food", "fuel", "electricity", "gas", "glosaries","others"];
// let yValues = [k1, k2, k3, k4, k5,k6];
// let barColors = ["red", "green", "blue", "orange", "pink","darkgray"];

// new Chart("myChart", {
//   type: "pie",
//   data: {
//     labels: xValues,
//     datasets: [
//       {
//         backgroundColor: barColors,
//         data: yValues,
//       },
//     ],
//   },
//   options: {
//     title: {
//       display: true,
//       text: "Daily expenses",
//     },
//   },
// });


// 