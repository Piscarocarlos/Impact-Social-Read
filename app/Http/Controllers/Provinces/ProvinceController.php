<?php

namespace App\Http\Controllers\Provinces;

use Inertia\Inertia;
use Inertia\Response;
use App\Models\Region;
use App\Models\Province;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class ProvinceController extends Controller
{
    public function index(){
       return Inertia::render("Province/Index",[
        "provinces" =>DB::table('provinces')
        ->join('regions', 'provinces.region_id', '=', 'regions.id')
        ->get()
        ]);
    }
   
     /**
     * index
     *
     * @return Response
     */
    public function create() : Response
    {
        return Inertia::render("Province/Create",[
            "regions" => Region::all()
        ]);
    }
     /**
     * store
     *
     * @param  mixed $request
     * @return void
     */
    public function store(Request $request)
    {
        $request->validate([
            'province' => ['required', 'regex:/^[^\d]*$/','max:50'],
            'region' => 'required',
        ]);
       $provinces=Province::create(['name_province'=>$request->province,'region_id'=>$request->region]);
       return redirect()->route('dashboard.provinces.index')->with('success', "La province a été créée avec succès");
    }

      /**
     * edit
     *
     * @return Response
     */
    public function edit($id)
    {
        $provinces=Province::find($id);
        if($provinces->status==true){
            DB::table('provinces')->where('id',$id)->update([
                "status_province"=>false
              ]); 
              return redirect()->route('dashboard.provinces.index')->with('success', "Le statut de la province a été modifiée avec succès");
        }
        else{
            DB::table('provinces')->where('id',$id)->update([
                "status_province"=>true
              ]); 
              return redirect()->route('dashboard.provinces.index')->with('success', "Le statut de la province a été modifiée avec succès");
        }
    }
}
