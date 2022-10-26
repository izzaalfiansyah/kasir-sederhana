<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransaksiDetail extends Model
{
    use HasFactory;

    public $table = 'transaksi_detail';

    public $fillable = [
        'transaksiId',
        'produkId',
        'harga',
        'jumlah',
        'diskon',
        'hargaAkhir',
    ];

    public $casts = [
        'transaksiId' => 'integer',
        'produkId' => 'integer',
        'harga' => 'integer',
        'jumlah' => 'integer',
        'diskon' => 'integer',
        'hargaAkhir' => 'integer',
    ];

    public $with = [
        'produk',
    ];

    public function produk()
    {
        return $this->belongsTo(Produk::class, 'produkId');
    }

    public static function rules()
    {
        return [
            'produkId' => 'required|integer',
            'harga' => 'required|integer',
            'jumlah' => 'required|integer',
            'diskon' => 'required|integer',
            'hargaAkhir' => 'required|integer',
        ];
    }
}
