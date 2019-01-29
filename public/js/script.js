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


	function addGoal(data, lastInsertedId){

		var goalList = $('#goal_list');
		var newGoal = '<li class="goal_item"><a href="goals/' + lastInsertedId + '">' + data.title + '</a></li>';
		if(!goalList.has('li').length == 0){
			$('.goal_item:last-child').append(newGoal);
		}else{
			$('#goal_list').prepend(newGoal);
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
				console.log(response);
				$('#goal_active').prop('checked', true);
			}
		});
	});

	var restart_goal_form = $('#restart_goal_form');
		
	restart_goal_form.on('submit', function(e){
		var goal_id = $('#goal_id').val();
		var url = '/goals/' + goal_id + '/restart';
		e.preventDefault();

		$.ajax({
			url: url,
			data: restart_goal_form.serialize(),
			method: 'POST',
			success: function(response){
				if(response.message =='success'){
					alert('working');
				}
			}
		});
	});
})