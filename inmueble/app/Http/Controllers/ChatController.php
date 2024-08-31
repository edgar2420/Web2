<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class ChatController extends Controller
{
    public function index()
    {
        try {
            $listaChats = Chat::all();
        } catch(\Exception $e) {
            return response()->json(['Response' => false, 'Error' => $e]);
        }
        return response()->json(['Chats'=> $listaChats]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->json()->all(), [
            'inmueble_id' => ['required', 'integer'],
            'usuariointeresado_id' => ['required', 'integer'],
            'usuariopropietario_id' => ['required', 'integer']
        ]);
        if ($validator->fails()) {
            return response()->json(["res" => false, "validator" => $validator->messages()]);
        }
        $chat = new Chat();
        $chat->inmueble_id = $request->json('inmueble_id');
        $chat->usuariointeresado_id = $request->json('usuariointeresado_id');
        $chat->usuariopropietario_id = $request->json('usuariopropietario_id');
        try {
            $chat->save();
        } catch (\Exception $e) {
            return response()->json(['res' => false, 'message' => 'Error al insertar chat', 'error' => $e]);
        }
        return response()->json(['res' => true, 'chat' => $chat]);
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
            $chat = Chat::find($id);
            if ($chat == null){
                return response()->json(['res' => false, 'message' => 'Error, chat no encontrada']);
            }
        } catch (\Exception $e) {
            return response()->json(['res' => false, 'message' => 'Error al obtener el chat', 'error' => $e]);
        }
        return response()->json(['res' => true, 'chat' => $chat]);
    }

    public function mensajes($id)
    {
        try {
            $listaMensajes = Chat::find($id)->mensajes;
        } catch(\Exception $e) {
            return response()->json(['res' => false, 'message' => 'Error al obtener los mensajes', 'error' => $e]);
        }
        return response()->json(['res' => true, 'chats' => $listaMensajes]);
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
            $chat = Chat::find($id);
            if ($chat == null) {
                return response()->json(['res' => false, 'message' => 'Error, chat no encontrado']);
            }
        } catch (\Exception $e) {
            return response()->json(['res' => false, 'message' => 'Error al obtener el chat', 'error' => $e]);
        }
        try {
            $chat->delete();
        } catch (\Exception $e) {
            return response()->json(['res' => false, 'message' => 'Error al eliminar el chat', 'error' => $e]);
        }
        return response()->json(['res' => true, 'message' => 'Chat eliminado', 'Chat'=>$chat]);
    }
}
