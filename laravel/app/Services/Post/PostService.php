<?php

namespace App\Services\Post;

use App\Contracts\Services\Post\PostServiceInterface;
use App\Contracts\Dao\Post\PostDaoInterface;

class PostService implements PostServiceInterface
{
    /**
     * Post Dao
     */
    private $postDao;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(PostDaoInterface $postDao)
    {
        $this->postDao = $postDao;
    }

    /**
     * Get Post List.
     *
     * @return Array
     */
    public function getList($param)
    {
        return $this->postDao->list($param);
    }

    /**
     * Create new post.
     *
     * @param Array $param
     */
    public function create($param)
    {
        $authUser = auth()->user();
        $param['created_user_id'] = $authUser->id;
        return $this->postDao->create($param);
    }

    /**
     * Delete post.
     *
     * @param Int $id
     */
    public function destory($id)
    {
        return $this->postDao->destory($id);
    }

    /**
     * Handle CSV Upload
     *
     * @param $csvFile
     */
    public function uploadCSV($dataRowList)
    {
        $authUser = auth()->user();
        $createdPostList = [];

        foreach ($dataRowList as $key => $row) {
            $post['title'] = $row[0];
            $post['description'] = $row[1];
            $post['created_user_id'] = $authUser->id;

            $createdPost = $this->postDao->create($post);
            array_push($createdPostList, $createdPost);
        }

        return $createdPostList;
    }
}
