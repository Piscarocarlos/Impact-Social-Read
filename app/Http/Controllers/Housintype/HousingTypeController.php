<?php

namespace App\Http\Controllers\Housintype;

use Inertia\Inertia;
use Inertia\Response;
use App\Models\Logement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class HousingTypeController extends Controller
{
    public function index(){
        return Inertia::render("Housingtype/Index",[
            "logement" => Logement::all()
        ]);
    }
    /**
     * index
     *
     * @return Response
     */
    public function create() : Response
    {
        return Inertia::render("Housingtype/Create");
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
            'name_logement' => ['required','regex:/^[^\d]*$/','max:50','unique:logements']
        ]);
        $logement=Logement::create(['name_logement'=>$request->name_logement]);
        return redirect()->route('dashboard.type-logement.index')->with('success', "La province a été créée avec succès");
    }
      /**
     * edit
     *
     * @return Response
     */
    public function edit($id)
    {
        $logement=Logement::find($id);
        if($logement->status==true){
            DB::table('logements')->where('id',$id)->update([
                "status"=>false
              ]); 
              return redirect()->route('dashboard.type-logement.index')->with('success', "Le statut du logement a été modifiée avec succès");
        }
        else{
            DB::table('logements')->where('id',$id)->update([
                "status"=>true
              ]); 
              return redirect()->route('dashboard.type-logement.index')->with('success', "Le statut du logement a été modifiée avec succès");
        }
    }
}
