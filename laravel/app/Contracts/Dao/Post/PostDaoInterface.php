<?php

namespace App\Contracts\Dao\Post;

interface PostDaoInterface
{
    public function list($param);
    public function create($param);
    public function update($param);
    public function show($id);
    public function destory($id);
}
