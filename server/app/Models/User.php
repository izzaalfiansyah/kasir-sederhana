<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class User extends Authenticatable
{
    public $table = 'user';

    public $fillable = [
        'username',
        'password',
        'nama',
        'alamat',
        'telepon',
        'role',
    ];

    public $casts = [
        'role' => 'integer',
    ];

    public $appends = [
        'roleDetail',
    ];

    public function getRoleDetailAttribute()
    {
        return [1 => 'superadmin', 2 => 'kasir'][$this->role];
    }

    public static function rules($id = null)
    {
        return [
            'username' => ['required', $id ? Rule::unique('user')->ignore($id) : Rule::unique('user'), 'min:5'],
            'password' => ['required', $id ? 'nullable' : 'required', Password::min(8)],
            'nama' => 'required',
            'alamat' => 'required',
            'telepon' => 'required',
            'role' => 'required|in:1,2',
        ];
    }
}
