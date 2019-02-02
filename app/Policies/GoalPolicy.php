<?php

namespace App\Policies;

use App\User;
use App\Goal;
use Illuminate\Auth\Access\HandlesAuthorization;

class GoalPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view the goal.
     *
     * @param  \App\User  $user
     * @param  \App\Goal  $goal
     * @return mixed
     */
    public function update(User $user, Goal $goal)
    {
        return $goal->user_id == $user->id;
    }
}
