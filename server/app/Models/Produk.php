<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Produk extends Model
{
    use HasFactory;

    public $table = 'produk';

    public $fillable = [
        'nama',
        'harga',
        'satuan',
        'barcode',
        'barcodeImg',
    ];

    public $cast = [
        'harga' => "integer",
    ];

    public $appends = [
        'barcodeUrl',
    ];

    public function getBarcodeUrlAttribute()
    {
        return asset('/assets/barcode/' . $this->barcodeImg);;
    }

    public static function rules()
    {
        return [
            'nama' => 'required',
            'harga' => 'required|integer',
            'satuan' => 'required',
        ];
    }
}
