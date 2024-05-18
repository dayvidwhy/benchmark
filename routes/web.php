<?php

use Illuminate\Support\Facades\Route;
use App\Models\Survey;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\SurveyController;
use App\Http\Controllers\UserController;
use Inertia\Inertia;

// Public web routes
Route::get('/', function () {
    return Inertia::render('Home');
});

Route::get('/login', function () {
    return Inertia::render('Login');
})->name('login');

Route::get('/register', function () {
    return Inertia::render('Register');
})->name('register');

// Anonymous viewing route
Route::get('/survey/{id}', function ($id) {
    $survey = Survey::find($id);
    return Inertia::render('SurveyView', [
        'survey' => $survey,
        'questions' => $survey->questions()->orderBy('order')->get()
    ]);
});

Route::controller(UserController::class)->group(function () {
    // Route::get('/users', 'get');
    Route::post('/users', 'store');
    // Route::get('/users/{id}', 'show');
    // Route::put('/users/{id}', 'update');
    // Route::delete('/users/{id}', 'destroy');
});

// Authenticated routes
Route::post('/login', [AuthController::class, 'authenticate']);
Route::get('/logout', [AuthController::class, 'logout'])->middleware('auth');

// Protected routes
Route::get('/survey', function () {
    return Inertia::render('SurveyList', [
        'surveys' => Survey::all()
    ]);
})->middleware('auth');

Route::get('/survey/{id}/edit', function ($id) {
    $survey = Survey::find($id);
    return Inertia::render('SurveyEdit', [
        'survey' => $survey,
        'questions' => $survey->questions()->orderBy('order')->get()
    ]);
})->middleware('auth');

Route::controller(SurveyController::class)->group(function () {
    Route::get('/surveys', 'get');
    Route::post('/surveys', 'store');
    Route::get('/surveys/{id}', 'show');
    Route::put('/surveys/{id}', 'update');
    Route::delete('/surveys/{id}', 'destroy');
})->middleware('auth');
