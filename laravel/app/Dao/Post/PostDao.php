<?php

namespace App\Dao\Post;

use App\Contracts\Dao\Post\PostDaoInterface;
use App\Models\Post;

class PostDao implements PostDaoInterface
{
    /**
     * Store a newly created post.
     *
     * @param  Array  $param
     * @return Illuminate\Database\Eloquent\Model $post
     */
    public function create($param){
        $post = new Post();
        $post['title'] = $param['title'];
        $post['description'] = $param['description'];
        $post['created_user_id'] = $param['created_user_id'];
        $post->save();

        return $post;
    }
}

