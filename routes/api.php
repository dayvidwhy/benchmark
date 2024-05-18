<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SurveyController;
use App\Http\Controllers\UserController;

Route::controller(UserController::class)->group(function () {
    Route::get('/users', 'get');
    Route::post('/users', 'store');
    Route::get('/users/{id}', 'show');
    Route::put('/users/{id}', 'update');
    Route::delete('/users/{id}', 'destroy');
});

Route::group(['middleware' => ['web', 'auth']], function () {
    Route::controller(SurveyController::class)->group(function () {
        Route::get('/surveys', 'get');
        Route::post('/surveys', 'store');
        Route::get('/surveys/{id}', 'show');
        Route::put('/surveys/{id}', 'update');
        Route::delete('/surveys/{id}', 'destroy');
    });
});

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
