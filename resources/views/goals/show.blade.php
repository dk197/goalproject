@extends('layouts.app')

@section('content')

<div class="container" id="show_goal">
	<div class="row">
		<div class="{{ Auth::user()->id == $goal->user_id ? 'col-md-4' : 'col-md-6' }} border-right border-secondary">
			<h1>{{ $goal->title }}</h1>
			<p>Goal created on {{ $data['created_date'] }} at {{ $data['created_time'] }}h</p>
			<p class="goal_font">{{ $goal->description }}</p>

			@if(Auth::user()->id == $goal->user_id)
			<button class="goal_btn" onclick="window.location='/goals/{{ $goal->id }}/edit';">Edit</button>

			<form id="goal_complete_form">
				@csrf
				<input type="text" id="status" hidden name="status" value="{{ $goal->completed == 0 ? 'uncompleted' : 'completed' }}">
				<button class="goal_btn margin_top" id="goal_complete_btn" type="submit">{{ $goal->completed == '0' ? 'Mark as completed' : 'Mark as uncompleted' }}</button>
			</form>
			@endif

		</div>

		<div class="{{ Auth::user()->id == $goal->user_id ? 'col-md-4 border-right border-secondary' : 'col-md-6' }} d-flex justify-content-center align-items-center">
				@if($data['diff_days'] == 0)

					<h1 class="text-center" id="goal_timer">{{ $data['diff_time'] }}h</h1>

				@else

					<h1 class="text-center" id="goal_timer">{{ $data['diff_days'] }} Day{{ $data['diff_days'] > 1 ? 's' : ''}}<br>{{ $data['diff_time'] }}h</h1>
					
				@endif
		</div>
		
		@if(Auth::user()->id == $goal->user_id)
		<div class="col-md-4 d-flex justify-content-center align-items-center">

			<div id="start_or_stop_goal">
				<form id="start_or_stop_goal_form">
					@csrf
					<input type="text" hidden id="goal_id" value="{{ $goal->id }}" name="goal_id">

					@if($goal->active == 1)
						<button class="goal_btn" id="start_or_stop_goal_btn" type="submit">Stop Goal</button>
					@else
						<button class="goal_btn" id="start_or_stop_goal_btn" type="submit">Start Goal</button>
					@endif

				</form>

			</div>

		</div>
		@else
			<div id="stop_goal_form"></div>
		@endif

	</div>
</div>

@endsection