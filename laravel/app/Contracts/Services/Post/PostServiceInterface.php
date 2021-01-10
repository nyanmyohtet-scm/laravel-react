<?php

namespace App\Contracts\Services\Post;

/**
 * Interface for post service
 */

interface PostServiceInterface
{
    public function uploadCSV($dataRowList);
}
