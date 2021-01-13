<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Contracts\Services\User\UserServiceInterface;

class UserController extends Controller
{
    /**
     * Post Service
     */
    private $userService;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(UserServiceInterface $userService)
    {
        $this->userService = $userService;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function list(Request $request)
    {
        $param = [];

        if ($request->filled('name')) {
            $param['name'] = $request->input('name');
        }

        if ($request->filled('email')) {
            $param['email'] = $request->input('email');
        }

        if ($request->filled('created_from')) {
            $param['created_from'] = $request->input('created_from');
        }

        if ($request->filled('created_to')) {
            $param['created_to'] = $request->input('created_to');
        }

        return $this->userService->getList($param);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $isUpdate = false;
        $param = [];
        // Update
        if ($request->isMethod('PUT')) {
            $validated = $request->validate([
                'id' => 'required|numeric|exists:App\Models\User',
                'name' => 'required|string|max:255',
                'email' => 'required|string|max:255',
                'type' => 'required|numeric|in:0,1',
                'phone' => 'required|string|max:12',
                'birth_date' => 'required|string',
                'address' => 'required|string|max:255',
            ]);
            $isUpdate = true;
        } else { // Create
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|max:255',
                'password' => 'required|string|max:255',
                'c_password' => 'required|string|max:255',
                'type' => 'required|numeric|in:0,1',
                'phone' => 'required|string|max:12',
                'birth_date' => 'required|string',
                'address' => 'required|string|max:255',
            ]);
            $isUpdate = false;
        }

        if ($request->hasFile('image')) {
            $fileNameWithExt = $request->file('image')->getClientOriginalName();
            $fileName = pathinfo($fileNameWithExt, PATHINFO_FILENAME);
            $fileExt = $request->file('image')->getClientOriginalExtension();
            $fileNameToStore = $fileName . '_' . time() . '.' . $fileExt;
            $path = $request->file('image')->storeAs('images/profiles', $fileNameToStore);
        } else {
            $fileNameToStore = "default.png";
        }

        $param = $validated;
        $param['profile'] = $fileNameToStore;

        $user = $this->userService->store($param, $isUpdate);
        if ($user) {
            return response()->json(['success' => true, 'user' => $user]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param Int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $content = $this->userService->show($id);

        return response()->json($content);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = $this->userService->destory($id);

        return response()->json(['success' => true, 'user' => $user]);
    }
}
