// window.addEventListener('load', function(){

// 	var checkboxes = document.getElementsByClassName('checkbox');

// 	var showCreateForm = function(){
// 		alert('test');
// 	}

// 	var changeCheckboxValue = function(){
// 		if(this.checked){
// 			this.value = 1;
// 		}else{
// 			this.value = 0;
// 		}
// 	}

// 	document.getElementById('create_goal').addEventListener('click', showCreateForm);
	
// 	for (var i = 0; i < checkboxes.length; i++) {
// 		checkboxes[i].addEventListener('change', changeCheckboxValue);
// 	}
// });

$(document).ready(function(){

	if($('div').is('#show_goal') && $('#start_or_stop_goal_btn').html() == 'Stop Goal'){
		// timer('start');
		var testest = setInterval(timer, 1000);
	}

	function timer(){

			var timeText = $('#goal_timer').html();

			if(timeText.includes('Days')){
				var timeText = $('#goal_timer').html();
				var myDays = timeText.substr(0, timeText.indexOf('Day')); 
				var myHours = timeText.substring(10, 12);
				var myMinutes = timeText.substring(13, 15);
				var mySeconds = timeText.substring(16, 18);
				var myTime = getNewTime(myHours, myMinutes, mySeconds);
				$('#goal_timer').html(myDays + 'Days' + '<br>' + myTime + 'h');
			}else if(timeText.includes('Day')){
				var timeText = $('#goal_timer').html();
				var myDays = timeText.substr(0, timeText.indexOf('Day')); 
				var myHours = timeText.substring(9, 11);
				var myMinutes = timeText.substring(12, 14);
				var mySeconds = timeText.substring(15, 17);
				var myTime = getNewTime(myHours, myMinutes, mySeconds);
				$('#goal_timer').html(myDays + 'Day' + '<br>' + myTime + 'h');
			}else{
				var timeText = $('#goal_timer').html();
				var myHours = timeText.substring(0, 2); 
				var myMinutes = timeText.substring(3, 5);
				var mySeconds = timeText.substring(6, 8);
				var myTime = getNewTime(myHours, myMinutes, mySeconds);
				$('#goal_timer').html(myTime + 'h');
			}
		
	}

	function getNewTime(hours, minutes, seconds){
		var myDate = new Date('2019-01-01T' + hours + ':' + minutes + ':' + seconds);
		var newDate = new Date (myDate.getTime() + 1000);
		var newHours = addZero(newDate.getHours());
		var newMinutes = addZero(newDate.getMinutes());
		var newSeconds = addZero(newDate.getSeconds());
		var newTime = newHours + ':' + newMinutes + ':' + newSeconds;
		return newTime;
	}

	function addZero(input){
		if(input < 10){
			input = '0' + input;
		}
		return input;
	}

	

	$('.checkbox').on('change', function(){
		if(this.checked){
			this.value = 1;
		}else{
			this.value = 0;
		}
	});

	$('#create_goal').on('click', function(){
		if($('#hidden_goal_form').attr('hidden')){
			$('#hidden_goal_form').attr('hidden', false);
		}else{
			$('#hidden_goal_form').attr('hidden', true);
		}
	})


	function addGoal(data, lastInsertedId){
		
		if(data['active'] == '1'){
			var goalList = $('#goal_list_active');
			var newGoal = '<li class="goal_item"><a href="goals/' + lastInsertedId + '">' + data.title + '</a></li>';
			if(!goalList.has('li').length == 0){
				$(goalList).find($('.goal_item:last-child')).after(newGoal);
			}else{
				$('#goal_list_active').prepend(newGoal);
			}
		}else{
			var goalList = $('#goal_list_inactive');
			var newGoal = '<li class="goal_item"><a href="goals/' + lastInsertedId + '">' + data.title + '</a></li>';
			if(!goalList.has('li').length == 0){
				$(goalList).find($('.goal_item:last-child')).after(newGoal);
			}else{
				$('#goal_list_inactive').prepend(newGoal);
			}
		}
	}

	function getCheckboxValue(){

		var values = '';
		$('.checkbox').each(function(){
			if(!$(this).is(':checked')){
				values = values + '&' + $(this).attr('name') + '=' + $(this).val();
			}
		});
		return values;
	}

	var create_goal_form = $('#create_goal_form');

	create_goal_form.on('submit', function(e){
		var data = create_goal_form.serialize() + getCheckboxValue();
		console.log(data);
		e.preventDefault();
		$.ajax({
			url: '/goals',
			type: 'POST',
			dataType: 'json',
			data: data,
			success: function(response){
				if(response.message == 'success'){
					addGoal(response.attributes, response.inserted_id);
					document.getElementById("create_goal_form").reset();
					$("html, body").animate({ scrollTop: 0 }, "slow");
					$('#hidden_goal_form').attr('hidden', true);
				}else{
					alert('An Error occured, please try again!');
				}
			}
		});
	});

	var start_or_stop_goal_form = $('#start_or_stop_goal_form');

	start_or_stop_goal_form.on('submit', function(e){
		var goal_id = $('#goal_id').val();

		if($('#start_or_stop_goal_btn').html() == 'Start Goal'){
			var url = '/goals/' + goal_id + '/start';
		}else{
			var url = '/goals/' + goal_id + '/stop';
		}

		e.preventDefault()

		$.ajax({
			url: url,
			data: start_or_stop_goal_form.serialize(),
			method: 'POST',
			success: function(response){
				if(response.message =='success'){
					// window.location.reload();
					// $('#start_goal_form').html('');
					
					window.location.reload();

					// console.log(response);
					// if(url =='/goals/' + goal_id + '/start'){
					// 	console.log(url);
					// 	$('#start_or_stop_goal_btn').html('Stop Goal');
					// 	// clearInterval(testest);
					// 	// var testest = setInterval(timer, 1000);
					// }else{
					// 	console.log('test');
					// 	$('#start_or_stop_goal_btn').html('Start Goal');
					// 	clearInterval(testest);
					// }
				}
			}
		});
	});

	// var goal_complete_form = $('#goal_complete_form');

	// goal_complete_form.on('submit', function(e){
	// 	var goal_id = $('#goal_id').val();
	// 	e.preventDefault();

	// 	$.ajax({
	// 		url: '/goals/' + goal_id + '/complete',
	// 		data: goal_complete_form.serialize(),
	// 		method: 'POST',
	// 		success: function(response){
	// 			if(response.message == 'success'){
	// 				alert('Congratulations!');
	// 			}
	// 		}
	// 	});
	// });


	$(document).on('click', '#goal_complete_btn', function(e){
		var goal_complete_form = $('#goal_complete_form');
		var goal_id = $('#goal_id').val();

		e.preventDefault();

		if($(this).html() == 'Mark as completed'){
			console.log($(this).html());
			$.ajax({
				url: '/goals/' + goal_id + '/complete',
				data: goal_complete_form.serialize(),
				method: 'POST',
				success: function(response){
					if(response.message == 'success'){
						console.log(response.request);
						alert('Congratulations!');
						$('#goal_complete_btn').html('Mark as uncompleted');
						$('#status').val('completed');
					}
				}
			});
		}else{
			console.log($(this).html());
			$.ajax({
				url: '/goals/' + goal_id + '/complete',
				data: goal_complete_form.serialize(),
				method: 'POST',
				success: function(response){
					if(response.message == 'success'){
						console.log(response.request);
						alert('Just DO it!');
						// $(this).html('Mark as completed');
						$('#goal_complete_btn').html('Mark as completed');
						$('#status').val('uncompleted');
					}
				}
			});
		}
	});
})