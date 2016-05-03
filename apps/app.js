"use strict";

console.log("Black Pearl Pirate Bar");

/*-------------------------------------------------------------------
-------------CONSTRUCTORS : QUESTION/ INGREDIENT/ PANTRY ------------*/
var Question = function(question, category) {
	this.question = question;
	this.category = category;
};

var Ingredient = function(category, ingredient) {
	this.category = category;
	this.ingredient = ingredient;
};

var Pantry = function(nameOfThePantry) {
	this.name = nameOfThePantry; //name of the Pantry
	this.ingredients = {}; //is going to be an object. that contains the category + the items on that category
};

Pantry.prototype = {
	constructor: Pantry, 

	//Adds/Brings ingredients from Ingredient construtor to pantry; 
	addIngredient : function(what) {
		this.ingredients[what.category] = what.ingredient;
		// this.ingredients[salty] = ['Olive on a stick', 'salt-dusted rim', 'rasher of bacon'];
	},
	getIngredients : function(userChoices) {
		var currentIngredients = [];
		var finalIngredients = [];

		for(var i = 0; i < userChoices.length; i++) {
			currentIngredients.push(this.ingredients[userChoices[i]]); //creates a single array with all the elements in the selected categories
		};
		for(var i = 0; i < 3; i++) {
			var randomIndex = Math.round(Math.random() * userChoices.length); //picks 3 random numbers to be passed as indexes 
			finalIngredients.push(currentIngredients[randomIndex]); //this picks the 3 elements to create the Drink Ingredients :) 
		};
		return finalIngredients;
	}
};

var Worker = function(typeOfWorker) {
	this.name = typeOfWorker;
	this.customers = {}; //to store the customers name
	this.questions = []; //grabs the Question constructor to ask questions
};

Worker.prototype = {
	constructor: Worker,

	//Grabs the question from Question constructor and Adds it to the worker.
	addQuestion : function(newQuestion) {
		this.questions.push(newQuestion);		
	},
	//This will display the selected Questions to ask in the HTML
	askQuestions : function() {
		var displayQuestion = "";
		for(var index = 0; index < this.questions.length; index++) {
			 displayQuestion += this.questions[index].question;
			 displayQuestion += "<input type='checkbox' class='question-to-ask' name='preference'>";
			 displayQuestion += "value='" + this.questions[index].category + "'/><br/>"
		};
		displayQuestion += "<input type='submit' class='submit-order btn button' value='I feel lucky!'>";
		$('.ask-preferences').html(displayQuestion);
	},
	//from the current customer, this method grabs the selected options (preferences) and make an order & save it
	addPreferences : function(userChoices) {
		this.preferences = userChoices;
	},
	//This adds a customer with its unique drink name = item
	addCustomer : function(customer, drinkName) {
		this.customers[customer] = drinkName;
	},
	//for reOrders of saved customers.
	findCustomer : function(customer) {
		var loyalCustomer = this.customers.hasOwnProperty(customer) ? this.customers[customer] : false;
		return loyalCustomer;
	},
	//Returns the name of the drink with its ingredients
	printOrder : function(drinkName) {
		$('#drinkDisplay').html('The' + drinkName.name +
		'contains these ingredients: <br/>' + drinkName.ingredients + '.');
	}
};
/*-------------------------------------------------------------------
------------Inheritance Application --------------------------------*/

//1st child of Worker
var Bartender = function(name) {
	Worker.call(this, name);
};
Bartender.prototype = Object.create(Worker.prototype); //Now Bartender inherits the properties from Worker
Bartender.prototype.constructor = Bartender; 

// Methods of Bartender 
Bartender.prototype.nameDrink = function(){
		var drinkName = "";
		var words = {	
			nouns : ["Dog", "Mermaid", "Dolphin", "Piranha"],
			adjectives : ["Sassy", "Crazy", "Breezy", "Sunburned"]
		};
		drinkName += words.adjectives[Math.Round(Math.random() * words.adjectives.length)];
		drinkName += " " + word.nouns[Math.Round(Math.random() * words.nouns.length)];
			return drinkName;
};
Bartender.prototype.createDrink = function(pantry){
		var drink = {
			ingredients : pantry,
			name: this.nameDrink()
		};
		//Bartender properties: customer and customerDrink
		this.customers[name] = drink;
		drink.ingredients = drink.ingredients.join(', ');
		this.printOrder(drink);
};
/*-------------------------------------------------------------------
-------------Instances of: QUESTION/ INGREDIENT /PANTRY /BARTENDER(WORKER)------------*/

//Instance of Pantry
var itemInStock = new Pantry("pantry");
var bar = new Bartender("bar");


//Instances of Question
var questionToAsk = new Question('Do ye like yer drinks strong?', 'strong');
bar.addQuestion(questionToAsk);
var questionToAsk = new Question('Do ye like it with a salty tang?','salty');
bar.addQuestion(questionToAsk); 
var questionToAsk = new Question('Are ye a lubber who likes it bitter?','bitter');
bar.addQuestion(questionToAsk); 
var questionToAsk = new Question('Would ye like a bit of sweetness with yer poison?','sweet');
bar.addQuestion(questionToAsk); 
var questionToAsk = new Question('Are ye one for a fruity finish?','fruity');
bar.addQuestion(questionToAsk); 

//Instances of Ingredient then grabed to be placed in the PANTRY
var newIngredient = new Ingredient('strong',['Glug of rum', 'slug of whisky', 'splash of gin']);
	//this will create the object ingredients in the PANTRY and organize them by category
itemInStock.addIngredient(newIngredient);
var newIngredient = new Ingredient('salty',['Olive on a stick','salt-dusted rim', 'rasher of bacon']);
itemInStock.addIngredient(newIngredient);
var newIngredient = new Ingredient('bitter',['Shake of bitters', 'splash of tonic', 'twist of lemon peel']);
itemInStock.addIngredient(newIngredient);
var newIngredient = new Ingredient('sweet',['Sugar cube', 'spoonful of honey', 'splash of cola']);
itemInStock.addIngredient(newIngredient);
var newIngredient = new Ingredient('fruity',['Slice of orange', 'dash of cassis', 'cherry on top']);
