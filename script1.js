class node{
    pid; at; bt; rt; ct=0;
    constructor(pid, at, bt){
        this.pid = pid;
        this.at = at;
        this.bt = bt;
        this.rt = bt;
    }
}
let a=[], b=[];
// function insert(){
//     for(i=0;i<n;i++){
//         a.push(new node(i+1, i+2, Math.floor((Math.random() * 4) + 1)));
//     }
// }

function strf(){
    let tt=0, t=0, gantValues = 0 ;
    for(i=0; i<a.length; i++)
        tt += a[i].bt;
    while (t!=tt){
        for(i=0; i<a.length; i++){
            if(t==a[i].at){
                b.push(a[i]);
                b.sort(function(x, y){return x.rt-y.rt});
            }
        }
        t++;
        if(b.length > 0){
            // console.log("|P"+b[0].pid);
            document.querySelector("#gantt").innerHTML += `<span class="gChart" style = "background-color:${colors[b[0].pid-1]}; color:black; box-shadow: 0 0 5px white; position: relative; animation: mymove${b[0].pid % 2}to${b[0].pid % 2} 3s 1;">p${b[0].pid}</span>`;
            document.querySelector("#gantvalues").innerHTML += `<span class="gChart gChartValues" style="position: relative; animation: mymove${b[0].pid % 2}to${b[0].pid % 2} 3s 1;">${gantValues++}</span>`;
            b[0].rt -= 1;
            if(b[0].rt==0){
                b[0].ct=t;
                b.shift();
            }
        }
    } document.querySelector("#gantvalues").innerHTML += `<span class="gChart gChartValues" style="position: relative; animation: mymove1to1 3s 1;">${gantValues}</span>`; 
}

// let n=3;
//insert();
// a.push(new node(1, 0, 7));
// a.push(new node(2, 1, 3));
// a.push(new node(3, 3, 4));
// console.log(a);
// strf();
// console.log(a);
var inputNumber;
var arrivalTime = [];
var burstTime = [];
let waitingTime = [];
let tat = [];
let avgWaitingTime = 0;
let avgTAT = 0;
// var sum = 0;
var colors = ["orange", "yellow", "lightpurple", "pink", "green", "lightblue"];
document.querySelector("#submit").addEventListener("click", function () {
    inputNumber = Number(document.querySelector("#input").value);
    if (inputNumber > 6 || inputNumber < 1) alert("Number should be greater than 0 and less than 7");
    else {
        for (var i = 0; i < inputNumber; i++) {
            document.querySelector("#info").innerHTML += '<div><label>P' + (i + 1) + '</label><input type="number" id="A' + i + '" class="arriveinput" placeholder="Arrival' + (i + 1) + '"><input type="number" id="B' + (i) + '" class="burstinput" placeholder="Burst' + (i + 1) + '"></div>';
        }
        document.querySelector("#info").innerHTML += '<button type="submit" id="submitAB">Submit</button>';
        document.querySelector("#submitAB").addEventListener("click",display);
    }
});
function display(){
    // document.querySelector("#inputtable").innerHTML += `<div class="row">
    // <div class="col"><b>Process</b></div>
    // <div class="col"><b>Arrival time</b></div>
    // <div class="col"><b>Burst time</b></div>
    // </div>`;
    // console.log(arrivalTime, burstTime);
    document.querySelector("p").innerHTML = `GANTT CHART`;
    document.querySelector("#inputtable").innerHTML += `<table id = "table"><thead>
    <tr>
        <th>Process</th>
        <th>Arrival time</th>
        <th>Burst time</th>
        <th>Waiting time</th>
        <th>Turn around time</th>
    </tr></thead></table>`;
    for(let i = 0; i < inputNumber; i++){
        arrivalTime.push(document.querySelector(`#A${i}`).value);
        burstTime.push(document.querySelector(`#B${i}`).value);
        document.querySelector("#table").innerHTML += 
        `<tr id = "trow${i}">
            <td>P${i+1}</td>
            <td>${arrivalTime[i]}</td>
            <td>${burstTime[i]}</td>
        </tr>`
    }
    // document.querySelector("#gantt").innerHTML += 
    for(let i = 0; i < inputNumber; i++)
        a.push(new node(i+1, arrivalTime[i],burstTime[i]));
    strf();
    for(let i = 0; i < inputNumber; i++){
        waitingTime.push(a[i].ct - a[i].bt - a[i].at);
        tat.push(a[i].ct - a[i].at);
        document.querySelector(`#trow${i}`).innerHTML += `<td>${waitingTime[i]}</td>
        <td>${tat[i]}</td>`;
        avgWaitingTime += waitingTime[i];
        avgTAT += tat[i];
    }
    avgWaitingTime /= inputNumber;
    avgTAT /= inputNumber;
    document.querySelector("#totalavg").innerHTML += `<div>Average waiting time is: ${avgWaitingTime.toPrecision(3)}</div><div>Average turn around time is: ${avgTAT.toPrecision(3)}</div>`;
}