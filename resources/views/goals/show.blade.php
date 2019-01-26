@extends('layouts.app')

@section('content')

<div class="container">
	<h1>{{ $goal->title }}</h1>
	<p>{{ $goal->description }}</p>

	<div class="radio">
	  	<label><input type="radio" name="goal_active" {{ $goal->active == 1 ? 'checked' : '' }}> Active Goal</label>
	</div>
	<p>{{ $goal->created_at }}</p>
</div>

@endsection