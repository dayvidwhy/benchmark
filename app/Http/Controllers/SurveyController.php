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
            return response()->json([
                'status' => 'error',
                'message' => 'Survey creation failed'
            ], 500);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Survey created successfully',
            'survey_id' => $survey->id,
            'survey_title' => $survey->title
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
                'survey.questions' => 'sometimes'
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
            $survey->save();

            // Fetch existing questions, as we insert, tick them off
            // Remaining questions would have been deleted in the UI
            $existingQuestions = $survey->questions()->get();

            // Then update or create the questions
            foreach ($validatedData['survey']['questions'] as $index=>$question) {
                if ($question['id'] === null) {
                    $survey->questions()->create([
                        'label' => $question['label'],
                        'questionType' => $question['questionType'],
                        'description' => $question['description'],
                        'order' => $index,
                    ]);
                    continue;
                }
                
                // otherwise get the entry and update it
                $survey->questions()->where('id', $question['id'])->update([
                    'label' => $question['label'],
                    'questionType' => $question['questionType'],
                    'description' => $question['description'],
                    'order' => $index,
                ]);

                // remove the question from the existing questions
                $existingQuestions = $existingQuestions->filter(function ($existingQuestion) use ($question) {
                    return $existingQuestion->id !== $question['id'];
                });
            }

            // if there's leftover questions, delete them
            foreach ($existingQuestions as $existingQuestion) {
                $existingQuestion->delete();
            }
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Survey update failed'. $e->getMessage()
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
