<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mensaje extends Model
{
    use HasFactory;

    protected $fillable = [
        'usuario_id',
        'chat_id',
        'fecha',
        'mensaje',
    ];

    public function usuarios(): BelongsTo
    {
        return $this->belongsTo(Usuario::class);
    }

    public function chats(): BelongTo
    {
        return $this->belongsTo(Chat::class);
    }
}
