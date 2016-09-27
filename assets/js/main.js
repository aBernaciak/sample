/* ZAŁOŻENIA DZIAŁANIA */
/* 
	Dieta w wariancie 1000 kcal (kwota za jeden dzień):
		śniadanie - 15 zł
		drugie śniadanie - 10 zł
		obiad - 20 zł
		podwieczorek - 10 zł
		kolacja - 15 zł
		Wzrost kaloryczności o 250 kcal powoduje wzrost ceny o 10% dla każdego posiłku
		Dieta klasyczna i wegańska nie zmieniają ceny.
*/

// calculates the total price, displays it in id="total"
	function calculateTotal(sum_price, days) {
	  var result = sum_price * days;
	  $('#total').html('Cena za '+ days +' dni<span> ' + result + ' </span>zł');
	}

	// reads the checked checkboxes, returns their sum value
	function readSumPrice(int) {
	  var sum = 0;
	  $('.posilki').each(function(i) {
	    if(this.checked) {
	      sum += Number($(this).val()) * int;
	    }
	  });
	  return sum;  
	}

	function somethingChangedCalories(caloriesMultiplier) {
	  // first we want to check if three meals have been chosen
	  var numberOfMealsChosen = $( ".posilki:checked" ).length;
	  if(numberOfMealsChosen >= 3) {
	    // now we calculate
	    var sum_price = readSumPrice(caloriesMultiplier);
	    var days = Number($('#days-input').val());
	    calculateTotal(sum_price, days);
	  }
	  else {
	    $('#total').html('Prosze wybrac przynajmniej 3 dania');
	  }
	}

	function caloriesMultiplier(varKalorie) {

		// every 250 calories all the meals costs 10% more

	  	if (varKalorie == 1000) {
		    somethingChangedCalories(1);
	  	}
	  	else if (varKalorie == 1250) {
	  		somethingChangedCalories(1.1);
	  	}
	  	else if (varKalorie == 1500) {
	  		somethingChangedCalories(1.2);
	  	}
	  	else if (varKalorie == 2000) {
	  		somethingChangedCalories(1.4);
	  	}
	  	else if (varKalorie == 2500) {
	  		somethingChangedCalories(1.6);
	  	}
	}

	// now the events
	$(document).ready(function() {
	  // click on +
	  $('.qtyplus').parent().click(function() {
	    var days = Number($('#days-input').val());
	    $('#days-input').val(days + 1);

	  	var varKalorie = $('.input-container label.active .kalorie').val();
	    caloriesMultiplier(varKalorie);
	  });

	  // click on -
	  $('.qtyminus').parent().click(function() {
	    var days = Number($('#days-input').val());
	    // let's put 0 as minimum
	    if(days > 0) {
	      $('#days-input').val(days - 1);

		  var varKalorie = $('.input-container label.active .kalorie').val();
	      caloriesMultiplier(varKalorie);
	    }
	  });

	  // click on checkbox
	  $('.dieta').click(function() {
	  	$('.input-container .dieta').parent().removeClass('active');
	  	$(this).parent().addClass('active');
	  });

	  $('.posilki').click(function() {
	  	$(this).parent().toggleClass('active');
	    
	    var varKalorie = $('.input-container label.active .kalorie').val();
	    caloriesMultiplier(varKalorie);
	  });

	  $('.kalorie').click(function() {
	  	var varKalorie = $(this).val()

	  	$('.input-container .kalorie').parent().removeClass('active');
	  	$(this).parent().addClass('active');

	  	caloriesMultiplier(varKalorie);

		});
	});