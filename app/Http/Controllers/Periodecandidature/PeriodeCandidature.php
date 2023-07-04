<?php

namespace App\Http\Controllers\Periodecandidature;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Periode_candidature;
use App\Http\Controllers\Controller;

class PeriodeCandidature extends Controller
{
    public function index(){
        return Inertia::render("Periodecandidature/Index",[
            "periode" =>Periode_candidature::all()
        ]);
    }
    /**
     * index
     *
     * @return Response
     */
    public function create() : Response
    {
        return Inertia::render("Periodecandidature/Create");
        
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
            'date_debut' => ['required', 'unique:periode_candidatures'],
            'date_fin' => ['required', 'unique:periode_candidatures'],
        ]);
        if($request->date_debut<=$request->date_fin){
            $periode=Periode_candidature::create(["date_debut"=>$request->date_debut,"date_fin"=>$request->date_fin]);
            return redirect()->route('dashboard.periode-candidature.index')->with('success', "La province a été créée avec succès");
        }
        else{
            return Inertia::render("Periodecandidature/Create");
        }
       
    }
     /**
     * edit
     *
     * @return Response
     */
    public function edit($id)
    {
        $periode=Periode_candidature::find($id);
        if($periode->status==true){
            DB::table('periode_candidatures')->where('id',$id)->update([
                "status"=>false
              ]); 
              return redirect()->route('dashboard.periode-candidature.index')->with('success', "Le statut de la période de candidature a été modifiée avec succès");
        }
        else{
            DB::table('periode_candidatures')->where('id',$id)->update([
                "status"=>true
              ]); 
              return redirect()->route('dashboard.periode-candidature.index')->with('success', "Le statut de la période de candidature a été modifiée avec succès");
        }
    }
    
     /**
     * show
     *
     * @return Response
     */
    public function show($id){
        $periode=Periode_candidature::find($id);
        if($periode->status!=true){
            DB::table('periode_candidatures')->where('id',$id)->delete();
            return redirect()->route('dashboard.periode-candidature.index')->with('success', "Le statut de la période de candidature a été supprimé avec succès");
        }
        else{
            return redirect()->route('dashboard.periode-candidature.index')->with('success', "Impossible de supprimer cette période en raison de son status");
        }
    }
}
