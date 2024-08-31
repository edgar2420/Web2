<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Chat extends Model
{
    use HasFactory;

    protected $fillable = [
        'inmueble_id',
        'usuariointeresado_id',
        'usuariopropietario_id',
    ];

    public function mensajes(): HasMany
    {
        return $this->hasMany(Mensaje::class);
    }

    public function inmuebles(): BelongTo
    {
        return $this->belongsTo(Inmueble::class);
    }
}
