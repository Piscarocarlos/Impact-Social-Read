<?php

namespace App\Http\Controllers\Section2candidatehome;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\Section_two_home_candidate;

class section2Controller extends Controller
{
    public function index(){
        return Inertia::render("Homecandidate/Section2/Index",[
           "section"=>Section_two_home_candidate::all()
        ]);
    }
     /**
     * index
     *
     * @return Response
     */
    public function create() : Response
    {
        return Inertia::render("Homecandidate/Section2/Create");
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
            'lin_video' => ['required'],
           
        ],
        ['*.required'=>"Ce champ est obligatoire*",
        "*.max"=>"La taille est trop longue"]
    );
        $section=Section_two_home_candidate::create([
            'titre'=>$request->titre,
            'description'=>$request->description,
            'lin_video'=>$request->lin_video,
            
        ]);
        return redirect()->route('dashboard.section-two-candidate.index')->with('success', "Le message a bien été créé avec succes");
    }
    /**
     * edit
     *
     * @param  mixed $request
     * @return void
     */
    public function edit($id){
        $section=Section_two_home_candidate::find($id);
        if($section->status==true){
            DB::table('section_two_home_candidates')->where('id',$id)->update([
                "status"=>false
              ]); 
              return redirect()->route('dashboard.section-two-candidate.index')->with('success', "Le statut de la période de candidature a été modifiée avec succès");
        }
        else{
            DB::table('section_two_home_candidates')->where('id',$id)->update([
                "status"=>true
              ]); 
            DB::table('section_two_home_candidates')->where('id',"!=",$id)->update([
                "status"=>false
              ]); 
              return redirect()->route('dashboard.section-two-candidate.index')->with('success', "Le statut de la période de candidature a été modifiée avec succès");
        }
    }
     /**
     * destroy
     *
     * @param  mixed $request
     * @return void
     */
    public function destroy($id){
        $section=Section_two_home_candidate::find($id);
        if($section->status==true){
            return redirect()->route('dashboard.section-two-candidate.index')->with('success', "Impossible de supprimer ce message en raison de son statut");
        }
        else{
            DB::table('section_two_home_candidates')->where('id',$id)->delete();
            return redirect()->route('dashboard.section-two-candidate.index')->with('success', "Le message a bien été suppriméé avec succès");
        }
    }
    /**
     * show
     *
     * @param  mixed $request
     * @return void
     */
    public function show($id){
        $section=Section_two_home_candidate::find($id);
        return Inertia::render("Homecandidate/Section2/Update",[
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
            'lin_video' => ['required'],
        ],
        ['*.required'=>"Ce champ est obligatoire*",
        "*.max"=>"La taille est trop longue"]
    );
    DB::table('section_two_home_candidates')->where('id',$id)->update([
            'titre'=>$request->titre,
            'description'=>$request->description,
            'lin_video'=>$request->lin_video,
            
        ]);
        return redirect()->route('dashboard.section-two-candidate.index')->with('success', "Le message a bien été créé avec succes");
    }
}
