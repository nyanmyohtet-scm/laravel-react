<?php

namespace App\Contracts\Dao\Post;

interface PostDaoInterface
{
    public function index();
    public function create($param);
}
