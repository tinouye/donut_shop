function shop(name,min,max,avg){
	this.name = name;
	this.min = min;
	this.max = max;
	this.avg = avg;
}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
shop.prototype.runsim = function(){
	var counter = 0;
	for(var i=0;i<12;i++){
		var output = Math.ceil(getRandomInt(this.min,this.max)*this.avg);
		var cell = document.createElement('td');
		var num = document.createTextNode(output);
		counter += output;
		cell.appendChild(num);
		document.getElementById(this.name).appendChild(cell);
	}
	var sumcell = document.createElement('td');
	var sum = document.createTextNode(counter);
	sumcell.appendChild(sum);
	document.getElementById(this.name).appendChild(sumcell);
}
var downtown = new shop('downtown',8,43,4.5);
var caphill = new shop('caphill',4,37,2);
var slu = new shop('slu',9,23,(6+1/3));
var wedge = new shop('wedge',2,28,1.25);
var ballard = new shop ('ballard',8,58,3.75);
downtown.runsim();
caphill.runsim();
slu.runsim();
wedge.runsim();
ballard.runsim();