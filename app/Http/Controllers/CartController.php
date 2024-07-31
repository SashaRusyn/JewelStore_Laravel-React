<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Illuminate\Http\Request;
use Validator;

class CartController extends Controller
{

    public function getCartItems(Request $request)
    {
        $userId = $request->user_id;

        $cartItems = Cart::where('user_id', $userId)->with('product')->get();

        return response()->json($cartItems);
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), ['user_id' => 'required|integer', 'product_id' => 'required|integer', 'quantity' => 'required|integer']);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $cart = Cart::create([
            'user_id' => $request->user_id,
            'product_id' => $request->product_id,
            'quantity' => $request->quantity,
        ]);

        if ($cart) {
            return response()->json(['is_added' => true], 200);
        } else {
            return response()->json(['is_added' => false], 400);
        }
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
        $validatedData = $request->validate(['quantity' => 'required|integer|min:1', 'user_id' => 'required|integer']);

        $cartItem = Cart::where('user_id', $request->user_id)->where('id', $id)->first();

        if ($cartItem) {
            $cartItem->quantity = $validatedData['quantity'];
            $cartItem->save();
            return response()->json(['is_updated' => true], 200);
        } else {
            return response()->json(['is_updated' => false], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $cartItem = Cart::where('id', $id)->first();

        if ($cartItem) {
            $cartItem->delete();
            return response()->json(['is_deleted' => true], 200);
        } else {
            return response()->json(['is_deleted' => false], 404);
        }
    }

    public function clear(Request $request)
    {
        $val = $request->validate(['user_id' => 'required']);

        $result = Cart::where('user_id', $request->user_id)->delete();

        if ($result) {
            return response()->json(['is_cleared' => true], 200);
        } else {
            return response()->json(['is_cleared' => false], 404);
        }
    }
}
