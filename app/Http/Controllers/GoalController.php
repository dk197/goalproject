<?php

namespace App\Http\Controllers;

use Carbon\Carbon;

use DateTime;

use Illuminate\Http\Request;

use App\Goal;

class GoalController extends Controller
{

    public function __construct(){
        $this->middleware('auth');
        // ->only([index', ...])
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $goals = Goal::where('user_id', auth()->id())->get();
        return view('goals.index', compact('goals'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $attributes = request()->validate([
            'title' => ['required', 'min:3'], 
            'description' => ['required', 'min:3']
        ]);

        $attributes['user_id'] = auth()->id();

        $attributes['active'] = $request->active;
        $attributes['public'] = $request->public;

        if($attributes['active'] == '1'){
           $attributes['beginning'] = Carbon::now()->toDateTimeString();
        }
        // else{
        //     $attributes['beginning'] = 'notsetyet';
        // }

        // $attributes['ending'] = 'notsetyet';

        $data = Goal::create($attributes);

        return response()->json(['message' => 'success', 'attributes' => $attributes, 'inserted_id' => $data->id, 'active' =>  $request->active]);
        // return redirect('/goals');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Goal $goal)
    {
        $now = Carbon::now();
        $beginning = Carbon::parse($goal->beginning);

        $diff = date_diff($beginning,$now);
        $test = $diff->format("%y");
        $testarray = [
            'beginning_date' => substr($beginning, 10),
            'beginning_time' => substr($beginning, 12),
            'years' => $diff->format("%y"),
            'months' => $diff->format("%m"),
            'days' => $diff->format("%d"),
            'rest' => $diff->format("%h:%i:%s")
        ];

        return view('goals.show', compact('goal'), compact('testarray'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Goal $goal)
    {
        return view('goals.edit', compact('goal'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Goal $goal)
    {
        if(request('public') == ''){
            $goal->public = '0';
        }else{
            $goal->public = request('public');
        }

        $goal->title = request('title');
        $goal->description = request('description');
        
        $goal->save();

        return redirect('/goals');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Goal $goal)
    {
        $goal->delete();

        return redirect('/goals');
    }
}
