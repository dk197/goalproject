@extends('layouts.app')

@section('content')
<div class="container">
	<div class="row goal_list">
		<h1 class="col-12">My Goals</h1>

		<div class="col-md-6 border-right border-secondary">
			<h3 class="border-bottom border-secondary" id="active_goals">Active</h3>
				<!-- @foreach($goals_active as $goal)
				<div class="test">
					<a href="goals/{{ $goal['id'] }}" class="goal_item">
						{{ $goal['title'] }}
					</a>
				</div>
				@endforeach -->
				<ul id="goal_list_active">
					@foreach($goals_active as $goal)
						<li class="goal_item">
							<a href="goals/{{ $goal['id'] }}">{{ $goal['title'] }}</a>
						</li>
					@endforeach
				</ul>
		</div>

		<div class="col-md-6">
			<h3 class="border-bottom border-secondary" id="inactive_goals">Inactive</h3>
				<ul id="goal_list_inactive">
					@foreach($goals_inactive as $goal)
						<li class="goal_item">
							<a href="goals/{{ $goal['id'] }}">{{ $goal['title'] }}</a>
						</li>
					@endforeach
				</ul>
		</div>
	</div>

	<div class="text-center">
		<button class="goal_btn margin_top margin_bot" id="create_goal">Create new Goal</
		</button>
	</div>
</div>

<div class="container" hidden id="hidden_goal_form">

	<form id="create_goal_form" method="POST" action="/goals">
		@csrf
	  <div class="form-group">
	    <label for="goal_title">Your Goal</label>
	    <input type="text" name="title" id="goal_title" class="form-control" placeholder="Enter your Goal">
	  </div>

	  <div class="form-group">
	    <label for="goal_description">Short description</label>
	    <textarea type="text" name="description" id="goal_description" class="form-control" placeholder="Describe your Goal"></textarea>
	  </div>

	  <div class="form-check">
	    <input type="checkbox" value="0" name="active" class="form-check-input checkbox" id="goal_active">
	    <label class="form-check-label" for="goal_active">Start from now</label>
	  </div>

	  <div class="form-check">
	    <input type="checkbox" value="0" name="public" class="form-check-input checkbox" id="goal_public">
	    <label class="form-check-label" for="goal_public">Set Goal as public</label>
	  </div>

	  <button type="submit" class="goal_btn margin_top">Create</button>
	</form>

	@include('errors')

</div>


@endsection