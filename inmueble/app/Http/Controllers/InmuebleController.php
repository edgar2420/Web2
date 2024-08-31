<?php

namespace App\Http\Controllers;

use App\Models\Inmueble;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class InmuebleController extends Controller
{
    public function index()
    {
        try {
            $listaInmuebles = Inmueble::all();
        } catch(\Exception $e) {
            return response()->json(['Response' => false, 'Error' => $e]);
        }
        return response()->json(['Inmuebles'=> $listaInmuebles]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->json()->all(), [
            'usuario_id' => ['required', 'integer'],
        ]);
        if ($validator->fails()) {
            return response()->json(["res" => false, "validator" => $validator->messages()]);
        }
        $inmueble = new Inmueble();
        $inmueble->usuario_id = $request->json('usuario_id');
        try {
            $inmueble->save();
        } catch (\Exception $e) {
            return response()->json(['res' => false, 'message' => 'Error al insertar inmueble', 'error' => $e]);
        }
        return response()->json(['res' => true, 'inmueble' => $inmueble]);
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
            $inmueble = Inmueble::find($id);
            if ($inmueble == null){
                return response()->json(['res' => false, 'message' => 'Error, inmueble no encontrada']);
            }
        } catch (\Exception $e) {
            return response()->json(['res' => false, 'message' => 'Error al obtener el inmueble', 'error' => $e]);
        }
        return response()->json(['res' => true, 'inmueble' => $inmueble]);
    }

    public function imagennmuebles($id)
    {
        try {
            $listaImagenes = Inmueble::find($id)->imageninmuebles;
        } catch(\Exception $e) {
            return response()->json(['res' => false, 'message' => 'Error al obtener las imagenes', 'error' => $e]);
        }
        return response()->json(['res' => true, 'inmuebles' => $listaImagenes]);
    }

    public function chats($id)
    {
        try {
            $listaChats = Inmueble::find($id)->chats;
        } catch(\Exception $e) {
            return response()->json(['res' => false, 'message' => 'Error al obtener los chats', 'error' => $e]);
        }
        return response()->json(['res' => true, 'chats' => $listaChats]);
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
            $inmueble = Inmueble::find($id);
            if ($inmueble == null) {
                return response()->json(['res' => false, 'message' => 'Error, inmueble no encontrada']);
            }
        } catch (\Exception $e) {
            return response()->json(['res' => false, 'message' => 'Error al obtener el inmueble', 'error' => $e]);
        }
        try {
            $inmueble->delete();
        } catch (\Exception $e) {
            return response()->json(['res' => false, 'message' => 'Error al eliminar el inmueble', 'error' => $e]);
        }
        return response()->json(['res' => true, 'message' => 'Inmueble eliminado', 'Inmueble'=>$inmueble]);
    }
}
