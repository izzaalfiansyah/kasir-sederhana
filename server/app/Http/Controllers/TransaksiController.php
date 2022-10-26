<?php

namespace App\Http\Controllers;

use App\Models\Transaksi as Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TransaksiController extends Controller
{
    public function index(Request $req)
    {
        $builder = new Model();

        if ($search = $req->q) {
            $builder = $builder->where(function ($query) use ($search) {
                return $query->whereDate('created_at', 'like', "%$search%")
                    ->orWhere('customer', 'like', "%$search%");
            });
        }

        if ($userId = $req->userId) {
            $builder = $builder->where('userId', $userId);
        }

        $totalCount = $builder->count();

        if ($limit = $req->limit) {
            $page = $req->page ?: 1;
            $builder = $builder->limit($limit)->skip(($page - 1) * $limit);
        }

        $data = $builder->get();

        return response($data)
            ->header('X-Total-Count', $totalCount)
            ->header('Access-Control-Expose-Headers', '*');
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
}
