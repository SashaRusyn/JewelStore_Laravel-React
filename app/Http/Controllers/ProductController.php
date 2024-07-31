<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Validator;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function latests()
    {
        $products = Product::latest()->take(6)->get();
        return response()->json($products);
    }

    public function index()
    {
        $products = Product::orderBy('created_at', 'desc')->get();
        return response()->json($products);
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
        $validator = Validator::make($request->all(), ['name' => 'required|string|max:255', 'description' => 'required|string|max:255', 'price' => 'required|integer|min:1', 'photo' => 'required|string', 'type' => 'required|string']);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $product = Product::create([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'photo' => $request->photo,
            'type' => $request->type,
        ]);

        if ($product) {
            return response()->json(['is_added' => true], 200);
        } else {
            return response()->json(['is_added' => false], 400);
        }
    }

    public function show()
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function item(string $id)
    {
        $productItem = Product::where('id', $id)->first();

        return response()->json($productItem);
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
        $validatedData = $request->validate(['name' => 'required|string', 'description' => 'required|string', 'price' => 'required|integer|min:1', 'photo' => 'required|string', 'type' => 'required|string']);

        $productItem = Product::where('id', $id)->first();

        if ($productItem) {
            $productItem->name = $validatedData['name'];
            $productItem->description = $validatedData['description'];
            $productItem->price = $validatedData['price'];
            $productItem->type = $validatedData['type'];
            $productItem->photo = $validatedData['photo'];
            $productItem->save();
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
        $productItem = Product::where('id', $id)->first();

        if ($productItem) {
            $productItem->delete();
            return response()->json(['is_deleted' => true], 200);
        } else {
            return response()->json(['is_deleted' => false], 404);
        }
    }
}
