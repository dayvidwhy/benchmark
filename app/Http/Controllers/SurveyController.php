<?php

namespace App\Http\Controllers;

use App\Models\Survey;
use Illuminate\Http\Request;

class SurveyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function get() {
        return Survey::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {

        try {
            $validatedData = $request->validate([
                'survey.title' => 'required',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Survey title is required'
            ], 400);
        }

        try {
            $survey = new Survey;
            // pull the name from the json request
            $survey->title = $validatedData['survey']['title'];
            $survey->save();
        } catch (\Exception $e) {
            echo $e->getMessage();
            return response()->json([
                'status' => 'error',
                'message' => 'Survey creation failed'
            ]);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Survey created successfully'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id) {
        if (!isset($id)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Survey ID not provided'
            ]);
        }

        if (!is_string($id)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Survey ID must be a string'
            ]);
        }

        try { 
            $survey = Survey::findOrFail($id);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Survey not found'
            ]);
        }
        return $survey;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id) {
        $survey = Survey::findOrFail($id);
        $survey->update($request->all());
        return $survey;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id) {
        $survey = Survey::findOrFail($id);
        $survey->delete();
        return $survey;
    }
}
