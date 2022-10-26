<?php

use App\Http\Controllers as Controller;
use App\Http\Middleware\AuthMiddleware;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::post('/login', [Controller\UserController::class, 'login']);
Route::get('/logout', [Controller\UserController::class, 'logout']);

Route::middleware(AuthMiddleware::class)->group(function () {
    Route::get('/auth', [Controller\UserController::class, 'auth']);
    Route::resource('/user', Controller\UserController::class);
    Route::get('/produk/scan', [Controller\ProdukController::class, 'scan']);
    Route::resource('/produk', Controller\ProdukController::class);
    Route::resource('/transaksi.detail', Controller\TransaksiDetailController::class);
    Route::resource('/transaksi', Controller\TransaksiController::class);
});
