@extends('layouts.app')

@section('content')

<div class="container">
	<h1>{{ $goal->title }}</h1>
	<p>{{ $goal->description }}</p>

	<div class="radio">
	  	<label><input type="radio" name="goal_active" {{ $goal->active == 1 ? 'checked' : '' }}> Active Goal</label>
	</div>
	<p>Ziel erstellt am {{ $testarray['beginning_date'] }} um {{ $testarray['beginning_time'] }}</p>
	<p>{{ $testarray['years'] }}</p>
	<p>{{ $testarray['months'] }}</p>
	<p>{{ $testarray['days'] }}</p>
	<p>{{ $testarray['rest'] }}</p>

	<a href="/goals/{{ $goal->id }}/edit">Edit</a>
</div>

@endsection