<?php

namespace App\Http\Controllers;

use App\Models\Imageninmueble;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ImageninmuebleController extends Controller
{
    public function index()
    {
        try {
            $listaImagenes = Imageninmueble::all();
        } catch(\Exception $e) {
            return response()->json(['Response' => false, 'Error' => $e]);
        }
        return response()->json(['imagenes'=> $listaImagenes]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->json()->all(), [
            'rutaAlmacenamiento' => ['required', 'string'],
            'nombreArchivo' => ['required', 'string'],
            'fechaSubida' => ['required', 'date'],
            'inmueble_id' => ['required', 'integer']
        ]);
        if ($validator->fails()) {
            return response()->json(["res" => false, "validator" => $validator->messages()]);
        }
        $imagen = new Imageninmueble();
        $imagen->rutaAlmacenamiento = $request->json('rutaAlmacenamiento');
        $imagen->nombreArchivo = $request->json('nombreArchivo');
        $imagen->fechaSubida = $request->json('fechaSubida');
        $imagen->inmueble_id = $request->json('inmueble_id');
        try {
            $imagen->save();
        } catch (\Exception $e) {
            return response()->json(['res' => false, 'message' => 'Error al insertar imagen', 'error' => $e]);
        }
        return response()->json(['res' => true, 'inmueble' => $imagen]);
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
            $imagen = Imageninmueble::find($id);
            if ($imagen == null){
                return response()->json(['res' => false, 'message' => 'Error, imagen no encontrada']);
            }
        } catch (\Exception $e) {
            return response()->json(['res' => false, 'message' => 'Error al obtener la imagen', 'error' => $e]);
        }
        return response()->json(['res' => true, 'imagen' => $imagen]);
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
            $inmueble = Inmueble::find($id);
            if ($inmueble == null) {
                return response()->json(['res' => false, 'message' => 'Error, inmueble no encontrada']);
            }
        } catch (\Exception $e) {
            return response()->json(['res' => false, 'message' => 'Error al obtener el inmueble', 'error' => $e]);
        }
        try {
            $inmueble->fill($request->json()->all());
        } catch (\Exception $e) {
            return response()->json(['res' => false, 'message' => 'Error al editar inmueble', 'error' => $e]);
        }
        $inmueble->save();
        return response()->json($inmueble);
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
            $inmueble = Inmueble::find($id);
            if ($inmueble == null) {
                return response()->json(['res' => false, 'message' => 'Error, inmueble no encontrado']);
            }
        } catch (\Exception $e) {
            return response()->json(['res' => false, 'message' => 'Error al obtener el inmueble', 'error' => $e]);
        }
        $validator = Validator::make($request->json()->all(), [
            'usuario_id' => ['required', 'integer']
        ]);
        if($validator->fails()){
            return response()->json($validator->errors());
        }
        try {
            $inmueble->update($request->all());
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
            $imagen = Imageninmueble::find($id);
            if ($imagen == null) {
                return response()->json(['res' => false, 'message' => 'Error, imagen no encontrada']);
            }
        } catch (\Exception $e) {
            return response()->json(['res' => false, 'message' => 'Error al obtener la imagen', 'error' => $e]);
        }
        try {
            $imagen->delete();
        } catch (\Exception $e) {
            return response()->json(['res' => false, 'message' => 'Error al eliminar la imagen', 'error' => $e]);
        }
        return response()->json(['res' => true, 'message' => 'Imagen eliminado', 'Imagen'=>$imagen]);
    }
}
