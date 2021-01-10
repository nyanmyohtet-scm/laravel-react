<?php

namespace App\Contracts\Services\Post;

/**
 * Interface for post service
 */

interface PostServiceInterface
{
    public function getList();
    public function uploadCSV($dataRowList);
}
