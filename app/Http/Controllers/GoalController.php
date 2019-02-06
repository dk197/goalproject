<?php

namespace App\Http\Controllers;

use Carbon\Carbon;

use DateTime;

use Illuminate\Http\Request;

use App\Goal;

class GoalController extends Controller
{

    public function __construct(){
        $this->middleware('auth', ['only' => ['show', 'store', 'edit', 'update', 'destroy', 'start', 'stop', 'complete']]);
        // ->only([index', ...])
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $match_active = ['user_id' => auth()->id(), 'active' => '1'];
        $match_inactive = ['user_id' => auth()->id(), 'active' => '0'];

        $goals_active = Goal::where($match_active)->latest('created_at')->get();
        $goals_inactive = Goal::where($match_inactive)->latest('created_at')->get();
        // $goals_array = [
        //     'active' => $goals_active->toArray(),
        //     'inactive' => $goals_inactive->toArray()
        //  ];
         // dd($goals_active);
        return view('goals.index', compact('goals_inactive'), compact('goals_active'));
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

        if(!$request->goal_ending == ''){
            $attributes['ending'] = $request->goal_ending;
        }

        $data = Goal::create($attributes);

        return response()->json(['message' => 'success', 'attributes' => $attributes, 'inserted_id' => $data->id, 'active' =>  $request->active]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Goal $goal)
    {
        if($goal-> public == '0' && auth()->id() != $goal->user_id){
            abort(403);
        }

        $beginning = Carbon::parse($goal->beginning);

        if($goal->completed == 0){
            $now = Carbon::now();
            $created_at = $goal->created_at;
            $beginning = Carbon::parse($goal->beginning);

            $diff = date_diff($beginning,$now);

            $hours = str_pad($diff->format("%h"), 2, "0", STR_PAD_LEFT);
            $minutes = str_pad($diff->format("%i"), 2, "0", STR_PAD_LEFT);
            $seconds = str_pad($diff->format("%s"), 2, "0", STR_PAD_LEFT);

            $data = [
                'created_date' => substr($created_at, 0, 10),
                'created_time' => substr($created_at, 11),
                'diff_days' => $diff->format("%d"),
                'diff_time' => $hours. ':' . $minutes . ':' . $seconds
            ];
        }else{
            $ending = Carbon::parse($goal->ending);
            $created_at = $goal->created_at;
            $beginning = Carbon::parse($goal->beginning);

            $diff = date_diff($beginning,$ending);

            $hours = str_pad($diff->format("%h"), 2, "0", STR_PAD_LEFT);
            $minutes = str_pad($diff->format("%i"), 2, "0", STR_PAD_LEFT);
            $seconds = str_pad($diff->format("%s"), 2, "0", STR_PAD_LEFT);

            $data = [
                'created_date' => substr($created_at, 0, 10),
                'created_time' => substr($created_at, 11),
                'diff_days' => $diff->format("%d"),
                'diff_time' => $hours. ':' . $minutes . ':' . $seconds
            ];
        }

        return view('goals.show', compact('goal'), compact('data'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Goal $goal)
    {
        $this->authorize('update', $goal);

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

    public function start(Goal $goal){

        $goal->active = 1;
        $goal->beginning = Carbon::now();;

        $goal->save();

        return response()->json(['message' => 'success', 'goal' => $goal->title]);
    }

    public function stop(Goal $goal){

        $goal->active = 0;
        $goal->beginning = null;

        $goal->save();

        return response()->json(['message' => 'success', 'goal' => $goal->title]);
    }

    public function complete(Goal $goal){

        if(request()->status == 'completed'){
            $goal->completed = '0';
            $goal->beginning = null;
            $goal->ending = null;
            $goal->active = '0';
            $goal->save();
        }else{
            $goal->completed = '1';
            $goal->active = '0';
            $goal->ending = Carbon::now();
            $goal->save();
        }


        return response()->json(['message' => 'success', 'request' => request()->all()]);
    }

    public function publicGoals(Goal $Goal){

        $match_active = ['public' => '1', 'active' => '1'];
        $match_inactive = ['public' => '1', 'active' => '0'];

        $goals_active = Goal::where($match_active)->latest('created_at')->get();
        $goals_inactive = Goal::where($match_inactive)->latest('created_at')->get();

        return view('goals.publicgoals', compact('goals_inactive'), compact('goals_active'));
    }
}
