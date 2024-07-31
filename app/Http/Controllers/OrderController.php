<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Validator;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function getOrderItems(Request $request)
    {
        $userId = $request->user_id;

        $cartItems = Order::where('user_id', $userId)->get();

        return response()->json($cartItems);
    }

    public function index()
    {
        $orders = Order::orderBy('created_at', 'desc')->get();
        return response()->json($orders);
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
        $validator = Validator::make($request->all(), ['user_id' => 'required|integer', 'email' => 'required|string|max:255', 'name' => 'required|string|min:8', 'phone' => 'required|string|min:10', 'method' => 'required|string', 'address' => 'required|string', 'total_products' => 'required|string', 'total_price' => 'required|integer|min:1', 'status' => 'required|string']);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $order = Order::create([
            'user_id' => $request->user_id,
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'method' => $request->method,
            'address' => $request->address,
            'status' => $request->status,
            'total_products' => $request->total_products,
            'total_price' => $request->total_price,
        ]);

        if ($order) {
            return response()->json(['ordered' => true], 200);
        } else {
            return response()->json(['ordered' => false], 400);
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
        $validatedData = $request->validate(['status' => 'required|string']);

        $orderItem = Order::where('id', $id)->first();

        if ($orderItem) {
            $orderItem->status = $validatedData['status'];
            $orderItem->save();
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
        $orderItem = Order::where('id', $id)->first();

        if ($orderItem) {
            $orderItem->delete();
            return response()->json(['is_deleted' => true], 200);
        } else {
            return response()->json(['is_deleted' => false], 404);
        }
    }
}
