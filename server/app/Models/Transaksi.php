<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Transaksi extends Model
{
    use HasFactory;

    public $table = 'transaksi';

    public $fillable = [
        'userId',
        'customer',
        'pajak',
    ];

    public $casts = [
        'pajak' => 'integer',
        'userId' => 'integer',
    ];

    public $appends = [
        'total',
    ];

    public function getTotalAttribute()
    {
        $total = (int) TransaksiDetail::select(DB::raw('sum(hargaAkhir) as total'))->where('transaksiId', $this->id)->first()?->total;
        return $total;
    }

    public $with = [
        'user',
        'detail',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'userId');
    }

    public function detail()
    {
        return $this->hasMany(TransaksiDetail::class, 'transaksiId');
    }

    public static function rules()
    {
        return [
            'userId' => 'required|integer',
            'customer' => 'required',
            'pajak' => 'required|integer',
        ];
    }
}
