<?php

use Illuminate\Support\Facades\Route;
use App\Models\Survey;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('HomePage');
});

Route::get('/survey', function () {
    return Inertia::render('SurveyPage', [
        'surveys' => Survey::all()
    ]);
});

Route::get('/survey/{id}', function ($id) {
    return Inertia::render('SurveyViewPage', [
        'survey' => Survey::find($id)
    ]);
});
