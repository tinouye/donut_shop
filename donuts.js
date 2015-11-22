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

/* New or edit
function newOrEdit(newName){
	var testArr = allShops.filter(function(existing){
		return existing.name === newName;
	}).map(function(num){
		return num;
	});
	if(testArr.length<1){
		return true;
	}
	else{
		return testArr[0];
	}
	
	for(var i=0;i<allShops.length;i++){
		if(newName===allShops[i].name){
			
}
*/

//Generate table
//shop.prototype.runSim = function(){
function runSim(){
//NUKE IT
	while(simtable.childNodes[0]){
		simtable.removeChild(simtable.childNodes[0]);
	}
	allShops.forEach(function(obj){
		var counter = 0;
		var row = document.createElement('tr');
		var loc = document.createElement('td');
		var loctx = document.createTextNode(obj.name);
		loc.appendChild(loctx);
		row.appendChild(loc);
		simtable.appendChild(row);
		
		for(var i=0;i<12;i++){
			var output = Math.ceil(getRandomInt(obj.min,obj.max)*obj.avg);
			var num = document.createTextNode(output);
			var cell = document.createElement('td');
			counter += output;
			cell.appendChild(num);
			row.appendChild(cell);
		}
		var sumcell = document.createElement('td');
		if(obj.name==='Police Station'){
			sum = document.createTextNode('Quality comedy hahaha');
		}
		else{
			var sum = document.createTextNode(counter);
		}
		sumcell.appendChild(sum);
		row.appendChild(sumcell);
	});
}


//DOM access
var uform = document.getElementById('uform');
var simtable = document.getElementById('simtable');

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
			console.log(allShops);
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
	console.log(isNew);
	console.log(allShops);
}

//event listener
uform.addEventListener('submit',newsim);







