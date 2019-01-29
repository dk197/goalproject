@extends('layouts.app')

@section('content')

<div class="container">
	<h1>{{ $goal->title }}</h1>
	<p>{{ $goal->description }}</p>

	<div class="form-check">
	    <input type="checkbox" disabled {{ $goal->active == 1 ? 'checked' : '' }} class="form-check-input disabled" id="goal_active">
	    <label class="form-check-label"  for="goal_active">Active Goal</label>
	</div>
	
	<p>Goal created at {{ $data['created_date'] }} at {{ $data['created_time'] }}</p>

	<div id="goal_timer">
		
	</div>

	<p>{{ $data['diff_years'] }}</p>
	<p>{{ $data['diff_months'] }}</p>
	<p>{{ $data['diff_days'] }}</p>
	<p>{{ $data['diff_rest'] }}</p>

	@if($goal->active == 1)

		<form id="restart_goal_form" method="POST" action="/goals/{{ $goal->id }}/restart">
			@csrf
			<input type="text" hidden id="goal_id" value="{{ $goal->id }}" name="goal_id">
			<button class="btn btn-danger" type="submit">Restart</button>
		</form>

	@else

		<form id="start_goal_form" method="POST" action="/goals/{{ $goal->id }}/start">
			@csrf
			<input type="text" hidden id="goal_id" value="{{ $goal->id }}" name="goal_id">
			<button class="btn btn-danger" type="submit">Start now</button>
		</form>

	@endif

	<a href="/goals/{{ $goal->id }}/edit">Edit</a>
</div>

@endsection