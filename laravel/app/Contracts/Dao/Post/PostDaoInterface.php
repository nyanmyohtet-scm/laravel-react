<?php

namespace App\Contracts\Dao\Post;

interface PostDaoInterface
{
    public function list($param);
    public function create($param);
    public function destory($id);
}
