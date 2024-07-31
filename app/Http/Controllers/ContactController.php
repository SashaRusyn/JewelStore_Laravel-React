<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Validator;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $contacts = Contact::orderBy('created_at', 'desc')->get();
        return response()->json($contacts);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), ['user_id' => 'required|integer', 'name' => 'required|string|max:255', 'email' => 'required|string|max:255', 'number' => 'required|string|min:10', 'message' => 'required|string']);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $message = Contact::create([
            'user_id' => $request->user_id,
            'name' => $request->name,
            'email' => $request->email,
            'number' => $request->number,
            'message' => $request->message,
        ]);

        if ($message) {
            return response()->json(['is_sent' => true], 200);
        } else {
            return response()->json(['is_sent' => false], 400);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function create(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $messageItem = Contact::where('id', $id)->first();

        if ($messageItem) {
            $messageItem->delete();
            return response()->json(['is_deleted' => true], 200);
        } else {
            return response()->json(['is_deleted' => false], 404);
        }
    }
}
