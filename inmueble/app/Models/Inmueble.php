<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Inmueble extends Model
{
    use HasFactory;

    protected $fillable = [
        'usuario_id'
    ];

    public function imageninmuebles(): HasMany
    {
        return $this->hasMany(Imageninmueble::class);
    }

    public function chats(): HasMany
    {
        return $this->hasMany(Chat::class);
    }

    public function usuarios(): BelongTo
    {
        return $this->belongsTo(Usuario::class);
    }
}
