<?php

namespace App\Http\Controllers\Section1candidatehomear;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\Section_one_home_candidate;
use App\Models\Section_one_home_candidates_ar;

class Section1ControllerAr extends Controller
{
    public function index(){
        return Inertia::render("Homecandidate/Section1ar/Index",[
           "section"=>Section_one_home_candidates_ar::all(),
          
        ]);
    }
      /**
     * index
     *
     * @return Response
     */
    public function create() : Response
    {
        return Inertia::render("Homecandidate/Section1ar/Create",[
            "sectionfr"=>Section_one_home_candidate::all()
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
            'msg_no_candidature' => ['required'],
            'msg_candidature_cours' => ['required'],
            'msg_candidature_attente' => ['required'],
            'msg_info_candidature' => ['required'],
            'section_one_id' => ['required',"unique:section_one_home_candidates_ars"],
        ],
        ['*.required'=>"Ce champ est obligatoire*",
        "*.unique"=>"Cette ligne a été déjà pris par un autre élément*"
        ]
    );
        $section=Section_one_home_candidates_ar::create([
            'msg_no_candidature'=>$request->msg_no_candidature,
            'msg_candidature_cours'=>$request->msg_candidature_cours,
            'msg_candidature_attente'=>$request->msg_candidature_attente,
            'msg_info_candidature'=>$request->msg_info_candidature,
            "section_one_id"=>$request->section_one_id
        ]);
        return redirect()->route('dashboard.section-one-candidate-ar.index')->with('success', "Le message a bien été créé avec succes");
    }
     /**
     * edit
     *
     * @param  mixed $request
     * @return void
     */
    public function edit($id){
        $section=Section_one_home_candidates_ar::find($id);
        if($section->status==true){
            DB::table('section_one_home_candidates')->where('id',$id)->update([
                "status"=>false
              ]); 
              return redirect()->route('dashboard.section-one-candidate.index')->with('success', "Le statut de la période de candidature a été modifiée avec succès");
        }
        else{
            DB::table('section_one_home_candidates')->where('id',$id)->update([
                "status"=>true
              ]); 
            DB::table('section_one_home_candidates')->where('id',"!=",$id)->update([
                "status"=>false
              ]); 
              return redirect()->route('dashboard.section-one-candidate.index')->with('success', "Le statut de la période de candidature a été modifiée avec succès");
        }
    }
     /**
     * destroy
     *
     * @param  mixed $request
     * @return void
     */
    public function destroy($id){
        $section=Section_one_home_candidates_ar::find($id);
            DB::table('section_one_home_candidates_ars')->where('id',$id)->delete();
            return redirect()->route('dashboard.section-one-candidate-ar.index')->with('success', "Le message a bien été suppriméé avec succès");
    }
     /**
     * show
     *
     * @param  mixed $request
     * @return void
     */
    public function show($id){
        $section=Section_one_home_candidates_ar::find($id);
        return Inertia::render("Homecandidate/Section1ar/Update",[
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
            'msg_no_candidature' => ['required'],
            'msg_candidature_cours' => ['required'],
            'msg_candidature_attente' => ['required'],
            'msg_info_candidature' => ['required'],
        ],
        ['*.required'=>"Ce champ est obligatoire*"]
    );
    DB::table('section_one_home_candidates_ars')->where('id',$id)->update([
            'msg_no_candidature'=>$request->msg_no_candidature,
            'msg_candidature_cours'=>$request->msg_candidature_cours,
            'msg_candidature_attente'=>$request->msg_candidature_attente,
            'msg_info_candidature'=>$request->msg_info_candidature,
        ]);
        return redirect()->route('dashboard.section-one-candidate-ar.index')->with('success', "Le message a bien été modifiéé avec succes");
    }
}
