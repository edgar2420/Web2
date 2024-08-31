<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('imageninmuebles', function (Blueprint $table) {
            $table->id();
            $table->string('rutaAlmacenamiento');
            $table->string('nombreArchivo');
            $table->date('fechaSubida');
            $table->bigInteger('inmueble_id')->unsigned();
            $table->foreign('inmueble_id')->references('id')->on('inmuebles')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('imageninmueble');
    }
};
