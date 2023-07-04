<?php

namespace App\Http\Controllers\CritereSelected;

use Inertia\Inertia;
use Inertia\Response;
use App\Models\Reporting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\Criter_selected;

class CritereSelectedController extends Controller
{
    public function index(){
        return Inertia::render("Critereselected/Index",[
            "critere" => Criter_selected::all()
        ]);
       
    }
    /**
     * index
     *
     * @return Response
     */
    public function create() : Response
    {
        return Inertia::render("Critereselected/Create");
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
            'critere' => ['required','max:255','unique:criter_selecteds'],
        ],
        [
            "critere.required"=>"Ce champ est obligatoire*",
            "critere.max"=>"La taille est trop longue*",
            "critere.regex"=>"Format incorrect*",
            "critere.unique"=>"Elément existe déjà dans la base données, impossible de l'ajouter de nouveau*"
        ]
    );
        $critere=Criter_selected::create(['critere'=>$request->critere]);
        return redirect()->route('dashboard.critere-selection.index')->with('success', "Elément enregistréé avec succès");
    }
    /**
     * edit
     *
     * @return Response
     */
    public function edit($id)
    {
        $critere=Criter_selected::find($id);
        if($critere->status==true){
            DB::table('criter_selecteds')->where('id',$id)->update([
                "status"=>false
              ]); 
              return redirect()->route('dashboard.critere-selection.index')->with('success', "Le statut a été modifiée avec succès");
        }
        else{
            DB::table('criter_selecteds')->where('id',$id)->update([
                "status"=>true
              ]); 
              return redirect()->route('dashboard.critere-selection.index')->with('success', "Le statut a été modifiée avec succès");
        }
    }
     /**
     * show
     *
     * @return Response
     */
    public function show($id){
       
        return Inertia::render("Critereselected/Update",[
            "selection"=>Criter_selected::find($id)
        ]);
    }
    //SAVE A NEW FORM UPDATE
     /**
     * update
     *
     * @param  mixed $request
     * @return void
     */
    public function update(Request $request,$id){
        $request->validate([
            'critere' => ['required','max:255'],
        ],
        [
            "critere.required"=>"Ce champ est obligatoire*",
            "critere.max"=>"La taille est trop longue*",
        ]
    );
       DB::table("criter_selecteds")->where('id',$id)->update(['critere'=>$request->critere]);
        return redirect()->route('dashboard.critere-selection.index')->with('success', "Elément  modifié avec succès");
    }
}
