<?php

namespace App\Contracts\Services\Post;

/**
 * Interface for post service
 */

interface PostServiceInterface
{
    public function getList($param);
    public function create($param);
    public function destory($id);
    public function uploadCSV($dataRowList);
}
