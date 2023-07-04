<?php

namespace App\Http\Controllers\Cities;

use App\Models\City;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Province;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class CityController extends Controller
{
    public function index(){
        return Inertia::render("City/Index",[
            "cities"=>City::all()
            /*
            "cities" =>DB::table('cities')
        ->join('provinces', 'cities.province_id', '=', 'provinces.id')
        ->get()*/
        ]);
    }
     /**
     * index
     *
     * @return Response
     */
    public function create() : Response
    {
        return Inertia::render("City/Create",[
            "provinces" => Province::all()
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
            'ville' => ['required', 'regex:/^[^\d]*$/','max:50'],
            'province' => 'required',
        ]);
       $cities=City::create(["name_city"=>$request->ville,"province_id"=>$request->province]);
       return redirect()->route('dashboard.villes.index')->with('success', "La ville a été créée avec succès");
    }

      /**
     * edit
     *
     * @return Response
     */
    public function edit($id)
    {
        //dd($id);
        $villes=City::find($id);
        if($villes->status==true){
            DB::table('cities')->where('id',$id)->update([
                "status_cities"=>false
              ]); 
              return redirect()->route('dashboard.villes.index')->with('success', "Le statut de la ville a été modifiée avec succès");
        }
        else{
            DB::table('cities')->where('id',$id)->update([
                "status_cities"=>true
              ]); 
              return redirect()->route('dashboard.villes.index')->with('success', "Le statut de la ville a été modifiée avec succès");
        }
    }
}
