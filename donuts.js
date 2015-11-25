var data = {
  labels: ["7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00","14:00","15:00","16:00",],
  datasets: []
};
var chart; 
	

//Shop constructor
function shop(name,min,max,avg){
	this.name = name;
	this.min = min;
	this.max = max;
	this.avg = avg;
}

//RNG
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Run simulation
function runSim(){
//NUKE IT
	if (chart) {
	  chart.destroy();
	}
	while(simtable.childNodes[0]){
		simtable.removeChild(simtable.childNodes[0]);
	}

	//console.log(data.datasets);
	if(data.datasets.length>0){
		
		data.datasets=[];
	}
	console.log(data.datasets);
	var even = false;
	var counter = 0;
	console.log(data.datasets);
	allShops.forEach(function(obj){
		data.datasets.push({
		  label: obj.name,
		  fillColor: "rgba(220,220,220,0.2)",
		  strokeColor: "rgba(220,220,220,1)",
		  pointColor: "rgba(220,220,220,1)",
		  pointStrokeColor: "#fff",
		  pointHighlightFill: "#fff",
		  pointHighlightStroke: "rgba(220,220,220,1)",
		  data: []
		});
		var total = 0;
		var row = document.createElement('tr');
		if(even===true){
			row.className='even';
			even=false;
		}
		else if(even===false){
			row.className='odd';
			even=true;
		}
		var loc = document.createElement('td');
		var loctx = document.createTextNode(obj.name);
		loc.appendChild(loctx);
		row.appendChild(loc);
		simtable.appendChild(row);
		
		for(var i=0;i<12;i++){
			var output = Math.round(getRandomInt(obj.min,obj.max)*obj.avg);
			data.datasets[counter].data.push(output);
			var num = document.createTextNode(output);
			var cell = document.createElement('td');
			total += output;
			cell.appendChild(num);
			row.appendChild(cell);
		}
		var sumcell = document.createElement('td');
		if(obj.name==='Police Station'){
			sum = document.createTextNode('Quality comedy hahaha');
		}
		else{
			var sum = document.createTextNode(total);
		}
		sumcell.appendChild(sum);
		row.appendChild(sumcell);
		counter++;
	});
	chart = new Chart(ctx).Line(data);
}


//DOM access
var uform = document.getElementById('uform');
var simtable = document.getElementById('simtable');
var ctx = document.getElementById("myChart").getContext("2d");

//Construct new shop objects
var downtown = new shop('Downtown',8,43,4.5);
var caphill = new shop('Capitol Hill',4,37,2);
var slu = new shop('South Lake Union',9,23,(6+1/3));
var wedge = new shop('Wedgewood',2,28,1.25);
var ballard = new shop ('Ballard',8,58,3.75);

var allShops = [downtown,caphill,slu,wedge,ballard]


//Run simulations using new objects
runSim();

//Add user input to simuation
var newsim = function(event){
	event.preventDefault();

	if(!event.target.loc.value){
		runSim();
	}
	else{
		var uloc = event.target.loc.value;
		var umin = event.target.minc.value;
		var umax = event.target.maxc.value;
		var uavg = event.target.avgd.value;
		
		var isNew = true;
		for(var i=0;i<allShops.length;i++){
			if(uloc===allShops[i].name){
				allShops[i].min = umin;
				allShops[i].max = umax;
				allShops[i].avg = uavg;
				var isNew = false;
			}
		}
		if(isNew === true){
			if(uloc === 'Police Station'){
				newloc = new shop(uloc,9999,9999,1);
			}
			else{
			var newloc = new shop(uloc,umin,umax,uavg);
			}
			allShops.push(newloc);
		}
		runSim();
	}
}

//event listener
uform.addEventListener('submit',newsim);
/*
  var chart = new Chart(ctx).Line(data);
  chart.update(
  chart.destroy()
  */
  

var chart = new Chart(ctx).Line(data);