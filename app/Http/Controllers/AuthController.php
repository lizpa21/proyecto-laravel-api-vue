<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    //
    public function funIngresar(Request $request){

    }
    public function funRegistro(Request $request){
        // validar (Accept: application/json)
        $request->validate([
            "name" => "required",
            "email" => "required|email|unique:users",
            "password" => "required"
        ]);
        // guardar
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        $user->save();
        // respuesta
        return response()->json(["message" => "Usuario registrado", "data"=> $user], 201);
    }
    public function funPerfil(){
        
    }
    public function funSalir(){
        
    }
}
