<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Imageninmueble extends Model
{
    use HasFactory;

    protected $fillable = [
        'rutaAlmacenamiento',
        'nombreArchivo',
        'fechaSubida',
        'inmueble_id',
    ];

    public function inmuebles(): HasMany
    {
        return $this->belongsTo(Inmueble::class);
    }
}
