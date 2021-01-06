<?php

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->truncate();
        $userArr = [
            [
                'name' => 'Admin',
                'email' => 'admin@example.com',
                'type' => 0,
                'created_user_id' => 1,
                'phone' => '959799808011',
                'birth_date' => Carbon::createFromDate(2020, 4, 23),
                'address' => 'Yangon',
                'password' => Hash::make('admin'),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'User 01',
                'email' => 'user01@example.com',
                'type' => 1,
                'created_user_id' => 1,
                'phone' => '959799808010',
                'birth_date' => Carbon::createFromDate(2020, 4, 25),
                'address' => 'Yangon',
                'password' => Hash::make('user01'),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'User 02',
                'email' => 'user02@example.com',
                'type' => 1,
                'created_user_id' => 1,
                'phone' => '959799808000',
                'birth_date' => Carbon::createFromDate(2020, 5, 27),
                'address' => 'Yangon',
                'password' => Hash::make('user02'),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]
        ];
        foreach ($userArr as $user) {
            DB::table('users')->insert($user);
        }
    }
}
