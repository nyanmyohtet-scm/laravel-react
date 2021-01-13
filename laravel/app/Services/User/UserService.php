<?php

namespace App\Services\User;

use App\Contracts\Dao\User\UserDaoInterface;
use App\Contracts\Services\User\UserServiceInterface;

class UserService implements UserServiceInterface
{
    /**
     * User Dao
     */
    private $userDao;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(UserDaoInterface $userDao)
    {
        $this->userDao = $userDao;
    }

    /**
     * Get User List.
     *
     * @return
     */
    public function getList($param)
    {
        return $this->userDao->list($param);
    }

    /**
     * Store user.
     *
     * @param Array $param
     * @param Bool  $isUpdate
     * @return Illuminate\Database\Eloquent\Model
     */
    public function store($param, $isUpdate)
    {
        if ($isUpdate) {
            return $this->userDao->update($param);
        } else {
            $param['created_user_id'] = auth()->user()->id;
            return $this->userDao->create($param);
        }
    }

    /**
     * Show user.
     *
     * @param Int $id
     */
    public function show($id)
    {
        $b64 = '';
        $user = $this->userDao->show($id);
        $profilePath = $user->profile;

        if ($profilePath) {
            // Load file contents into variable
            $bin = file_get_contents(storage_path('app/images/profiles/' . $profilePath));
            $fileNameArr = explode('.', $profilePath);
            $fileExt = end($fileNameArr);

            // Encode contents to Base64
            $b64 = 'data:image/' . $fileExt . ';base64,' . base64_encode($bin);
        }

        return [
            'user'          => $user,
            'profile_image' => $b64
        ];
    }

    /**
     * Delete user.
     *
     * @param Int $id
     */
    public function destory($id)
    {
        return $this->userDao->destory($id);
    }
}
