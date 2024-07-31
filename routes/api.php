<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/users', [App\Http\Controllers\UserController::class, 'index']);
Route::post('/users', [App\Http\Controllers\UserController::class, 'store']);
Route::post('/check-email', [App\Http\Controllers\UserController::class, 'checkEmail']);
Route::post('/login', [App\Http\Controllers\UserController::class, 'login']);

Route::get('/products', [App\Http\Controllers\ProductController::class, 'index']);
Route::post('/products', [App\Http\Controllers\ProductController::class, 'store']);
Route::get('/latests', [App\Http\Controllers\ProductController::class, 'latests']);
Route::post('/products/{product}', [App\Http\Controllers\ProductController::class, 'item']);
Route::patch('/products/{product}', [App\Http\Controllers\ProductController::class, 'update']);
Route::delete('/products/{product}', [App\Http\Controllers\ProductController::class, 'destroy']);

Route::get('/messages', [App\Http\Controllers\ContactController::class, 'index']);
Route::post('/messages', [App\Http\Controllers\ContactController::class, 'store']);
Route::delete('/messages/{message}', [App\Http\Controllers\ContactController::class, 'destroy']);

Route::post('/carts', [App\Http\Controllers\CartController::class, 'store']);
Route::patch('/carts/{cart}', [App\Http\Controllers\CartController::class, 'update']);
Route::delete('/carts/{cart}', [App\Http\Controllers\CartController::class, 'destroy']);
Route::post('/my-carts', [App\Http\Controllers\CartController::class, 'getCartItems']);
Route::post('/my-carts-clear', [App\Http\Controllers\CartController::class, 'clear']);

Route::get('/orders', [App\Http\Controllers\OrderController::class, 'index']);
Route::post('/orders', [App\Http\Controllers\OrderController::class, 'store']);
Route::patch('/orders/{order}', [App\Http\Controllers\OrderController::class, 'update']);
Route::delete('/orders/{order}', [App\Http\Controllers\OrderController::class, 'destroy']);
Route::post('/my-orders', [App\Http\Controllers\OrderController::class, 'getOrderItems']);

Route::get('/report', [App\Http\Controllers\AdminController::class, 'getReportInfo']);