<?php

namespace App\Http\Controllers\IntutileActe;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Models\Intitule_acte;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Spatie\Activitylog\Models\Activity;

class IntituleActeController extends Controller
{
    public function index(Request $request){
        $ipAddress = $request->ip();
        $activity = new Activity();
        $activity->log_name = Auth::user()->name;
        $activity->description = "Ouverture page intitulé d'acte";
        $activity->subject_type = 'Lecture des données';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\IntituleActe\IntituleActeController';
        $activity->event = 'Lecture des données';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        return Inertia::render("Intituleacte/Index",[
            "actes" => Intitule_acte::all()
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
        $activity->description = "Ouverture page création intitulé d'acte";
        $activity->subject_type = 'Page création';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\IntituleActe\IntituleActeController';
        $activity->event = 'Page création';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        return Inertia::render("Intituleacte/Create");
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
            'title' => ['required', 'regex:/^[^\d]*$/','max:255','unique:intitule_actes'],
        ],
        [
            "title.required"=>"Ce champ est obligatoire*",
            "title.max"=>"La taille est trop longue*",
            "title.regex"=>"Format incorrect*",
            "title.unique"=>"Elément existe déjà dans la base données, impossible de l'ajouter de nouveau*"
        ]
    );
        $acte=Intitule_acte::create(['title'=>$request->title]);
        $ipAddress = $request->ip();
        $activity = new Activity();
        $activity->log_name = Auth::user()->name;
        $activity->description = "Ouverture page création intitulé d'acte";
        $activity->subject_type = 'Création effectuée';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\IntituleActe\IntituleActeController';
        $activity->event = 'Création effectuée';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        return Inertia::render("Intituleacte/Index",[
            "actes" => Intitule_acte::all(),
            "success"=>"L'élément a été créé avec  succès."
        ]);
    }
    /**
     * edit
     *
     * @return Response
     */
    public function edit(Request $request,$id)
    {
        $source=Intitule_acte::find($id);
        $ipAddress = $request->ip();
        $activity = new Activity();
        $activity->log_name = Auth::user()->name;
        $activity->description = "Modification statut intitulé d'acte";
        $activity->subject_type = 'Modification statut';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\IntituleActe\IntituleActeController';
        $activity->event = 'Modification statut';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        if($source->status==true){
            DB::table('intitule_actes')->where('id',$id)->update([
                "status"=>false
              ]); 
                     return Inertia::render("Intituleacte/Index",[
            "actes" => Intitule_acte::all(),
            "success"=>"Le statut a été changéé avec succès."
        ]);
        }
        else{
            DB::table('intitule_actes')->where('id',$id)->update([
                "status"=>true
              ]); 
                     return Inertia::render("Intituleacte/Index",[
            "actes" => Intitule_acte::all(),
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
        $activity->description = "Ouverture page modification intitulé d'acte";
        $activity->subject_type = 'Page modification';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\IntituleActe\IntituleActeController';
        $activity->event = 'Page modification';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
       
        return Inertia::render("Intituleacte/Update",[
            "actes"=>Intitule_acte::find($id)
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
            'title' => ['required', 'regex:/^[^\d]*$/','max:255'],
        ],
        [
            "title.required"=>"Ce champ est obligatoire*",
            "title.max"=>"La taille est trop longue*",
            "title.regex"=>"Format incorrect*",
        ]
    );
    $ipAddress = $request->ip();
        $activity = new Activity();
        $activity->log_name = Auth::user()->name;
        $activity->description = "Ouverture page modification intitulé d'acte";
        $activity->subject_type = 'Page modification effectuée';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\IntituleActe\IntituleActeController';
        $activity->event = 'Page modification effectuée';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
       DB::table("intitule_actes")->where('id',$id)->update(['title'=>$request->title]);
       return Inertia::render("Intituleacte/Index",[
        "actes" => Intitule_acte::all(),
        "success"=>"L'élément a été modifiéé avec succès."
    ]);
    }
}
