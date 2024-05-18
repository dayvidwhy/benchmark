<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class UserController extends Controller
{
    
    /**
     * Display a listing of the resource.
     */
    public function get()
    {
        return User::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        try {
            $validDetails = $request->validate([
                'name' => ['required'],
                'email' => ['required', 'email'],
                'password' => ['required']
            ]);

        } catch (\Exception $e) {
            return back()->withErrors([
                'message' => 'Please provide all fields.'
            ]);
        }

        try {
            User::create($validDetails);
            return redirect()->intended('/login');
        } catch (\Exception $e) {
            return back()->withErrors([
                'message' => 'Something went wrong registering.'
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        return User::findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $user->update($request->all());
        return $user;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return $user;
    }
}
