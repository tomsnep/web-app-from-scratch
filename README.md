# web-app-from-scratch
Repository for the course Web app from scratch from the minor Everything Web.


=====================
#Opdracht 2: Voor- en nadelen JavaScript libraries/frameworks onderzoeken


Het gebruik van JavaScript libraries en/of frameworks heeft voor- en nadelen. Benoem de voor- en nadelen in het algemeen en beargumenteer waarom we in dit vak geen gebruik willen maken van jQuery, maar applicaties willen maken met native JavaScript. Onderbouw je argumenten met online resources.

###Framework: 

“The framework aims to alleviate the overhead associated with common activities performed in Web development… and they often promote code reuse.”

“Een framework is bedoeld om de lastige veel voorkomende taken geassocieerd met web development te verlichten, en het hergebruiken van code te bevorderen.”



###nadelen:
	- meer requests, meer data om op te halen = negatieve invloed op laadtijd (1)
	- Je leert het framework, niet de taal. Het feit dat je jQuery kent betekent niet dat je weet hoe javascript werkt. (3)
	- Limitaties. De core van het framework kan niet worden aangepast. Dit betekent dat een framework limitaties heeft en je deze moet respecteren. (3)
	- Frameworks/libraries bevatten stukken code die niet zal worden gebruikt. (5)

###voordelen: 
	- Lost (voor een groot deel) cross-browser problemen op (jQuery) (1)
	- Efficiëntie: door pre-build functions kunnen bepaalde taken (die normaal uren duren) in enkele minuten worden gemaakt. Developen wordt makkelijker, makkelijker betekent sneller, sneller betekent efficiënter. (3)
	- Veiligheid: een veel gebruikt framework heeft veel beveilig implementatie’s. Het voordeel is de community achter het framework. (3)
	- Kosten: de meeste populair frameworks zijn gratis. Aangezien het helpt om sneller te coderen kan het ook kosten besparen op het proces. (3)
	- Meer doen met minder code (5)


Waarom geen jQuery?: wanneer je jQuery kent betekent dit niet dat je javascript kent (3)

Coderen in vanilla JS helpt de complexiteit van het probleem en de oplossing, te begrijpen omdat je alles zelf schrijft.(4)



bronnen: 

1 Why choosing vanilla javascript
http://alistapart.com/blog/post/choosing-vanilla-javascript

2 You might not need jQuery
http://youmightnotneedjquery.com/

3 Pro’s and Con’s of using frameworks
http://1stwebdesigner.com/pros-cons-frameworks/

4 Why all those Javascript libraries?
http://blog.pluralsight.com/why-all-those-javascript-libraries

5 Six reasons to use javascript libraries / frameworks
https://davidwalsh.name/6-reasons-to-use-javascript-libraries-frameworks

=====================
#Opdracht 2: Voor- en nadelen singel page web app

Een Single Page Application (SPA), ook wel een Single Page Interface (SPI) genoemd, is een webapplicatie of website die past op een enkele webpagina met het doel een vlotte gebruikerservaring te bieden, die te vergelijken is met een computerprogramma dat op de 	computer van de gebruiker zelf draait. - Wikipedia


###Voordelen

	- SPA’s zijn goed voor responsive websites. SPA’s onderscheiden zich hierin doordat zij het vermogen hebben om een deel van de UI op een andere manier te tonen zonder dat er nieuwe data moet worden opgehaald van de server. (1)
	- Gebruikers hoeven niet veel door te klikken om bij de juiste content te komen (2)


Single page apps are distinguished by their ability to redraw any part of the UI without requiring a server roundtrip to retrieve HTML. This is achieved by separating the data from the presentation of data by having a model layer that handles data and a view layer that reads from the models. (1)


###Nadelen

	- Javascript moet beschikbaar zijn (2)
	- Op mobiel moet er soms veel gescrollt worden (2)
	- Het kan erg lang duren voordat de pagina helemaal geladen is (2)



Bronnen:

1	Single Page Application: advantages and disadvantages
http://stackoverflow.com/questions/21862054/single-page-application-advantages-and-disadvantages
2	Technically speaking the pro's and con's of SPA's 	
http://www.dialogtech.com/blog/technically-speaking/technically-speaking-the-pros-and-cons-of-single-page-applications-spas



=====================

Aantekeningen live coding sessie 3 feb.

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

closure: 

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





