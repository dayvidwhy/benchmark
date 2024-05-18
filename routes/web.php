<?php

use Illuminate\Support\Facades\Route;
use App\Models\Survey;
use App\Http\Controllers\AuthController;
use Inertia\Inertia;

// Public routes
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

// Authenticated routes
Route::post('/login', [AuthController::class, 'authenticate']);
Route::get('/logout', [AuthController::class, 'logout'])->middleware('auth');

// Protected routes
Route::group(['middleware' => 'auth'], function () {
    Route::get('/survey', function () {
        return Inertia::render('SurveyList', [
            'surveys' => Survey::all()
        ]);
    });
    
    Route::get('/survey/{id}/edit', function ($id) {
        $survey = Survey::find($id);
        return Inertia::render('SurveyEdit', [
            'survey' => $survey,
            'questions' => $survey->questions()->orderBy('order')->get()
        ]);
    });
});
