
let tbody = document.querySelector("#tbody");
document.addEventListener('DOMContentLoaded',()=>{

    let token=localStorage.getItem('token');

    axios
      .get("http://localhost:8400/leaderdata", {
        headers: { authorization: token },
      })
      .then((result) => {
        let res='';

        for(let i=0;i<result.data.length;i++){
            res += `
                <tr>
      <td>  ${result.data[i].name}</td>
      <td>${result.data[i].total_amount}</td>
    </tr> 
            `;
        }

        tbody.innerHTML=res;

    })
      .catch((err) => {
        console.log(err);
      });
})