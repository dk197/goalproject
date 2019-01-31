@extends('layouts.app')

@section('content')

<div class="container">
	<div class="row">
		<div class="col-md-4 border-right border-secondary">
			<h1>{{ $goal->title }}</h1>
			<p>Goal created on {{ $data['created_date'] }} at {{ $data['created_time'] }}</p>
			<p class="goal_font">{{ $goal->description }}</p>
			<button class="goal_btn" onclick="window.location='/goals/{{ $goal->id }}/edit';">Edit</button>
		</div>

		<div class="col-md-4 border-right border-secondary d-flex justify-content-center align-items-center" id="goal_timer">
				@if($data['diff_days'] == 0)

					<h1 class="text-center">{{ $data['diff_time'] }}</h1>

				@else

					<h1 class="text-center">{{ $data['diff_days'] }} Day{{ $data['diff_days'] > 1 ? 's' : ''}}<br>{{ $data['diff_time'] }}h</h1>
					
				@endif
		</div>
		
		<div class="col-md-4">

			<div id="start_or_stop_goal">

				@if($goal->active == 1)

					<form id="stop_goal_form" method="POST" action="/goals/{{ $goal->id }}/stop">
						@csrf
						<input type="text" hidden id="goal_id" value="{{ $goal->id }}" name="goal_id">
						<button class="goal_btn" type="submit">Stop Goal</button>
					</form>

				@else

					<form id="start_goal_form" method="POST" action="/goals/{{ $goal->id }}/start">
						@csrf
						<input type="text" hidden id="goal_id" value="{{ $goal->id }}" name="goal_id">
						<button class="btn btn-danger" type="submit">Start now</button>
					</form>

				@endif

			</div>

		</div>

	</div>
</div>

@endsection