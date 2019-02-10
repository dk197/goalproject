$(document).ready(function(){

	var myUrl = window.location.pathname;
	var interval = null;
    	
   if(myUrl.includes('public')){
    	$('#public_nav').addClass('active');
    }else if(myUrl.includes('goals')){
    	$('#goals_nav').addClass('active');
    }else{
    	$('#home_nav').addClass('active');
    }


	if($('div').is('#show_goal') && (($('#start_or_stop_goal_btn').html() == 'Stop Goal' && $('#goal_complete_btn').html() == 'Mark as completed')) || ($('div').is('#goal_cmpl') && $('div').is('#goal_strt'))){
		startTimer();		
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

	function startTimer(){
		interval = setInterval(timer, 1000);
	}

	function stopTimer(){
		clearInterval(interval);
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
					jQuery.each(response.errors, function(key, value){
              			jQuery('.alert-danger').show();
              			jQuery('.alert-danger').append('<p>'+value+'</p>');
              		});
				}
			}
		});
	});


	var goal_edit_form = $('#goal_edit_form');

	goal_edit_form.on('submit', function(e){

		e.preventDefault();

		var goal_id = $('#goal_id').val();
		var data = goal_edit_form.serialize();

		$.ajax({
			url: '/goals/' + goal_id,
			type: 'POST',
			data: data,
			success: function(response){
				if(response.message == 'success'){
					window.location.href = '/goals/' + goal_id;
				}else{
					jQuery.each(response.errors, function(key, value){
              			jQuery('.alert-danger').show();
              			jQuery('.alert-danger').append('<p>'+value+'</p>');
              		});
				}
			}
		});
	});


	$(document).on('click', '#start_or_stop_goal_btn', function(e){

		e.preventDefault()

		if($('#goal_complete_btn').html() == 'Mark as uncompleted'){
			alert('Mark Goal as uncompleted first!');
		}else{

		var goal_id = $('#goal_id').val();
		var start_or_stop_goal_form = $('#start_or_stop_goal_form');

		if($('#start_or_stop_goal_btn').html() == 'Start Goal'){
			var url = '/goals/' + goal_id + '/start';
		}else{
			var url = '/goals/' + goal_id + '/stop';
		}
			$.ajax({
				url: url,
				data: start_or_stop_goal_form.serialize(),
				method: 'POST',
				success: function(response){
					if(response.message =='success'){
						if(url =='/goals/' + goal_id + '/start'){
							$('#start_or_stop_goal_btn').html('Stop Goal');
							startTimer();
						}else{
							$('#start_or_stop_goal_btn').html('Start Goal');
							$('#goal_timer').html('00:00:00h');
							stopTimer();
						}
					}else{
						alert('An error occured, please try again');
					}
				}
			});
		}
	});

	$(document).on('click', '#goal_complete_btn', function(e){

		e.preventDefault();

		if($('#start_or_stop_goal_btn').html() == 'Start Goal'){
			alert('You have to start your Goal first!');
		}else{

			var goal_complete_form = $('#goal_complete_form');
			var goal_id = $('#goal_id').val();

			if($(this).html() == 'Mark as completed'){
				$.ajax({
					url: '/goals/' + goal_id + '/complete',
					data: goal_complete_form.serialize(),
					method: 'POST',
					success: function(response){
						if(response.message == 'success'){
							alert('Congratulations!');
							$('#goal_complete_btn').html('Mark as uncompleted');
							$('#start_or_stop_goal_btn').html('Start Goal');
							stopTimer();
							$('#status').val('completed');
						}
					}
				});
			}else{
				$.ajax({
					url: '/goals/' + goal_id + '/complete',
					data: goal_complete_form.serialize(),
					method: 'POST',
					success: function(response){
						if(response.message == 'success'){
							alert('Just DO it!');
							$('#goal_complete_btn').html('Mark as completed');
							$('#goal_timer').html('00:00:00h');
							$('#start_or_stop_goal_btn').html('Start Goal');
							$('#status').val('uncompleted');
						}
					}
				});
			}
		}
	});

})