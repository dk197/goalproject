<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Goal extends Model
{
    protected $fillable = [
    	'title', 'description', 'active', 'public', 'user_id'
    ];
}
