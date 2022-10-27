<?php

namespace App\Http\Controllers;

use App\Models\User as Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function index()
    {
        $builder = new Model();
        $data = $builder->orderBy('nama')->get();

        return response($data);
    }

    public function show($id)
    {
        $item = Model::find($id);

        return response($item);
    }

    public function store(Request $req)
    {
        $schema = Validator::make($req->all(), Model::rules());

        if ($schema->fails()) {
            return response($schema->errors()->all(), 400);
        }

        $data = $schema->validated();
        $data['password'] = Hash::make($req->password);

        $item = Model::create($data);

        return response($item);
    }

    public function update(Request $req, $id)
    {
        $schema = Validator::make($req->all(), Model::rules($id));

        if ($schema->fails()) {
            return response($schema->errors()->all(), 400);
        }

        $data = $schema->validated();
        if ($req->password) {
            $data['password'] = Hash::make($req->password);
        } else {
            unset($data['password']);
        }

        $item = Model::find($id);
        if ($item) $item->update($data);

        return response($item);
    }

    public function destroy($id)
    {
        $item = Model::find($id);
        if ($item) $item->delete();

        return response($item);
    }

    public function login(Request $req)
    {
        $schema = Validator::make($req->all(), [
            'username' => 'required',
            'password' => 'required',
        ]);

        if ($schema->fails()) {
            return response($schema->errors()->all(), 400);
        }

        $dataCount = Model::where('username', $req->username)->count();

        if ($dataCount > 0) {
            if (Auth::attempt($req->only('username', 'password'))) {
                return response(Auth::user());
            }
            return response(['password salah'], 400);
        } else {
            return response(['username tidak ditemukan'], 404);
        }
    }

    public function logout()
    {
        Auth::logout();
        request()->session()->flush();

        return response(['berhasil logout']);
    }

    public function auth()
    {
        return response(Auth::user());
    }
}
