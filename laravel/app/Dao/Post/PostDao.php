<?php

namespace App\Dao\Post;

use App\Contracts\Dao\Post\PostDaoInterface;
use App\Models\Post;

class PostDao implements PostDaoInterface
{

    /**
     * Query all of posts.
     *
     * @return Illuminate\Database\Eloquent\Model $post
     */
    public function getAll()
    {
        return Post::all();
    }

    /**
     * Query Post List.
     *
     * @return Illuminate\Database\Eloquent\Model $post
     */
    public function list($param)
    {
        $postList = Post::query();

        if (array_key_exists('title', $param)) {
            $postList = $postList->withTitle($param['title']);
        }

        return $postList
            ->with('createdUser')
            ->paginate(10);
    }

    /**
     * Store a newly created post.
     *
     * @param  Array  $param
     * @return Illuminate\Database\Eloquent\Model $post
     */
    public function create($param)
    {
        $post = new Post();
        $post['title'] = $param['title'];
        $post['description'] = $param['description'];
        $post['created_user_id'] = $param['created_user_id'];
        $post->save();

        return $post;
    }

    /**
     * Update post.
     *
     * @param  Array  $param
     * @return Illuminate\Database\Eloquent\Model $post
     */
    public function update($param)
    {
        $post = Post::find($param['id']);
        $post['title'] = $param['title'];
        $post['description'] = $param['description'];
        $post->save();

        return $post;
    }

    /**
     * Get post by id.
     *
     * @param Int $id
     * @return Illuminate\Database\Eloquent\Model $post
     */
    public function show($id)
    {
        return Post::find($id);
    }

    /**
     * Delete post.
     *
     * @param Int $id
     * @return Illuminate\Database\Eloquent\Model $post
     */
    public function destory($id)
    {
        $post = Post::find($id);
        $post->delete();

        return $post;
    }
}
