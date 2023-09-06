<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UsuarioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $usuarios = User::get();
        return response ()->json($usuarios, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $request->validate([
            "name"=>"required",
            "email"=>"required|email|unique:users",
            "password"=>"required",

        ]);
        $usuario = new User();
        $usuario->name =$request->name;
        $usuario->email =$request->email;
        $usuario->password = Hash::make($request->password);

        $usuario->save();
        // respuesta
        return response()->json(["message" => "Usuario registrado", "data"=> $usuario], 201);


    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $usuario = User::findOrFail($id);
        return response()->json($usuario,200);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $request->validate([
            "name"=>"required",
            "email"=>"required|email|unique:users",
            "password"=>"required",

        ]);

        $usuario = User::find($id);
        $usuario->name =$request->name;
        $usuario->email =$request->email;
        if($request->password){
            $usuario->password = Hash::make($request->password);
        }
        $usuario->update();
        // respuesta
        return response()->json(["message" => "Usuario actualizado", "data"=> $usuario], 201);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $usuario = User::find($id);
        $usuario->delete();
        return response()->json(["message" => "Usuario eliminado", "data"=> $usuario], 200);



    }
}
