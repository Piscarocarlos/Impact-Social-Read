<?php

namespace App\Http\Controllers\Section2candidatehomear;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\Section_two_home_candidate;
use App\Models\Section_two_home_candidate_ar;


class Section2ControllerAr extends Controller
{
    public function index(){
        return Inertia::render("Homecandidate/Section2ar/Index",[
           "section"=>Section_two_home_candidate_ar::all()
        ]);
    }
     /**
     * index
     *
     * @return Response
     */
    public function create() : Response
    {
        return Inertia::render("Homecandidate/Section2ar/Create",[
            "section"=>Section_two_home_candidate::all()
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
            'titre' => ['required',"max:250"],
            'description' => ['required'],
            "section_two_id"=>['required',"unique:section_two_home_candidate_ars"]
           
        ],
        ['*.required'=>"Ce champ est obligatoire*",
        "*.max"=>"La taille est trop longue",
        "*.unique"=>"Cet élément a été déjà pris, impossible d'associer une traduction*"
        ]
    );
        $section=Section_two_home_candidate_ar::create([
            'titre'=>$request->titre,
            'description'=>$request->description,
            'section_two_id'=>$request->section_two_id,
            
        ]);
        return redirect()->route('dashboard.section-two-candidate-ar.index')->with('success', "Le message a bien été créé avec succes");
    }
   
     /**
     * destroy
     *
     * @param  mixed $request
     * @return void
     */
    public function destroy($id){
            DB::table('section_two_home_candidate_ars')->where('id',$id)->delete();
            return redirect()->route('dashboard.section-two-candidate-ar.index')->with('success', "Le message a bien été suppriméé avec succès");
    }
    /**
     * show
     *
     * @param  mixed $request
     * @return void
     */
    public function show($id){
        $section=Section_two_home_candidate_ar::find($id);
        return Inertia::render("Homecandidate/Section2ar/Update",[
            'section'=>$section
        ]);
    }
    /**
     * update
     *
     * @param  mixed $request
     * @return void
     */
    public function update(Request $request,$id){
        $request->validate([
            'titre' => ['required',"max:250"],
            'description' => ['required'],
        ],
        ['*.required'=>"Ce champ est obligatoire*",
        "*.max"=>"La taille est trop longue"]
    );
    DB::table('section_two_home_candidate_ars')->where('id',$id)->update([
            'titre'=>$request->titre,
            'description'=>$request->description,
            
        ]);
        return redirect()->route('dashboard.section-two-candidate-ar.index')->with('success', "Le message a bien été créé avec succes");
    }
}
