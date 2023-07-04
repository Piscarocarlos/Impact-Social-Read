<?php

namespace App\Http\Controllers\Service;

use Inertia\Inertia;
use Inertia\Response;
use App\Models\Devise;
use App\Models\Service;
use Illuminate\Http\Request;
use App\Models\Type_beneficiare;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\Type_operator_service;
use Spatie\Activitylog\Models\Activity;

class ServiceController extends Controller
{
    public function index(Request $request){
        $ipAddress = $request->ip();
        $activity = new Activity();
        $activity->log_name = Auth::user()->name;
        $activity->description = "Ouverture page home service";
        $activity->subject_type = 'Lecture des données';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\Service\ServiceController';
        $activity->event = 'Lecture des données';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        return Inertia::render("Service/Index",[
            "services" => Service::all(),
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
        $activity->description = "Ouverture page création service";
        $activity->subject_type = 'Création service';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\Service\ServiceController';
        $activity->event = 'Création service';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        return Inertia::render("Service/Create",[
         "operator"=>Type_operator_service::all(),
         "devise"=>Devise::all(),
         "beneficiare"=>Type_beneficiare::all()
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
        //dd($request->cible);
        $request->validate([
            "name_service"=>['required', 'regex:/^[^\d]*$/','max:50'],
            "description"=>['required','max:250'],
            "cible"=>['required'],
            "cout_unitaire"=>['required','regex:/^\d*(\.\d{2})?$/'],
            "devise"=>['required'],
            "operator_service"=>['required'],
        ],
        [
            '*.required'=>"Ce champ est obligatoire*",
            "*.regex"=>"Format incorrect*",
            "*.max"=>"La taille de ce champ est trop long*"
        ]
    );
      
        $contact_partner=Service::create([
            "name_service"=>$request->name_service,
            "description"=>$request->description,
            "cible"=>json_encode($request->cible),
            "cout_unitaire"=>$request->cout_unitaire,
            "devise"=>$request->devise,
            "operator_service"=>$request->operator_service
        ]);
        $ipAddress = $request->ip();
        $activity = new Activity();
        $activity->log_name = Auth::user()->name;
        $activity->description = "Ouverture pagecréation service";
        $activity->subject_type = 'Création service effectuée avec succès';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\Service\ServiceController';
        $activity->event = 'Création service effectuée avec succès';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        return Inertia::render("Service/Index",[
            "services" => Service::all(),
            "success"=>"Le service a bien été créé avec succès."
        ]);
    }
     /**
     * edit
     *
     * @return Response
     */
    public function edit(Request $request,$id)
    {
        $devise=Service::find($id);
        $ipAddress = $request->ip();
        $activity = new Activity();
        $activity->log_name = Auth::user()->name;
        $activity->description = "Modification statut service";
        $activity->subject_type = 'Modification statut service';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\Service\ServiceController';
        $activity->event = 'Modification statut service';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        if($devise->status==true){
            DB::table('services')->where('id',$id)->update([
                "status"=>false
              ]); 
                   return Inertia::render("Service/Index",[
            "services" => Service::all(),
            "success"=>"Le statut a été changéé avec succès."
        ]);
        }
        else{
            DB::table('services')->where('id',$id)->update([
                "status"=>true
              ]); 
                   return Inertia::render("Service/Index",[
            "services" => Service::all(),
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
        $activity->description = "Ouverture page modification service";
        $activity->subject_type = 'Page modification service';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\Service\ServiceController';
        $activity->event = 'Page modification service';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
       
        return Inertia::render("Service/Update",[
            "service"=>Service::find($id),
            "operator"=>Type_operator_service::all(),
            "devise"=>Devise::all(),
            "beneficiare"=>Type_beneficiare::all()
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
            "name_service"=>['required', 'regex:/^[^\d]*$/','max:50'],
            "description"=>['required','max:250'],
            "cible"=>['required'],
            "cout_unitaire"=>['required','regex:/^\d*(\.\d{2})?$/'],
            "devise"=>['required'],
            "operator_service"=>['required'],
        ],
        [
            '*.required'=>"Ce champ est obligatoire*",
            "*.regex"=>"Format incorrect*",
            "*.max"=>"La taille de ce champ est trop long*"
        ]
    );
      
        DB::table('services')->where('id',$id)->update([
            "name_service"=>$request->name_service,
            "description"=>$request->description,
            "cible"=>json_encode($request->cible),
            "cout_unitaire"=>$request->cout_unitaire,
            "devise"=>$request->devise,
            "operator_service"=>$request->operator_service
        ]);
        $ipAddress = $request->ip();
        $activity = new Activity();
        $activity->log_name = Auth::user()->name;
        $activity->description = "Modification service";
        $activity->subject_type = 'Modification service effectuée avec succès';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\Service\ServiceController';
        $activity->event = 'Modification service effectuée avec succès';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        return Inertia::render("Service/Index",[
            "services" => Service::all(),
            "success"=>"L'élément a été modifiéé avec succès."
        ]);
        
    }
}
