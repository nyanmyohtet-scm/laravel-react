<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public $successStatus = 200;

    /**
     * Handle the user login
     *
     * @return \Illuminate\Http\Response
     */
    public function login()
    {
        $credentials = request(['email', 'password']);
        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $success['token'] =  $user->createToken('MyApp')->accessToken;
            return response()->json([
                'success' => $success,
                'user' => $user,
            ], $this->successStatus);
        } else {
            return response()->json(['errors' => ['Email or password is wrong.']], 401);
        }
    }
}
