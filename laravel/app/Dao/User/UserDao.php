<?php

namespace App\Dao\User;

use App\Contracts\Dao\User\UserDaoInterface;
use App\Models\User;

class UserDao implements UserDaoInterface
{
    /**
     * Query User List.
     *
     * @param Array $param
     * @return Illuminate\Database\Eloquent\Model $user
     */
    public function list($param)
    {
        $userList = User::query();

        if (array_key_exists('name', $param)) {
            $userList = $userList->withName($param['name']);
        }

        if (array_key_exists('email', $param)) {
            $userList = $userList->withEmail($param['email']);
        }

        if (array_key_exists('created_from', $param)) {
            $from_date = date('Y-m-d', strtotime($param['created_from']));
            $userList = $userList->withCreatedFrom($from_date);
        }

        if (array_key_exists('created_to', $param)) {
            $from_date = date('Y-m-d', strtotime($param['created_to']));
            $userList = $userList->withCreatedTo($from_date);
        }

        return $userList
            ->with('createdUser')
            ->paginate(10);
    }

    /**
     * Store a newly created user.
     *
     * @param  Array                              $param
     * @return Illuminate\Database\Eloquent\Model $user
     */
    public function create($param)
    {
        $user = new User();
        $user->name = $param['name'];
        $user->email = $param['email'];
        $user->password = bcrypt($param['password']);
        $user->type = $param['type'];
        $user->created_user_id = $param['created_user_id'];
        $user->phone = $param['phone'];
        $user->birth_date = $param['birth_date'];
        $user->address = $param['address'];
        $user->profile = $param['profile'];
        $user->save();

        return $user;
    }

    /**
     * Update the existing user.
     *
     * @param  Array                              $param
     * @return Illuminate\Database\Eloquent\Model $user
     */
    public function update($param)
    {
        $user = User::find($param['id']);
        $user->name = $param['name'];
        $user->email = $param['email'];
        $user->type = $param['type'];
        $user->phone = $param['phone'];
        $user->birth_date = $param['birth_date'];
        $user->address = $param['address'];
        $user->profile = $param['profile'];
        $user->save();

        return $user;
    }

    /**
     * Get user by id.
     *
     * @param Int $id
     * @return Illuminate\Database\Eloquent\Model $user
     */
    public function show($id)
    {
        return User::find($id);
    }

    /**
     * Delete user.
     *
     * @param Int                                 $id
     * @return Illuminate\Database\Eloquent\Model $user
     */
    public function destory($id)
    {
        $user = User::find($id);
        $user->delete();

        return $user;
    }
}
