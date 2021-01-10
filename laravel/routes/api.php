<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::group([
    'prefix' => 'auth',
    'name' => 'auth',
    'namespace' => 'Auth'
], function () {
    Route::post('/login', 'AuthController@login')->name('login');
    Route::post('/register', 'AuthController@register')->name('register');
});

// Route::group(['middleware' => 'auth:api'], function () {
//     Route::group([
//         'prefix' => 'auth',
//         'name' => 'auth',
//         'namespace' => 'Auth'
//     ], function () {
//         Route::get('/details', 'AuthController@details')->name('details');
//     });
// });


Route::group(['middleware' => 'auth:api'], function () {
    // Get User List
    Route::get('users', 'Api\User\UserController@index')->name('users.index');

    // Search User
    Route::post('users/search', 'Api\User\UserController@search')->name('users.search');

    // Get User
    Route::get('users/{id}', 'Api\User\UserController@show')->name('users.show');

    // Get Profile Picture
    Route::get('users/profile/{userId}', 'Api\User\UserController@profilePicture')->name('users.profile_picture');

    // Create New User
    Route::post('users', 'Api\User\UserController@store')->name('users.store');

    // Update User
    Route::put('users', 'Api\User\UserController@store')->name('users.store');

    // Delete User
    Route::delete('users/{id}', 'Api\User\UserController@destroy')->name('users.destroy');

    // Upload Post CSV
    Route::post('posts/upload-csv', 'Api\Post\PostController@uploadCSV')->name('posts.upload_csv');
});

// Get Post List
Route::get('posts', 'Api\Post\PostController@index')->name('posts.index');

// Search Post
Route::post('posts/search', 'Api\Post\PostController@search')->name('posts.search');

// Download Post List CSV
Route::get('posts/export-csv', 'Api\Post\PostController@exportCSV')->name('posts.export_csv');
