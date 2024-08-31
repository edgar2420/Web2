<?php

namespace App\Http\Controllers;

use App\Models\Mensaje;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MensajeController extends Controller
{
    public function index()
    {
        try {
            $listaMensajes = Mensaje::all();
        } catch(\Exception $e) {
            return response()->json(['Response' => false, 'Error' => $e]);
        }
        return response()->json(['Chats'=> $listaMensajes]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->json()->all(), [
            'usuario_id' => ['required', 'integer'],
            'chat_id' => ['required', 'integer'],
            'fecha' => ['required', 'date'],
            'mensaje' => ['required', 'string'],
        ]);
        if ($validator->fails()) {
            return response()->json(["res" => false, "validator" => $validator->messages()]);
        }
        $mensaje = new Mensaje();
        $mensaje->usuario_id = $request->json('usuario_id');
        $mensaje->chat_id = $request->json('chat_id');
        $mensaje->fecha = $request->json('fecha');
        $mensaje->mensaje = $request->json('mensaje');
        try {
            $mensaje->save();
        } catch (\Exception $e) {
            return response()->json(['res' => false, 'message' => 'Error al insertar mensaje', 'error' => $e]);
        }
        return response()->json(['res' => true, 'mensaje' => $mensaje]);
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
            $mensaje = Mensaje::find($id);
            if ($mensaje == null){
                return response()->json(['res' => false, 'message' => 'Error, mensaje no encontrado']);
            }
        } catch (\Exception $e) {
            return response()->json(['res' => false, 'message' => 'Error al obtener el mensaje', 'error' => $e]);
        }
        return response()->json(['res' => true, 'chat' => $mensaje]);
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
            $mensaje = Mensaje::find($id);
            if ($mensaje == null) {
                return response()->json(['res' => false, 'message' => 'Error, mensaje no encontrado']);
            }
        } catch (\Exception $e) {
            return response()->json(['res' => false, 'message' => 'Error al obtener el mensaje', 'error' => $e]);
        }
        try {
            $mensaje->delete();
        } catch (\Exception $e) {
            return response()->json(['res' => false, 'message' => 'Error al eliminar el mensaje', 'error' => $e]);
        }
        return response()->json(['res' => true, 'message' => 'Mensaje eliminado', 'Mensaje' => $mensaje]);
    }
}
