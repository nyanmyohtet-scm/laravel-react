<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return User::with('createdUser')
            ->paginate(5);
    }

    /**
     * Search a listing of the user by search params.
     *
     * @return \Illuminate\Http\Response
     */
    public function search(Request $request)
    {
        $userList = User::query();

        if ($request->has('name')) {
            $userList = $userList->withName($request->input('name'));
        }

        if ($request->has('email')) {
            $userList = $userList->withName($request->input('email'));
        }

        if ($request->has('created_from')) {
            info('has created from');
            $from_date = date('Y-m-d', strtotime($request->input('created_from')));
            $userList = $userList->withCreatedFrom($from_date);
        }

        if ($request->has('created_to')) {
            info('has created to');
            $to_date = date('Y-m-d', strtotime($request->input('created_to')));
            $userList = $userList->withCreatedTo($to_date);
        }

        $userList = $userList->get();

        return response()->json(['user_list' => $userList]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Update
        if ($request->isMethod('PUT')) {
            $user = User::find($request['id']);

            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|max:255',
                'type' => 'required|numeric|in:0,1',
                'phone' => 'required|string|max:12',
                'birth_date' => 'required|string',
                'address' => 'required|string|max:255',
            ]);
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
            $user = new User();
            $user->password = bcrypt($validated['password']);
        }

        if ($request->hasFile('image')) {
            $fileNameWithExt = $request->file('image')->getClientOriginalName();
            $fileName = pathinfo($fileNameWithExt, PATHINFO_FILENAME);
            $fileExt = $request->file('image')->getClientOriginalExtension();
            $fileNameToStore = $fileName . '_' . time() . '.' . $fileExt;
            $path = $request->file('image')->storeAs('images/profiles', $fileNameToStore);
        } else {
            $fileNameToStore = "NoImage.jpg";
        }
        $user->profile = $fileNameToStore;

        $user->name = $validated['name'];
        $user->email = $validated['email'];
        $user->type = $validated['type'];
        $user->created_user_id = Auth::user()->id;
        $user->phone = $validated['phone'];
        $user->birth_date = $validated['birth_date'];
        $user->address = $validated['address'];

        if ($user->save()) {
            return response()->json(['success' => true, 'user' => $user]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = User::find($id);
        $b64 = '';
        $profilePath = $user->profile;

        if ($profilePath) {
            // Load file contents into variable
            $bin = file_get_contents(storage_path('app/images/profiles/' . $profilePath));

            // Encode contents to Base64
            $b64 = 'data:image/jpg;base64,' . base64_encode($bin);

            info($b64);
        }

        return response()->json([
            'user' => $user,
            'profile_image' => $b64,
        ]);
    }

    public function profilePicture()
    {
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
        $user = User::find($id);
        $user->delete();

        return response()->json(['success' => true, 'user' => $user]);
    }
}
