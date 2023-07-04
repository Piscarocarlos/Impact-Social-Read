<?php

namespace App\Http\Controllers\Schooly;

use Inertia\Inertia;
use App\Models\Ecole;
use Inertia\Response;
use App\Models\Region;
use App\Models\Province;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class SchoolyController extends Controller
{
    public function index(){
        return Inertia::render("Schooly/Index",[
            "ecoles" => Ecole::all()
        ]);
    }
    /**
     * index
     *
     * @return Response
     */
    public function create() : Response
    {
        return Inertia::render("Schooly/Create",[
            "regions"=>Region::all(),
            "provinces"=>Province::all()
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
            "nom_fr"=>['required', 'regex:/^[^\d]*$/','max:50'],
            "nom_ar"=>['required', 'regex:/^[^\d]*$/','max:50'],
            "adresse_fr"=>['required','max:70'],
            "adresse_ar"=>['required','max:70'],
            "telephone"=>['required', 'regex:/^0[1-9]\d{8}$/'],
            "region"=>"required",
            "province"=>"required",
        ]);
        $ecoles=Ecole::create([
            "nom_fr"=>$request->nom_fr,
            "nom_ar"=>$request->nom_ar,
            "adresse_fr"=>$request->adresse_fr,
            "adresse_ar"=>$request->adresse_ar,
            "telephone"=>$request->telephone,
            "region_id"=>$request->region,
            "province_id"=>$request->province
        ]);
        return redirect()->route('dashboard.liste-ecole.index')->with('success', "L'école a été créée avec succès");
    }
      /**
     * edit
     *
     * @return Response
     */
    public function edit($id)
    {
        return Inertia::render("Schooly/Update",[
            "regions"=>Region::all(),
            "provinces"=>Province::all(),
            "ecoles"=>Ecole::find($id)
        ]);  
    }
    /**
     * update
     *
     * @param  mixed $request
     * @return void
     */
    public function update(Request $request)
    {
        $request->validate([
            "nom_fr"=>['required', 'regex:/^[^\d]*$/','max:50'],
            "nom_ar"=>['required', 'regex:/^[^\d]*$/','max:50'],
            "adresse_fr"=>['required','max:70'],
            "adresse_ar"=>['required','max:70'],
            "telephone"=>['required', 'regex:/^0[1-9]\d{8}$/'],
            "region"=>"required",
            "province"=>"required",
        ]);
        DB::table('ecoles')->where("id",$request->id)->update([
            "nom_fr"=>$request->nom_fr,
            "nom_ar"=>$request->nom_ar,
            "adresse_fr"=>$request->adresse_fr,
            "adresse_ar"=>$request->adresse_ar,
            "telephone"=>$request->telephone,
            "region_id"=>$request->region,
            "province_id"=>$request->province
        ]);
        return redirect()->route('dashboard.liste-ecole.index')->with('success', "L'école a été modifiée avec succès");
    }
    /**
     * show
     *
     * @param  mixed $request
     * @return void
     */
    public function show($id)
    {
        DB::table('ecoles')->where('id',$id)->delete();
        return redirect()->route('dashboard.liste-ecole.index')->with('success', "L'école a été supprimée avec succès");
    }
}

