<?php

namespace App\Http\Controllers;

use App\Models\Produk as Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProdukController extends Controller
{
    private function generateBarcode($code)
    {
        @mkdir(public_path('/assets'));
        @mkdir(public_path('/assets/barcode'));

        $generator = new \Picqer\Barcode\BarcodeGeneratorSVG();
        $content =  $generator->getBarcode($code, $generator::TYPE_CODE_128);
        $filename = $code . '.svg';
        file_put_contents(public_path('/assets/barcode/' . $filename), $content);

        return $filename;
    }

    public function index(Request $req)
    {
        $builder = new Model();

        if ($search = $req->q) {
            $builder = $builder->where(function ($query) use ($search) {
                return $query->where('nama', 'like', "%$search%")
                    ->orWhere('harga', 'like', "%$search%")
                    ->orWhere('satuan', 'like', "%$search%");
            });
        }

        $totalCount = $builder->count();

        if ($limit = $req->limit) {
            $page = $req->page ?: 1;
            $builder = $builder->limit($limit)->skip(($page - 1) * $limit);
        }

        $data = $builder->orderBy('nama')->get();

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
        $code = $data['barcode'] = date('ymdHis');
        $data['barcodeImg'] = $this->generateBarcode($code);

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
        @unlink(public_path('/assets/barcode/' . $item->barcodeImg));
        if ($item) $item->delete();

        return response($item);
    }

    public function scan(Request $req)
    {
        if (!$req->barcode) {
            return response(['barcode tidak diketahui']);
        }

        $item = Model::where('barcode', $req->barcode)->first();
        return $item;
    }
}
