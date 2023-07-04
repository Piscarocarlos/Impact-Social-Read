<?php

namespace App\Http\Controllers\Devise;

use Inertia\Inertia;
use Inertia\Response;
use App\Models\Devise;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Spatie\Activitylog\Models\Activity;

class DeviseController extends Controller
{
    public function index(Request $request){
       
        return Inertia::render("Devise/Index",[
            "devises" => Devise::all()
        ]);
       
    }
    /**
     * index
     *
     * @return Response
     */
    public function create() : Response
    {
        return Inertia::render("Devise/Create");
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
            'type_devise' => ['required', 'regex:/^[^\d]*$/','max:50','unique:devises'],
        ],
        [
            "type_devise.required"=>"Ce champ est obligatoire*",
            "type_devise.max"=>"La taille est trop longue et ne doit pas depasser 50 caractères*",
            "type_devise.regex"=>"Le format est incorrect*",
            "type_devise.unique"=>"Cette devise existe déjà dans la base de données*"
        ]
    );
        $duree=Devise::create(['type_devise'=>$request->type_devise]);
        return Inertia::render("Devise/Index",[
            "devises" => Devise::all(),
            "success"=>"La devise a été créée avec succès."
        ]);
    }
    /**
     * edit
     *
     * @return Response
     */
    public function edit($id)
    {
        $devise=Devise::find($id);
        if($devise->status==true){
            DB::table('devises')->where('id',$id)->update([
                "status"=>false
              ]); 
                     return Inertia::render("Devise/Index",[
            "devises" => Devise::all(),
            "success"=>"Le statut a été modifiéé avec succès."
        ]);
        }
        else{
            DB::table('devises')->where('id',$id)->update([
                "status"=>true
              ]); 
                     return Inertia::render("Devise/Index",[
            "devises" => Devise::all(),
            "success"=>"Le statut a été modifiéé avec succès."
        ]);
        }
    }
     /**
     * show
     *
     * @return Response
     */
    public function show($id){
       
        return Inertia::render("Devise/Update",[
            "devises"=>Devise::find($id)
        ]);
    }
    //SAVE A NEW FORM UPDATE
     /**
     * update
     *
     * @param  mixed $request
     * @return void
     */
    public function update(Request $request){
        $id=$request->id;
        $request->validate([
            'type_devise' => ['required', 'regex:/^[^\d]*$/','max:50'],
        ],
        [
            "type_devise.required"=>"Ce champ est obligatoire*",
            "type_devise.max"=>"La taille est trop longue et ne doit pas depasser 50 caractères*",
            "type_devise.regex"=>"Le format est incorrect*",
        ]
    );
        DB::table('devises')->where('id',$id)->update([
           'type_devise'=>$request->type_devise
        ]);
        return Inertia::render("Devise/Index",[
            "devises" => Devise::all(),
            "success"=>"L'élément a été modifiéé avec succès."
        ]);
    }
}
