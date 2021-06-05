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
function strf(){
    let tt=0, t=0, gantValues = 0 ;
    let colors = ["orange", "yellow", "lightpurple", "pink", "green", "lightblue"];
    for(let i=0; i<a.length; i++)
        tt += a[i].bt;
    while (t!=tt){
        for(let i=0; i<a.length; i++){
            if(t==a[i].at){
                b.push(a[i]);
                b.sort(function(x, y){return x.rt-y.rt});
            }
        }
        t++;
        if(b.length > 0){
            document.querySelector("#gantt").innerHTML += `<span class="gChart onhover" style = "background-color:${colors[b[0].pid-1]}; color:black; box-shadow: 0 0 5px white;">p${b[0].pid}</span>`;
            document.querySelector("#gantvalues").innerHTML += `<span class="gChart gChartValues">${gantValues++}</span>`;
            b[0].rt -= 1;
            if(b[0].rt==0){
                b[0].ct=t;
                b.shift();
            }
        }
    }
    document.querySelector("#gantvalues").innerHTML += `<span class="gChart gChartValues">${gantValues}</span>`; 
}

function display(){
    let waitingTime = [];
    let tat = [];
    let avgWaitingTime = 0;
    let avgTAT = 0;
    document.querySelector("h4").innerHTML += "<hr>GANTT CHART";
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
    document.querySelector("#totalavg").style.paddingBottom = "50px";
    document.querySelector("#totalavg").innerHTML += `<div>Average waiting time is: ${avgWaitingTime.toPrecision(3)}</div><div>Average turn around time is: ${avgTAT.toPrecision(3)}</div>`;
}

let inputNumber;
let arrivalTime = [];
let burstTime = [];

document.querySelector("#submit").addEventListener("click", function () {
    inputNumber = Number(document.querySelector("#input").value);
    if (inputNumber > 6 || inputNumber < 1) alert("Number should be greater than 0 and less than 7");
    else {
        for (let i = 0; i < inputNumber; i++) {
            document.querySelector("#info").innerHTML += '<div><label>P' + (i + 1) + '</label><input type="number" id="A' + i + '" placeholder="Arrival' + (i + 1) + '"><input type="number" id="B' + (i) + '" placeholder="Burst' + (i + 1) + '"></div>';
        }
        document.querySelector("#info").innerHTML += '<button type="submit" id="submitAB">Submit</button>';
        document.querySelector("#submitAB").addEventListener("click",display);
    }
});