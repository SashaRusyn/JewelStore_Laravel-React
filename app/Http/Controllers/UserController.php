<?php

namespace App\Http\Controllers;

use App\Models\User;
use Auth;
use Illuminate\Http\Request;
use Validator;

class UserController extends Controller
{
    public function index()
    {
        $users = User::orderBy('created_at', 'desc')->get();
        return response()->json($users);
    }

    public function checkEmail(Request $request)
    {
        $validator = Validator::make($request->all(), ['email' => 'required|string|max:255',]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $user = User::where('email', $request->email)->first();

        if ($user) {
            return response()->json(['exists' => true], 200);
        } else {
            return response()->json(['exists' => false], 200);
        }
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), ['name' => 'required|string|max:255', 'email' => 'required|string|max:255', 'password' => 'required|string|min:8']);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password,
            'user_type' => 'user',
        ]);

        if ($user) {
            return response()->json(['created' => true], 200);
        } else {
            return response()->json(['created' => false], 400);
        }
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), ['email' => 'required|string|max:255', 'password' => 'required|string|min:8']);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            return response()->json(['user' => $user, 'authorized' => true], 200);
        } else {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }
}
