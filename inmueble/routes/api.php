<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\UsuarioController;
use \App\Http\Controllers\InmuebleController;
use \App\Http\Controllers\ImageninmuebleController;
use \App\Http\Controllers\ChatController;
use \App\Http\Controllers\MensajeController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/usuarios/',[UsuarioController::class, 'store']);
Route::post('/usuarios/login',[UsuarioController::class, 'login']);
Route::get('/usuarios/',[UsuarioController::class, 'index']);
Route::get('/usuarios/inmuebles/{id}',[UsuarioController::class, 'inmuebles']);
Route::get('/usuarios/mensajes/{id}',[UsuarioController::class, 'mensajes']);
Route::get('/usuarios/{id}',[UsuarioController::class, 'show']);
Route::put('/usuarios/{id}',[UsuarioController::class, 'update']);
Route::patch('/usuarios/{id}',[UsuarioController::class, 'edit']);
Route::delete('/usuarios/{id}',[UsuarioController::class, 'destroy']);

Route::post('/inmuebles/',[InmuebleController::class, 'store']);
Route::get('/inmuebles/',[InmuebleController::class, 'index']);
Route::get('/inmuebles/chats/{id}',[InmuebleController::class, 'chats']);
Route::get('/inmuebles/imagenes/{id}',[InmuebleController::class, 'imagennmuebles']);
Route::get('/inmuebles/{id}',[InmuebleController::class, 'show']);
Route::put('/inmuebles/{id}',[InmuebleController::class, 'update']);
Route::patch('/inmuebles/{id}',[InmuebleController::class, 'edit']);
Route::delete('/inmuebles/{id}',[InmuebleController::class, 'destroy']);

Route::post('/imagenes/',[ImageninmuebleController::class, 'store']);
Route::get('/imagenes/',[ImageninmuebleController::class, 'index']);
Route::get('/imagenes/chats/{id}',[ImageninmuebleController::class, 'chats']);
Route::get('/imagenes/imagenes/{id}',[ImageninmuebleController::class, 'imagennmuebles']);
Route::get('/imagenes/{id}',[ImageninmuebleController::class, 'show']);
Route::put('/imagenes/{id}',[ImageninmuebleController::class, 'update']);
Route::patch('/imagenes/{id}',[ImageninmuebleController::class, 'edit']);
Route::delete('/imagenes/{id}',[ImageninmuebleController::class, 'destroy']);

Route::post('/chats/',[ChatController::class, 'store']);
Route::get('/chats/',[ChatController::class, 'index']);
Route::get('/chats/mensajes/{id}',[ChatController::class, 'mensajes']);
Route::get('/chats/{id}',[ChatController::class, 'show']);
Route::delete('/chats/{id}',[ChatController::class, 'destroy']);

Route::post('/mensajes/',[MensajeController::class, 'store']);
Route::get('/mensajes/',[MensajeController::class, 'index']);
Route::get('/mensajes/{id}',[MensajeController::class, 'show']);
Route::delete('/mensajes/{id}',[MensajeController::class, 'destroy']);