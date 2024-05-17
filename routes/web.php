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
    $survey = Survey::find($id);
    return Inertia::render('SurveyView', [
        'survey' => $survey,
        'questions' => $survey->questions()->orderBy('order')->get()
    ]);
});

Route::get('/survey/{id}/edit', function ($id) {
    $survey = Survey::find($id);
    return Inertia::render('SurveyEdit', [
        'survey' => $survey,
        'questions' => $survey->questions()->orderBy('order')->get()
    ]);
});
