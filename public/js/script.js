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
					console.log(response);
					addGoal(response.attributes, response.inserted_id);
				}else{
					alert('An Error occured, please try again!');
				}
			}
		});
	});


	var start_goal_form = $('#start_goal_form');

	start_goal_form.on('submit', function(e){
		var goal_id = $('#goal_id').val();
		var url = '/goals/' + goal_id + '/start';
		e.preventDefault();

		$.ajax({
			url: url,
			data: start_goal_form.serialize(),
			method: 'POST',
			success: function(response){
				if(response.message =='success'){
					$('#goal_active').prop('checked', true);
					window.location.reload();
				}
			}
		});
	});

	var stop_goal_form = $('#stop_goal_form');
		
	stop_goal_form.on('submit', function(e){
		var goal_id = $('#goal_id').val();
		var url = '/goals/' + goal_id + '/stop';
		e.preventDefault();

		$.ajax({
			url: url,
			data: stop_goal_form.serialize(),
			method: 'POST',
			success: function(response){
				if(response.message =='success'){
					$('#goal_active').prop('checked', false);
					window.location.reload();
				}
			}
		});
	});
})