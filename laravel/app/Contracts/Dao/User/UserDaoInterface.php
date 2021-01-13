<?php

namespace App\Contracts\Dao\User;

interface UserDaoInterface
{
    public function list($param);
    public function create($param);
    public function update($param);
    public function show($id);
    public function destory($id);
}
