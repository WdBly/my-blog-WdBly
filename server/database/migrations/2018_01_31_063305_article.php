<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Article extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title',50)->comment('文章标题');
            $table->string('description',255)->comment('文章描述');
            $table->text('content')->comment('文章内容');
            $table->string('img')->comment('文章头图');
            $table->integer('u_id')->comment('用户');
            $table->integer('ca_id')->comment('分类id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('articles');
    }
}
