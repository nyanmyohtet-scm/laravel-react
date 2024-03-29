<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Post extends Model
{
    use SoftDeletes;

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'created_at' => 'datetime:Y-m-d',
    ];

    /**
     * Get the user who created the post.
     */
    public function createdUser()
    {
        return $this->belongsTo(User::class, 'created_user_id');
    }

    /**
     * Scope a query to only include posts by title.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeWithTitle($query, $title)
    {
        return $query->where('title', 'LIKE', "%{$title}%");
    }
}
