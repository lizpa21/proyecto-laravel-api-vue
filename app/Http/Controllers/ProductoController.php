<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;

class ProductoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // /api/producto?page=1&limit=5&q=camisa&orderby=nombre
        $limit = isset($request->limit)?$request->limit:10;
        $buscar = isset($request->q)?$request->q:'';
        $orderby = isset($request->orderby)?$request->orderby:'id';
        if($buscar){
            $productos = Producto::where("nombre", "like", "%$buscar%")
                                    ->orderBy($orderby, "desc")
                                    ->paginate($limit);
        }else{
            $productos = Producto::orderBy($orderby, "desc")
                                    ->paginate($limit);
        }

        return response()->json($productos, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            "nombre" => "required|min:3|max:200",
            "categoria_id" => "required"
        ]);

        $producto = new Producto();
        $producto->nombre = $request->nombre;
        $producto->precio = $request->precio;
        $producto->stock = $request->stock;
        $producto->descripcion = $request->descripcion;
        $producto->categoria_id = $request->categoria_id;
        $producto->save();

        return response()->json(["message" => "Producto Registrado"], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $producto = Producto::find($id);
        return response()->json($producto, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            "nombre" => "required|min:3|max:200",
            "categoria_id" => "required"
        ]);

        $producto = Producto::find($id);
        $producto->nombre = $request->nombre;
        $producto->precio = $request->precio;
        $producto->stock = $request->stock;
        $producto->descripcion = $request->descripcion;
        $producto->categoria_id = $request->categoria_id;
        $producto->update();

        return response()->json(["message" => "Producto Modificado"], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $producto = Producto::find($id);
        $producto->delete();
        return response()->json(["message" => "Producto Eliminado"], 200);
    }
}
