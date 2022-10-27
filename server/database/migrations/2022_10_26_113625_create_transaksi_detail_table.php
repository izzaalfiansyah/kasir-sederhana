<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('transaksi_detail', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('transaksiId')->unsigned();
            $table->bigInteger('produkId')->unsigned();
            $table->integer('harga');
            $table->integer('jumlah');
            $table->integer('diskon');
            $table->integer('hargaAkhir');
            $table->timestamps();

            $table->foreign('transaksiId')->on('transaksi')->references('id')->onDelete('cascade');
            $table->foreign('produkId')->on('produk')->references('id')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('transaksi_detail');
    }
};
