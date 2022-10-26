<?php

namespace App\Http\Controllers;

use App\Models\TransaksiDetail as Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TransaksiDetailController extends Controller
{
    public function index($transaksiId, Request $req)
    {
        $builder = new Model();

        $builder = $builder->where('transaksiId', $transaksiId);

        $data = $builder->get();

        return response($data);
    }

    public function show($transaksiId, $id)
    {
        $item = Model::find($id);

        return response($item);
    }

    public function store(Request $req, $transaksiId)
    {
        $schema = Validator::make($req->all(), Model::rules());

        if ($schema->fails()) {
            return response($schema->errors()->all(), 400);
        }

        $data = $schema->validated();
        $data['transaksiId'] = $transaksiId;

        $item = Model::create($data);

        return response($item);
    }

    public function update(Request $req, $transaksiId, $id)
    {
        $schema = Validator::make($req->all(), Model::rules($id));

        if ($schema->fails()) {
            return response($schema->errors()->all(), 400);
        }

        $data = $schema->validated();

        $item = Model::find($id);
        if ($item) $item->update($data);

        return response($item);
    }

    public function destroy($transaksiId, $id)
    {
        $item = Model::find($id);
        if ($item) $item->delete();

        return response($item);
    }
}
