<?php

namespace App\Http\Controllers\Socialsituation;
use Inertia\Inertia;

use Inertia\Response;
use Illuminate\Http\Request;
use App\Models\Situation__social;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class SocialsituationController extends Controller
{
    public function index(){
        return Inertia::render("Socialsituation/Index",[
            "situations" =>Situation__social::all()
        ]);
    }
    /**
     * index
     *
     * @return Response
     */
    public function create() : Response
    {
        return Inertia::render("Socialsituation/Create");
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
            'name_situation' => ['required', 'regex:/^[^\d]*$/','max:50','unique:situation__socials'],
        ]);
        $situation=Situation__social::create(["name_situation"=>$request->name_situation]);
        return redirect()->route('dashboard.situation-sociale.index')->with('success', "La province a été créée avec succès");
    }
     /**
     * edit
     *
     * @return Response
     */
    public function edit($id)
    {
        $situation=Situation__social::find($id);
        if($situation->status==true){
            DB::table('situation__socials')->where('id',$id)->update([
                "status"=>false
              ]); 
              return redirect()->route('dashboard.situation-sociale.index')->with('success', "Le statut de la situation sociale a été modifiée avec succès");
        }
        else{
            DB::table('situation__socials')->where('id',$id)->update([
                "status"=>true
              ]); 
              return redirect()->route('dashboard.situation-sociale.index')->with('success', "Le statut de la situation sociale a été modifiée avec succès");
        }
    }
}
