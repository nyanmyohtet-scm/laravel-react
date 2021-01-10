<?php

namespace App\Http\Controllers\Api\Post;

use App\Http\Controllers\Controller;
use App\Models\Post;
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
    public function index()
    {
        return $this->postService->getList();
    }

    /**
     * Search a listing of the post by search params.
     *
     * @return \Illuminate\Http\Response
     */
    public function search(Request $request)
    {
        $postList = Post::query();

        if ($request->filled('title')) {
            $postList = $postList->withTitle($request->input('title'));
        }

        $postList = $postList
            ->with('createdUser')
            ->get();

        return response()->json(['post_list' => $postList]);
    }

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
                ], 422);
        }

        $dataRowList = array_slice($csvData, 1);

        if (count($dataRowList) == 0) {
            return response()->json(
                [
                    'errors' => ['csv_file' => ['Empty CSV file.']
                ]
            ], 422);
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
        $posts = Post::all();

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
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
