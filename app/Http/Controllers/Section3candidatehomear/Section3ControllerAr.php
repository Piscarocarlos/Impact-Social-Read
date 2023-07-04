<?php

namespace App\Http\Controllers\Section3candidatehomear;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\Section_three_home_candidate;
use App\Models\Section_three_home_candidate_ar;

class Section3ControllerAr extends Controller
{
    public function index(){
        return Inertia::render("Homecandidate/Section3ar/Index",[
           "section"=>Section_three_home_candidate_ar::all()
        ]);
    }
     /**
     * index
     *
     * @return Response
     */
    public function create() : Response
    {
        return Inertia::render("Homecandidate/Section3ar/Create",
        [
            "section"=>Section_three_home_candidate::all(),
        ]
    );
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
            'section_three_id' => ['required',"unique:section_three_home_candidate_ars"],
        ],
        ['*.required'=>"Ce champ est obligatoire*",
        "*.unique"=>"Cet élément a été déjà pris, impossible de lui associer une nouvelle traduction*"
        ]
    );
        $section=Section_three_home_candidate_ar::create([
            'titre'=>$request->titre,
            'description'=>$request->description,
            'section_three_id'=>$request->section_three_id
        ]);
        return redirect()->route('dashboard.section-three-candidate-ar.index')->with('success', "Le message a bien été créé avec succes");
    }
 
     /**
     * destroy
     *
     * @param  mixed $request
     * @return void
     */
    public function destroy($id){
       
            DB::table('section_three_home_candidate_ars')->where('id',$id)->delete();
            return redirect()->route('dashboard.section-three-candidate-ar.index')->with('success', "Le message a bien été suppriméé avec succès");
       
    }
    /**
     * show
     *
     * @param  mixed $request
     * @return void
     */
    public function show($id){
        $section=Section_three_home_candidate_ar::find($id);
        return Inertia::render("Homecandidate/Section3ar/Update",[
            'section'=>$section
        ]);
    }
    /**
     * update
     *
     * @param  mixed $request
     * @return void
     */
    public function updatefile(Request $request,$id){
        $request->validate([
            'titre' => ['required',"max:250"],
            'description' => ['required'],
        ],
        ['*.required'=>"Ce champ est obligatoire*",
        ]
    );
  
    DB::table('section_three_home_candidate_ars')->where('id',$id)->update([
            'titre'=>$request->titre,
            'description'=>$request->description,
        ]);
        return redirect()->route('dashboard.section-three-candidate-ar.index')->with('success', "Le message a bien été créé avec succes");
    }
}
