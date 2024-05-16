<?php

use Illuminate\Support\Facades\Route;
use App\Models\Survey;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
});

Route::get('/survey', function () {
    return Inertia::render('SurveyList', [
        'surveys' => Survey::all()
    ]);
});

Route::get('/survey/{id}', function ($id) {
    return Inertia::render('SurveyView', [
        'survey' => Survey::find($id)
    ]);
});

Route::get('/survey/{id}/edit', function ($id) {
    return Inertia::render('SurveyEdit', [
        'survey' => Survey::find($id)
    ]);
});
