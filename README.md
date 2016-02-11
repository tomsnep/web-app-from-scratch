# web-app-from-scratch
Repository for the course Web app from scratch from the minor Everything Web.

#Aantekeningen live coding sessie 3 feb.

object: 

method: 
een functie in een object

property: 
een eigenschap van een object

this: 
verwijst naar het object wat ervoor

scope:
geeft aan in welke functie je zit

globale scope:
de "moeder" scope, in het window object

functie scope:
de scope binnen een bepaalde functie, grootste voordeel hiervan is conflicten kunnen worden voorkomen

context:
het object waar je je op dat moment in bevindt, verwijst naar this


```
// closure

var pipo = {
	shoeSize: 80,
	laugh: function() {
		var self = this //closure

		setTimout(function(){
			console.log(self.shoeSize);
			},3000)
	}
}
```

iife: 
immediate invoke function expression = een functie die onmiddelijk wordt aangeroepen 

indenteren: 
tabs voor code: 

constructor: 

prototype:

variable hoisting: 
"variabelen tillen", elke keer als je een variable declareerd wordt de var naar de top van de scope getilt, dit doet javascript. De variabelen krijgen niet persee een waarde wanneer ze naar de top van de scope worden getilt

```
// object literal

var car = {
	wheels: 3,
	color: 'green',
	aesthetics: 'ugly',
	accelerate: function() {
		console.log(this.wheels)
	}
};

car.model = 'beetle' // voeg property(model) aan het object(car) toe
```

een object heeft eigenschappen: wheels / colors etc
wanneer er een functie in een object zit heet dit een method, accelerate: method

```
// iife

(function() {
	var clown = 'pipo';

	console.log('clown: ', clown);
})();
```

```
console.log('clown:', clown); // deze werkt niet, de var clown is alleen beschikbaar binnen de scope van de functie
```

door de afsluitende haakjes wordt de functie gelijk uitgevoerd

met een iife bescherm je de var's

```
var Module = (function() {
	var _private = 'This is private stuff'

	// publicFunction closes over variables of anonymous function
	var publicFunction = function() {
		console.log(_private);
	};

	return {
		publicFunction: publicFunction
	}

})();
```

binnen deze functie worden een aantal var's gemaakt (_private) en een functie (publicFunction). De anonymous function returnt een object: publicFunction. Dit object verwijst naar de function. Dus wanneer de var Module worden aangeroepen wordt, returned deze een object met een functie(publicFunction) en deze functie console.logt de var (_private). Deze variable zou zonder de var Module niet kunnen worden aangeroepen. 

```
// constructor
als een var met een hoofdletter begint is het een constructor functie

var Clown = function(name, shoeSize) {
	this.name = name;
	this.shoeSize = Shoezise;

	//define method in the constructor
	this.laugh = function(){
		console.log('hahaha, my shoes are a huge size: '+ this.shoeSize +'hasdhahdhas')
	}
}

var pipo = new Clown('pipo', 80);
var bassie = new Clown('bassie', 57);
var it = new Clown('it', 30);
```

zo maak je specifieke clowns aan. Dit zijn instanties van het type clown (var Clown)

```
// constructor

var Clown = function(name, shoeSize) {
	this.name = name;
	this.shoeSize = Shoezise;
}

//define method on the prototype object
Clown.prototype.laugh = function() {
	console.log('hahaha, my shoes are a huge size: '+ this.shoeSize +'hasdhahdhas')
}

var pipo = new Clown('pipo', 80);
var bassie = new Clown('bassie', 57);

pipo.laugh();
```

met een protoype object kan je informatie ophalen van andere prototype objecten. Bijvoorbeeld een prototype object human heeft een set emoties, deze gelden ook voor prototype object clown. Dmv het prototype object kan de clown deze set emoties overerven van de human. 


eFocus

ECMAScript 2015 / ES6 = degene die de standaard definieert

Babel (tool) ecmascript 2015 schrijven > maakt het leesbaar voor de browser (oudere versie van javascript);


let ipv var in bijv een for loop for(let i = 0) < let zit alleen in de local scope nu ipv global scope;

const is een var die je maar een keer mag declareren. 
Maar bijv wel de array.

const a = 1;

const a = [];
a.push(1,2,3) < dit mag


arrowFunction
```
<!-- var total = [1,2,3].reduce(function(a,b){
	return a + b;
}) -->
```
var total = [1,2,3].reduce((a,b) => a + b);

=> geeft een arrow function 

console.log(total);
```
```
<!-- var Counter = function() {
	this.counter =0;
	window.setInterval(function(){
		this.counter++;
		console.log(this.counter;)
	},1000)
} -->
```
var Counter = function() {
	this.counter =0;
	window.setInterval(() => {
		this.counter++;
		console.log(this.counter;)
	},1000)
}
```
met een arrow functie refereert this naar de context van de functie Counter(), ipv het window object (window.setInterval). 


Promises
```
<!-- function timeout(duration, callback){
	window.setTimeout(callback, duration);
};

timeout(1000, function(){
	console.log('test')
})
 -->
```
```
function timeout (duration) {
	return new Promise((resolve, reject) => {
		window.setTimout(function(){
			reject(duration);
		}, duration);
	});
};

timout(1000)
	.then(response => {
		return response + 10;
	})
	.then(response => {
		console.log(response)
	})
	.catch(err => {
		console.log('err');
	})

=== 1010
```
resolve staat gelinkt aan .then
rejet staat gelinkt aan .catch

.then kunnen gechaint worden, wat er in de eerste then gereturned wordt wordt meegegeven aan de volgende .then
```
<!-- Promise.all([timeout(1000), timeout(2000)])
	.then(function(response) {
		console.log(response);
	})
	.catch(function(err) {
		console.log(err);
	}) -->
```
```
Promise.all([timeout(1000), timeout(2000)])
	.then(response => {
		console.log(response);
	})
	.catch(err => {
		console.log(err);
	})
```
```
function getWebsite(url) {
		return new Promise(function(resolve,reject) {
			var request = new XMLHttpRequest();
			
			request.onloadstart = function() {
				showLoader();
			}

			request.onloadend = function() {
				hideLoad();
			}

			request.onload = fcuntion(response) {
				resolve(response);
			}

			request.onload = resolve;
			request.onerror = reject;

			request.open('GET', url, true);
			request.send();
		});
};

getWebsite('http://www.google.nl')
	.then(function(response) {
		console.log(response);
	})
	.catch(function(reject))
```

recursive function
```

function add (a) {
	return function (b){
		console.log(a + b);
	};
};

add(5)(5) ==== 10 
```

