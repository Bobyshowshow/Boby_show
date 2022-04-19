const getData = async () => {
    fetch('https://api.pancakeswap.info/api/v2/tokens/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c')
   .then(response => response.json())
   .then(data => {
     document.getElementById("priceBNB").innerHTML = parseFloat(data.data.price).toFixed(2)
   });
  }
  getData();

  
// Price_timer
tcount = setInterval(function(){
    tcount++
    if (tcount==10) {
      getData();
      tcount=0;
    }
  },1000);


const getTX = async () => {


    const url1 = 'https://api.bscscan.com/api?module=account&action=txlistinternal&from=0x9e1e8343a3cae07881307f3c29ea40cae3cac049&address=';
    const url2 = document.getElementById("Wallet").value;
    const url3 = '&startblock=0&endblock=999999999&sort=desc&apikey=JWQSFDGYWHBB5JB3CRS58SCPFIB8CJ6SD8%27';
    const url = url1 + url2 + url3;

    fetch(url)
    .then((Response) => {
        return Response.json();
    }).then((data) => {
        //console.log(data.result);
        
        const results = data.result;
        let somme = 0;
        let tx = 0;
        //convert
        const convert = document.getElementById("priceBNB").innerHTML;
        

        //reset à zero
        document.getElementById("bu-table-cc-body").innerHTML = '';
        
        
        //console.log(results);
        results.forEach((result) => { 
          if (result.from == '0x9e1e8343a3cae07881307f3c29ea40cae3cac049') {

            //filter
            const B = result.from;
            //value $, BNB, Date
            const A = (result.value / 10 ** 18) * convert;
            const E = (result.value / 10 ** 18);
            const C = result.hash; 
            const D = new Date(result.timeStamp * 1000);
            const currentDayOfMonth = D.getUTCDate();
            const currentMonth = D.getUTCMonth(); 
            const currentYear = D.getUTCFullYear();
            const currentH = D.getUTCHours();
            const currentM = D.getUTCMinutes();
            const dateString = (currentMonth + 1) + "-" + currentDayOfMonth + "-" + currentYear + " " + currentH  + ":" + currentM;

            //Date
            document.getElementById("bu-table-cc-body").innerHTML += '<tr><td>'+dateString+'</td><td>'+parseFloat(E).toFixed(4)+'</td><td>'+parseFloat(A).toFixed(2)+'</td><td>'+C+'</td></tr>';
           
            //Somme
            somme += A;
            // incrémentation de 1
            tx++;
          } 
        });
         //Transactions
        document.getElementById("tx").innerHTML = tx; 
        document.getElementById("total").innerHTML = '$' + parseFloat(somme).toFixed(2);
    })
}

document.getElementById("btn").addEventListener("click", getTX);




