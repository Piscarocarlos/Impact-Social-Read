<?php

namespace App\Http\Controllers\Section1candidatehome;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\Section_one_home_candidate;

class section1Controller extends Controller
{
    public function index(){
        return Inertia::render("Homecandidate/Section1/Index",[
           "section"=>Section_one_home_candidate::all()
        ]);
    }
      /**
     * index
     *
     * @return Response
     */
    public function create() : Response
    {
        return Inertia::render("Homecandidate/Section1/Create");
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
        ],
        ['*.required'=>"Ce champ est obligatoire*"]
    );
        $section=Section_one_home_candidate::create([
            'msg_no_candidature'=>$request->msg_no_candidature,
            'msg_candidature_cours'=>$request->msg_candidature_cours,
            'msg_candidature_attente'=>$request->msg_candidature_attente,
            'msg_info_candidature'=>$request->msg_info_candidature,
        ]);
        return redirect()->route('dashboard.section-one-candidate.index')->with('success', "Le message a bien été créé avec succes");
    }
     /**
     * edit
     *
     * @param  mixed $request
     * @return void
     */
    public function edit($id){
        $section=Section_one_home_candidate::find($id);
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
        $section=Section_one_home_candidate::find($id);
        if($section->status==true){
            return redirect()->route('dashboard.section-one-candidate.index')->with('success', "Impossible de supprimer ce message en raison de son statut");
        }
        else{
            DB::table('section_one_home_candidates')->where('id',$id)->delete();
            return redirect()->route('dashboard.section-one-candidate.index')->with('success', "Le message a bien été suppriméé avec succès");
        }
    }
     /**
     * show
     *
     * @param  mixed $request
     * @return void
     */
    public function show($id){
        $section=Section_one_home_candidate::find($id);
        return Inertia::render("Homecandidate/Section1/Update",[
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
    DB::table('section_one_home_candidates')->where('id',$id)->update([
            'msg_no_candidature'=>$request->msg_no_candidature,
            'msg_candidature_cours'=>$request->msg_candidature_cours,
            'msg_candidature_attente'=>$request->msg_candidature_attente,
            'msg_info_candidature'=>$request->msg_info_candidature,
        ]);
        return redirect()->route('dashboard.section-one-candidate.index')->with('success', "Le message a bien été modifiéé avec succes");
    }

}
