<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('email')->unique();
            $table->string('password');
            $table->string('profile')->nullable(); // TODO: remove nullable
            $table->string('type', 1)->default(1);
            $table->string('phone', 12)->nullable();
            $table->string('address')->nullable();
            $table->date('birth_date')->nullable(); // TODO: rename to dob
            $table->timestamp('email_verified_at')->nullable();
            $table->rememberToken();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::table(
            'users',
            function (Blueprint $table) {
                $table->unsignedBigInteger('created_user_id')->after('birth_date');
                $table->foreign('created_user_id')->references('id')->on('users');
            }
        );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
