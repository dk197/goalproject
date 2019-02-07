@extends('layouts.app')

@section('content')

<div class="container">
	<div class="row goal_list">
		<h1 class="col-12">Public Goals</h1>

		<div class="col-md-4 border-right border-secondary">
			<h3 class="border-bottom border-secondary" id="active_goals">Active</h3>
			<ul id="goal_list_active">
				@foreach($goals_active as $goal)
					<li class="goal_item">
						<a href="goals/{{ $goal['id'] }}">{{ $goal['title'] }}</a>
					</li>
				@endforeach
			</ul>
		</div>

		<div class="col-md-4 border-right border-secondary">
			<h3 class="border-bottom border-secondary" id="inactive_goals">Inactive</h3>
			<ul id="goal_list_inactive">
				@foreach($goals_inactive as $goal)
					<li class="goal_item">
						<a href="goals/{{ $goal['id'] }}">{{ $goal['title'] }}</a>
					</li>
				@endforeach
			</ul>
		</div>

		<div class="col-md-4">
			<h3 class="border-bottom border-secondary" id="completed_goals">Completed</h3>
			<ul id="goal_list_completed">
				@foreach($goals_completed as $goal)
					<li class="goal_item">
						<a href="goals/{{ $goal['id'] }}">{{ $goal['title'] }}</a>
					</li>
				@endforeach
			</ul>
		</div>

	</div>
</div>

@endsection