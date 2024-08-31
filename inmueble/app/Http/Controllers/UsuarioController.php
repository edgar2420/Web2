<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UsuarioController extends Controller
{
    public function index()
    {
        try {
            $listaUsuarios = Usuario::all();
        } catch(\Exception $e) {
            return response()->json(['Response' => false, 'Error' => $e]);
        }
        return response()->json(['Usuarios'=> $listaUsuarios]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->json()->all(), [
            'nombre' => ['required', 'string'],
            'password' => ['required', 'string']
        ]);
        if ($validator->fails()) {
            return response()->json(["res" => false, "validator" => $validator->messages()]);
        }
        $usuario = new Usuario();
        $usuario->nombre = $request->json('nombre');
        $usuario->password = $request->json('password');
        try {
            $usuario->save();
        } catch (\Exception $e) {
            return response()->json(['res' => false, 'message' => 'Error al insertar usuario', 'error' => $e]);
        }
        return response()->json(['res' => true, 'usuario' => $usuario]);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->json()->all(), [
            'nombre' => ['required', 'string'],
            'password' => ['required', 'string']
        ]);
        if ($validator->fails()) {
            return response()->json(['res' => false, 'validator' => $validator->messages()]);
        }
        try {
            $usuario = Usuario::where(
                ['nombre' => $request->json('nombre'), 'password' => $request->json('password')]
            )->first();
            if ($usuario == null) {
                return response()->json(['res' => false, 'message' => 'Error, usuario no encontrado']);
            }
        } catch (\Exception $e) {
            return response()->json(['res' => false, 'message' => 'Error al obtener el usuario', 'error' => $e]);
        }
        return response()->json(['res' => true, 'usuario' => $usuario]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        try {
            $usuario = Usuario::find($id);
            if ($usuario == null){
                return response()->json(['res' => false, 'message' => 'Error, usuario no encontrada']);
            }
        } catch (\Exception $e) {
            return response()->json(['res' => false, 'message' => 'Error al obtener el usuario', 'error' => $e]);
        }
        return response()->json(['res' => true, 'usuario' => $usuario]);
    }

    public function inmuebles($id)
    {
        try {
            $listaInmuebles = Usuario::find($id)->inmuebles;
        } catch(\Exception $e) {
            return response()->json(['res' => false, 'message' => 'Error al obtener los inmuebles', 'error' => $e]);
        }
        return response()->json(['res' => true, 'inmuebles' => $listaInmuebles]);
    }

    public function mensajes($id)
    {
        try {
            $listaMensajes = Usuario::find($id)->mensajes;
        } catch(\Exception $e) {
            return response()->json(['res' => false, 'message' => 'Error al obtener los mensajes', 'error' => $e]);
        }
        return response()->json(['res' => true, 'mensajes' => $listaMensajes]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function edit(Request $request, $id)
    {
        try {
            $usuario = Usuario::find($id);
            if ($usuario == null) {
                return response()->json(['res' => false, 'message' => 'Error, usuario no encontrada']);
            }
        } catch (\Exception $e) {
            return response()->json(['res' => false, 'message' => 'Error al obtener el usuario', 'error' => $e]);
        }
        try {
            $usuario->fill($request->json()->all());
        } catch (\Exception $e) {
            return response()->json(['res' => false, 'message' => 'Error al editar usuario', 'error' => $e]);
        }
        $usuario->save();
        return response()->json($usuario);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        try {
            $usuario = Usuario::find($id);
            if ($usuario == null) {
                return response()->json(['res' => false, 'message' => 'Error, usuario no encontrado']);
            }
        } catch (\Exception $e) {
            return response()->json(['res' => false, 'message' => 'Error al obtener el usuario', 'error' => $e]);
        }
        $validator = Validator::make($request->json()->all(), [
            'nombre' => ['required', 'string'],
            'password' => ['required', 'string']
        ]);
        if($validator->fails()){
            return response()->json($validator->errors());
        }
        try {
            $usuario->update($request->all());
        } catch (\Exception $e) {
            return response()->json(['res' => false, 'message' => 'Error al editar el usuario', 'error' => $e]);
        }
        return $usuario;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        try {
            $usuario = Usuario::find($id);
            if ($usuario == null) {
                return response()->json(['res' => false, 'message' => 'Error, usuario no encontrada']);
            }
        } catch (\Exception $e) {
            return response()->json(['res' => false, 'message' => 'Error al obtener el usuario', 'error' => $e]);
        }
        try {
            $usuario->delete();
        } catch (\Exception $e) {
            return response()->json(['res' => false, 'message' => 'Error al eliminar el usuario', 'error' => $e]);
        }
        return response()->json(['res' => true, 'message' => 'Usuario eliminado', 'Usuario'=>$usuario]);
    }
}
