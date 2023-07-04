<?php

namespace App\Http\Controllers\Typepartner;

use Inertia\Inertia;
use Inertia\Response;
use App\Models\Type_partner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Spatie\Activitylog\Models\Activity;

class TypepartnerController extends Controller
{
    public function index(Request $request){
        $ipAddress = $request->ip();
        $activity = new Activity();
        $activity->log_name = Auth::user()->name;
        $activity->description = "Ouverture page type partenaire";
        $activity->subject_type = 'Lecture des données';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\Typepartner\TypepartnerController';
        $activity->event = 'Lecture des données';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        return Inertia::render("Typepartner/Index",[
            "partenaires" => Type_partner::all()
        ]);
       
    }
    /**
     * index
     *
     * @return Response
     */
    public function create(Request $request) : Response
    {
        $ipAddress = $request->ip();
        $activity = new Activity();
        $activity->log_name = Auth::user()->name;
        $activity->description = "Ouverture page création type partenaire";
        $activity->subject_type = 'Création type partenaire';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\Typepartner\TypepartnerController';
        $activity->event = 'Création type partenaire';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        return Inertia::render("Typepartner/Create");
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
            'type_partner' => ['required', 'regex:/^[^\d]*$/','max:50','unique:type_partners'],
        ],
        [
            "type_partner.required"=>"Ce champ est obligatoire*",
            "type_partner.max"=>"La taille est trop longue et ne doit pas depasser 50 caractères*",
            "type_partner.regex"=>"Le format est incorrect*",
            "type_partner.unique"=>"Cet élément existe déjà dans la base de données*"
        ]
    );
    $ipAddress = $request->ip();
    $activity = new Activity();
    $activity->log_name = Auth::user()->name;
    $activity->description = "Création type partenaire";
    $activity->subject_type = 'Création type partenaire';
    $activity->subject_id = 1;
    $activity->causer_type = 'App\Controller\Typepartner\TypepartnerController';
    $activity->event = 'Création type partenaire';
    $activity->causer_id = Auth::user()->id ;
    $activity->properties = ['ip' =>  $ipAddress];
    $activity->save();
        $partenaires=Type_partner::create(['type_partner'=>$request->type_partner]);
        return Inertia::render("Typepartner/Index",[
            "partenaires" => Type_partner::all(),
            "success"=>"Le type de partenaire a été créé avec succès"
        ]);
    }
    /**
     * edit
     *
     * @return Response
     */
    public function edit(Request $request,$id)
    {
        $partner=Type_partner::find($id);
        $ipAddress = $request->ip();
        $activity = new Activity();
        $activity->log_name = Auth::user()->name;
        $activity->description = "Modification statut type partenaire";
        $activity->subject_type = 'Modification statut';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\Typepartner\TypepartnerController';
        $activity->event = 'Modification statut';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        if($partner->status==true){
            DB::table('type_partners')->where('id',$id)->update([
                "status"=>false
              ]); 
              return Inertia::render("Typepartner/Index",[
            "partenaires" => Type_partner::all(),
            "success"=>"Le statut a été changéé avec succès."
        ]);
        }
        else{
            DB::table('type_partners')->where('id',$id)->update([
                "status"=>true
              ]); 
              return Inertia::render("Typepartner/Index",[
            "partenaires" => Type_partner::all(),
            "success"=>"Le statut a été changéé avec succès."
        ]);
        }
    }
     /**
     * show
     *
     * @return Response
     */
    public function show(Request $request,$id){
        $ipAddress = $request->ip();
        $activity = new Activity();
        $activity->log_name = Auth::user()->name;
        $activity->description = "Modification type partenaire";
        $activity->subject_type = 'Modification';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\Typepartner\TypepartnerController';
        $activity->event = 'Modification';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
       
        return Inertia::render("Typepartner/Update",[
            "partenaires"=>Type_partner::find($id)
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
            'type_partner' => ['required', 'regex:/^[^\d]*$/','max:50'],
        ],
        [
            "type_partner.required"=>"Ce champ est obligatoire*",
            "type_partner.max"=>"La taille est trop longue et ne doit pas depasser 50 caractères*",
            "type_partner.regex"=>"Le format est incorrect*",
        ]
    );
        DB::table('type_partners')->where('id',$id)->update([
           'type_partner'=>$request->type_partner
        ]);
        $ipAddress = $request->ip();
        $activity = new Activity();
        $activity->log_name = Auth::user()->name;
        $activity->description = "Modification page type partenaire";
        $activity->subject_type = 'Modification effectuée';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\Typepartner\TypepartnerController';
        $activity->event = 'Modification effectuée';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        return Inertia::render("Typepartner/Index",[
            "partenaires" => Type_partner::all(),
            "success"=>"L'élément a été modifiéé avec succès."
        ]);
    }
}
