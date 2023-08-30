<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    //
    public function funIngresar(Request $request){
        // validar
        $credenciales = $request->validate([
            "email" => "required|email",
            "password" => "required"
        ]);
        //verificar y autenticar
        if(!Auth::attempt($credenciales)){
            return response()->json("No autenticado",401);

        }
        
        //generamos token

        $usuario =Auth::user();
        //$token = $usuario->createToken("token personal")->plainTextToken;
        $token = $request->user()->createToken("token personal")->plainTextToken;
        return response()->json([
            "acces_token"=> $token,
            "token_type" =>   "Bearer",
            "usuario" => $request->user()


        ]);

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
    public function funPerfil(Request $request){

        //$usuario = $request->user();
        //$usuario = $request->user()->persona;
       // $usuario = Auth::user()->with("persona");
        $usuario = User::with('persona')->find(Auth::user()->id);
        return response()->json($usuario,200);
        
    }
    public function funSalir(Request $request){
        $usuario=$request->user();
        $usuario->tokens->delete();

        return response()->json(["message"=>"log out"]);
        
    }
}
