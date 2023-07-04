<?php

namespace App\Http\Controllers\Section3candidatehome;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use App\Models\Section_three_home_candidate;

class section3Controller extends Controller
{
    public function index(){
        return Inertia::render("Homecandidate/Section3/Index",[
           "section"=>Section_three_home_candidate::all()
        ]);
    }
     /**
     * index
     *
     * @return Response
     */
    public function create() : Response
    {
        return Inertia::render("Homecandidate/Section3/Create");
    }
     /**
     * store
     *
     * @param  mixed $request
     * @return void
     */
    public function store(Request $request)
    {
        //dd($request->file('image'));
        $request->validate([
            'titre' => ['required',"max:250"],
            'description' => ['required'],
            'image' =>  'required|mimes:png,jpg,jpeg|max:2000'
        ],
        ['*.required'=>"Ce champ est obligatoire*",
        "*.max"=>"La taille est trop longue",
        "image.mimes"=>"Seul les formats png,jpg,jpeg sont autorisés"
        ]
    );
        $image=Storage::disk('public')->put('icon_file',$request->file('image'));
        $section=Section_three_home_candidate::create([
            'titre'=>$request->titre,
            'description'=>$request->description,
            'image'=>$image,
        ]);
        return redirect()->route('dashboard.section-three-candidate.index')->with('success', "Le message a bien été créé avec succes");
    }
    /**
     * edit
     *
     * @param  mixed $request
     * @return void
     */
    public function edit($id){
        $section=Section_three_home_candidate::find($id);
        if($section->status==true){
            DB::table('section_three_home_candidates')->where('id',$id)->update([
                "status"=>false
              ]); 
              return redirect()->route('dashboard.section-three-candidate.index')->with('success', "Le statut de la période de candidature a été modifiée avec succès");
        }
        else{
            DB::table('section_three_home_candidates')->where('id',$id)->update([
                "status"=>true
              ]); 
              return redirect()->route('dashboard.section-three-candidate.index')->with('success', "Le statut de la période de candidature a été modifiée avec succès");
        }
    }
     /**
     * destroy
     *
     * @param  mixed $request
     * @return void
     */
    public function destroy($id){
        $section=Section_three_home_candidate::find($id);
        if($section->status==true){
            return redirect()->route('dashboard.section-three-candidate.index')->with('success', "Impossible de supprimer ce message en raison de son statut");
        }
        else{
            DB::table('section_three_home_candidates')->where('id',$id)->delete();
            return redirect()->route('dashboard.section-three-candidate.index')->with('success', "Le message a bien été suppriméé avec succès");
        }
    }
    /**
     * show
     *
     * @param  mixed $request
     * @return void
     */
    public function show($id){
        $section=Section_three_home_candidate::find($id);
        return Inertia::render("Homecandidate/Section3/Update",[
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
        //dd($request->file('image'));
        $request->validate([
            'titre' => ['required',"max:250"],
            'description' => ['required'],
            'image' =>  'required|mimes:png,jpg,jpeg|max:2000'
        ],
        ['*.required'=>"Ce champ est obligatoire*",
        "*.max"=>"La taille est trop longue",
        "image.mimes"=>"Seul les formats png,jpg,jpeg sont autorisés"
        ]
    );
    $image=Storage::disk('public')->put('icon_file',$request->file('image'));
    DB::table('section_three_home_candidates')->where('id',$id)->update([
            'titre'=>$request->titre,
            'description'=>$request->description,
            'image'=>$image,
        ]);
        return redirect()->route('dashboard.section-three-candidate.index')->with('success', "Le message a bien été créé avec succes");
    }
}

