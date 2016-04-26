$(document).ready(function() {
	console.log('Pirate Bartender');

/*-------------DATABASE. Constructors ------------
-----(for questions, ingredients, and the pantry)---*/
//store the ingredients per category: 
  var pantry = {
	strongIngredients: ["Glug of rum", "slug of whisky", "splash of gin"],
	saltyingredients: ["Olive on a stick", "salt-dusted rim", "rasher of bacon"],
	bitterIngredients: ["Shake of bitters", "splash of tonic", "twist of lemon peel"],
	sweetIngredients: ["Sugar cube", "spoonful of honey", "splash of cola"],
	fruityIngredients: ["Slice of orange", "dash of cassis", "cherry on top"],
  }

  $('.resultDrink').hide();

  $('form').on('submit', function(event) {
		  event.preventDefault();

	  //store the user selected ingredient
	  var selectedIngredient = [];

	  $('select').each(function() {
	  	selectedIngredient.push($(this).val() === 'yes' ? true : false);
  	 });
	  console.log(selectedIngredient);
  });

});