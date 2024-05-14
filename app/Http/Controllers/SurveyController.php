<?php

namespace App\Http\Controllers;

use App\Models\Survey;
use Illuminate\Http\Request;

class SurveyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function get()
    {
        return Survey::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $survey = new Survey;
            // pull the name from the json request
            $survey->title = $request->input('survey.title');
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
        return Survey::findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $survey = Survey::findOrFail($id);
        $survey->update($request->all());
        return $survey;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $survey = Survey::findOrFail($id);
        $survey->delete();
        return $survey;
    }
}
