<?php

namespace App\Contracts\Services\User;

/**
 * Interface for post service
 */

interface UserServiceInterface
{
    public function getList($param);
    public function store($param, $isUpdate);
    public function show($id);
    public function destory($id);
}
