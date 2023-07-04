<?php

namespace App\Http\Controllers\Familyconvention;

use Inertia\Inertia;
use Inertia\Response;
use App\Models\Duration;
use Illuminate\Http\Request;
use App\Models\Type_convention;
use App\Models\Type_beneficiare;
use App\Models\Family_convention;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Spatie\Activitylog\Models\Activity;

class FamilyconventionController extends Controller
{
    public function index(Request $request){
        $ipAddress = $request->ip();
        $activity = new Activity();
        $activity->log_name = Auth::user()->name;
        $activity->description = "Ouverture page home famille convention";
        $activity->subject_type = 'Lecture des données';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\Familyconvention\FamilyconventionController';
        $activity->event = 'Lecture des données';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        return Inertia::render("Familyconvention/Index",[
            "familles" => Family_convention::all(),
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
        $activity->description = "Ouverture pagecréation famille convention";
        $activity->subject_type = 'Page création famille de convention';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\Familyconvention\FamilyconventionController';
        $activity->event = 'Page création famille de convention';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        return Inertia::render("Familyconvention/Create",[
            'beneficiaires'=>Type_beneficiare::all(),
            'conventions'=>Type_convention::all(),
            'durations'=>Duration::all()
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
            'name_family'=>['required', 'regex:/^[^\d]*$/','max:50'],
            'cible'=>['required'],
            'type_convention'=>['required'],
            'engagement'=>['required'],
        ],
        [
          "*.required"=>"Ce champ est obligatoire*",
          "name_family.regex"=>"Format incorrect*",
          "name_family.max"=>"La taille est trop longue et ne peut pas depasser 50 caractères*"  
        ]
    );
    
        $operateur=Family_convention::create([
            'name_family'=>$request->name_family,
            'cible'=>json_encode($request->cible),
            'type_convention'=>json_encode($request->type_convention),
            'engagement'=>json_encode($request->engagement)
        ]);
        $ipAddress = $request->ip();
        $activity = new Activity();
        $activity->log_name = Auth::user()->name;
        $activity->description = "Ouverture page création famille convention";
        $activity->subject_type = 'Création de famille de convention effectuée';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\Familyconvention\FamilyconventionController';
        $activity->event = 'Création de famille de convention effectuée';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        return Inertia::render("Familyconvention/Index",[
            "familles" => Family_convention::all(),
            "success"=>"La famille de convention a été créé avec succès."
        ]);
    }
     /**
     * edit
     *
     * @return Response
     */
    public function edit(Request $request,$id)
    {
        $ipAddress = $request->ip();
        $activity = new Activity();
        $activity->log_name = Auth::user()->name;
        $activity->description = "Ouverture page modification famille convention";
        $activity->subject_type = 'Page modification de famille de convention';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\Familyconvention\FamilyconventionController';
        $activity->event = 'Page modification de famille de convention';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        return Inertia::render("Familyconvention/Update",[
            "familles"=>Family_convention::find($id),
            'beneficiaires'=>Type_beneficiare::all(),
            'conventions'=>Type_convention::all(),
            'durations'=>Duration::all()
        ]);  
    }
    /**
     * update
     *
     * @return Response
     */
    public function update(Request $request,$id)
    {
       
        $request->validate([
            'name_family'=>['required', 'regex:/^[^\d]*$/','max:50'],
            'cible'=>['required'],
            'type_convention'=>['required'],
            'engagement'=>['required'],
        ],
        [
            "*.required"=>"Ce champ est obligatoire*",
            "name_family.regex"=>"Format incorrect*",
            "name_family.max"=>"La taille est trop longue et ne peut pas depasser 50 caractères*"  
        ]
    );
    
        DB::table('family_conventions')->where('id',$id)->update([
            'name_family'=>$request->name_family,
            'cible'=>json_encode($request->cible),
            'type_convention'=>json_encode($request->type_convention),
            'engagement'=>json_encode($request->engagement)
        ]);
        $ipAddress = $request->ip();
        $activity = new Activity();
        $activity->log_name = Auth::user()->name;
        $activity->description = "Ouverture page modification famille convention";
        $activity->subject_type = 'Modification de famille de convention effectuée';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\Familyconvention\FamilyconventionController';
        $activity->event = 'Modification de famille de convention effectuée';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        return Inertia::render("Familyconvention/Index",[
            "familles" => Family_convention::all(),
            "success"=>"L'élément a été modifiéé avec succès."
        ]);
    }
    /**
     * show
     *
     * @param  mixed $request
     * @return void
     */
    public function show(Request $request,$id)
    {
        DB::table('family_conventions')->where('id',$id)->delete();
        $ipAddress = $request->ip();
        $activity = new Activity();
        $activity->log_name = Auth::user()->name;
        $activity->description = "Supression famille convention";
        $activity->subject_type = 'Suppression famille de convention effectuée';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\Familyconvention\FamilyconventionController';
        $activity->event = 'Suppression famille de convention effectuée';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        return Inertia::render("Familyconvention/Index",[
            "familles" => Family_convention::all(),
            "success"=>"L'élément a été suppriméé avec succès."
        ]);
    }
}
