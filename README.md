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





