<?php

namespace App\Http\Controllers\Api\Post;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Contracts\Services\Post\PostServiceInterface;

class PostController extends Controller
{
    /**
     * Post Service
     */
    private $postService;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(PostServiceInterface $postService)
    {
        $this->postService = $postService;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function list(Request $request)
    {
        $param = [];

        if ($request->filled('title')) {
            $param['title'] = $request->input('title');
        }

        return $this->postService->getList($param);
    }

    /**
     * Handle Post CSV upload.
     *
     * @param Illuminate\Http\Request $request
     */
    public function uploadCSV(Request $request)
    {
        $validated = $request->validate([
            'csv_file' => 'required|file'
        ]);

        $path =  $validated['csv_file']->getRealPath();
        $csvData = array_map('str_getcsv', file($path));

        $headerRow = $csvData[0];

        if ($headerRow != ['title', 'description']) {
            return response()->json(
                [
                    'errors' => [
                        'csv_file' => ["Header row must included only 'title' and 'description'."]
                    ]
                ],
                422
            );
        }

        $dataRowList = array_slice($csvData, 1);

        if (count($dataRowList) == 0) {
            return response()->json(
                [
                    'errors' => [
                        'csv_file' => ['Empty CSV file.']
                    ]
                ],
                422
            );
        }

        $createdPostList = $this->postService->uploadCSV($dataRowList);

        return response()->json([
            'success' => true,
            'createdPostList' => $createdPostList
        ]);
    }

    /**
     * Export Post List CSV.
     *
     * @return \Illuminate\Http\Response
     */
    public function exportCSV(Request $request)
    {
        $fileName = 'posts.csv';
        $posts = $this->postService->exportCSV();

        $headers = array(
            "Content-type"        => "text/csv",
            "Content-Disposition" => "attachment; filename=$fileName",
            "Pragma"              => "no-cache",
            "Cache-Control"       => "must-revalidate, post-check=0, pre-check=0",
            "Expires"             => "0"
        );

        $columns = array('Title', 'Post Description', 'Posted User', 'Posted Date');

        $callback = function () use ($posts, $columns) {
            $file = fopen('php://output', 'w');
            fputcsv($file, $columns);

            foreach ($posts as $post) {
                $row['Title']       = $post->title;
                $row['Description'] = $post->description;
                $row['Posted User'] = $post->created_user_id;
                $row['Posted Date'] = $post->created_at;

                fputcsv($file, array($row['Title'], $row['Description'], $row['Posted User'], $row['Posted Date']));
            }

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }

    /**
     * Store/Update resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if ($request->isMethod('PUT')) {
            $validated = $request->validate([
                'id' => 'required|numeric|exists:App\Models\Post',
                'title' => 'required|string|max:255',
                'description' => 'required|string|max:255'
            ]);

            $post = $this->postService->update($validated);
        } else {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'required|string|max:255'
            ]);

            $post = $this->postService->create($validated);
        }

        return response()->json(['post' => $post]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $post = $this->postService->show($id);

        return response()->json(['post' => $post]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $post = $this->postService->destory($id);

        return response()->json(['success' => true, 'post' => $post]);
    }
}
