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

	var myForm = $('#create_goal_form');

	myForm.on('submit', function(e){
		var data = myForm.serialize() + getCheckboxValue();
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
})