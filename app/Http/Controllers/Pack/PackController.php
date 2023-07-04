<?php

namespace App\Http\Controllers\Pack;

use App\Models\Pack;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Spatie\Activitylog\Models\Activity;

class PackController extends Controller
{
    public function index(Request $request){
        $ipAddress = $request->ip();
        $activity = new Activity();
        $activity->log_name = Auth::user()->name;
        $activity->description = "Ouverture page home pack";
        $activity->subject_type = 'Lecture des données';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\Pack\PackController';
        $activity->event = 'Lecture des données';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        return Inertia::render("Pack/Index",[
            "pack" => Pack::all(),
            
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
        $activity->description = "Ouverture page création pack";
        $activity->subject_type = 'Création pack';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\Pack\PackController';
        $activity->event = 'Création pack';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        return Inertia::render("Pack/Create",[
         "services"=>Service::all()
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
            "name_pack"=>['required', 'regex:/^[a-zA-Z0-9]+$/','max:100','unique:packs'],
            "service_pack"=>['required'],
            "price"=>['required','regex:/^\d+(?:\.\d{1,2})?$/'],
        ],
        [
            "*.required"=>"Ce champ est obligatoire*",
            "*.regex"=>"Format incorrect*",
            "*.max"=>"Ce champ est trop long*",
            "*.unique"=>"Cet élément existe déjà dans la base de données*"
        ]
        );
        $pack=Pack::create([
            "name_pack"=>$request->name_pack,
            "service_pack"=>json_encode($request->service_pack),
            "price"=>$request->price
        ]);
        $ipAddress = $request->ip();
        $activity = new Activity();
        $activity->log_name = Auth::user()->name;
        $activity->description = "Ouverture page création pack";
        $activity->subject_type = 'Création de service effectuée';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\Pack\PackController';
        $activity->event = 'Création de service effectuée';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        return Inertia::render("Pack/Index",[
            "pack" => Pack::all(),
            "success"=>"Le pack a été créé avec succès."
        ]);
    }
     /**
     * edit
     *
     * @return Response
     */
    public function edit(Request $request,$id)
    {
        $pack=Pack::find($id);
        $ipAddress = $request->ip();
        $activity = new Activity();
        $activity->log_name = Auth::user()->name;
        $activity->description = "Modification statut pack";
        $activity->subject_type = 'Modification effectuée';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\Pack\PackController';
        $activity->event = 'Modification effectuée';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        if($pack->status==true){
            DB::table('packs')->where('id',$id)->update([
                "status"=>false
              ]); 
               return Inertia::render("Pack/Index",[
            "pack" => Pack::all(),
            "success"=>"Le statut a été modifiéé avec succès."
        ]);
        }
        else{
            DB::table('packs')->where('id',$id)->update([
                "status"=>true
              ]); 
               return Inertia::render("Pack/Index",[
            "pack" => Pack::all(),
            "success"=>"Le statut a été modifiéé avec succès."
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
        $activity->description = "Ouverture page modification pack";
        $activity->subject_type = 'Modification';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\Pack\PackController';
        $activity->event = 'Modification';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
       
        return Inertia::render("Pack/Update",[
         "pack"=>Pack::find($id),
         "services"=>Service::all()
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
            "name_pack"=>['required', 'regex:/^[a-zA-Z0-9]+$/','max:100'],
            "service_pack"=>['required'],
            "price"=>['required','regex:/^\d+(?:\.\d{1,2})?$/'],
        ],
        [
            "*.required"=>"Ce champ est obligatoire*",
            "*.regex"=>"Format incorrect*",
            "*.max"=>"Ce champ est trop long*",
        ]
        );
        DB::table('packs')->where('id',$id)->update([
            "name_pack"=>$request->name_pack,
            "service_pack"=>json_encode($request->service_pack),
            "price"=>$request->price
        ]);
        $ipAddress = $request->ip();
        $activity = new Activity();
        $activity->log_name = Auth::user()->name;
        $activity->description = "Ouverture page modification pack";
        $activity->subject_type = 'Modification effectuée';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\Pack\PackController';
        $activity->event = 'Modification effectuée';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        return Inertia::render("Pack/Index",[
            "pack" => Pack::all(),
            "success"=>"L'élément a été modifiéé avec succès."
        ]);
        
    }
}
