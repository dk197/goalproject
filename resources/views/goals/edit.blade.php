@extends('layouts.app')

@section('content')

<div class="container">

	<form id="goal_edit_form">
		@csrf
		@method('PATCH')
		<input type="text" hidden id="goal_id" value="{{ $goal->id }}" name="goal_id">
		<div class="form-group">
			<label for="goal_title">Your Goal</label>
			<input type="text" name="title" value="{{ $goal->title }}" id="goal_title" class="form-control" placeholder="Enter your Goal">
		</div>

		<div class="form-group">
			<label for="goal_description">Short description</label>
			<textarea type="text" name="description" id="goal_description" class="form-control" placeholder="Describe your Goal">{{ $goal->description }}</textarea>
		</div>

		<div class="form-check">
			<input type="checkbox" {{ $goal->public == 1 ? 'checked value=1' : 'value="0"' }} name="public" class="form-check-input checkbox" id="goal_public">
			<label class="form-check-label" for="goal_public">Public Goal</label>
		</div>

		<button type="submit" class="goal_btn margin_top">Update</button>

	</form>

	<form method="POST" action="/goals/{{ $goal->id }}">
		@csrf
		@method('DELETE')
		<button type="submit" class="goal_btn margin_top">Delete Goal</button>
	</form>

	<!-- @include('errors') -->
	<div class="alert alert-danger" style="display:none"></div>

</div>


@endsection