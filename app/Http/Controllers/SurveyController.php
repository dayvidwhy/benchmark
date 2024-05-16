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
        try {
            $surveys = Survey::all();
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to retrieve surveys'
            ], 500);
        }
        return response()->json([
            'status' => 'success',
            'data' => $surveys
        ]);
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
            ], 500);
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
            ], 400);
        }

        if (!is_string($id)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Survey ID must be a string'
            ], 400);
        }

        try { 
            $survey = Survey::findOrFail($id);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Survey not found'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $survey
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id) {
        try {
            $validatedData = $request->validate([
                'survey.title' => 'required',
                'survey.questions' => 'required'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Survey title and questions are required'
            ], 400);
        }

        try {
            $survey = Survey::findOrFail($id);
            $survey->title = $validatedData['survey']['title'];
            $survey->questions = $validatedData['survey']['questions'];
            $survey->save();
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Survey update failed'
            ], 500);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Survey updated successfully'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id) {
        try {
            $survey = Survey::findOrFail($id);
            $survey->delete();
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Survey deletion failed'
            ], 500);
        }
        
        return response()->json([
            'status' => 'success',
            'message' => 'Survey deleted successfully'
        ]);
    }
}
