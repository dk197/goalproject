@extends('layouts.app')

@section('content')
<div class="container">
	<h1>My Goals</h1>
	<ul id="goal_list">
		@foreach ($goals as $goal)
			<li class="goal_item">
				<a href="goals/{{ $goal->id }}">{{ $goal->title }}</a>
			</li>
		@endforeach
	</ul>

	<button class="btn btn-primary margin_bot" id="create_goal">Create new Goal</button>
</div>

<div class="container" id="hidden_goal_form">

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
	    <input type="checkbox" name="active" class="form-check-input checkbox" id="goal_active">
	    <label class="form-check-label" for="goal_active">Start from now</label>
	  </div>

	  <div class="form-check">
	    <input type="checkbox" name="public" class="form-check-input checkbox" id="goal_public">
	    <label class="form-check-label" for="goal_public">Set Goal as public</label>
	  </div>

	  <button type="submit" class="btn btn-primary margin_top">Create</button>
	</form>

	@include('errors')

</div>


@endsection