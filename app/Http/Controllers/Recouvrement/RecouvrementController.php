<?php

namespace App\Http\Controllers\Recouvrement;

use Inertia\Inertia;
use Inertia\Response;
use App\Models\Convention;
use App\Models\Recouvrement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

use Illuminate\Support\Facades\Auth;
use function PHPUnit\Framework\isNull;
use Spatie\Activitylog\Models\Activity;

class RecouvrementController extends Controller
{
    public function index(Request $request)
    {
        //$data=Recouvrement::all()->unique("convention_id");
        //dd($data);
        $ipAddress = $request->ip();
        $activity = new Activity();
        $activity->log_name = Auth::user()->name;
        $activity->description = "Ouverture page recouvrement";
        $activity->subject_type = 'Lecture des données';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\Recouvrement\RecouvrementController';
        $activity->event = 'Lecture des données';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        return Inertia::render("Recouvrement/Index", [
            "recouvrement" => Convention::where('status',true)->get(),
        ]);
    }
    /**
     * index
     *
     * @return Response
     */
    public function create(Request $request): Response
    {
        $ipAddress = $request->ip();
        $activity = new Activity();
        $activity->log_name = Auth::user()->name;
        $activity->description = "Page création recouvrement";
        $activity->subject_type = 'Création recouvrement';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\Recouvrement\RecouvrementController';
        $activity->event = 'Création recouvrement';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        return Inertia::render(
            "Recouvrement/Create",
            [
                "convention" => Convention::where("status", true)->get()
            ]
        );
    }
    /**
     * store
     *
     * @param  mixed $request
     * @return void
     */
    public function store(Request $request)
    {
       //dd($request->all());
        $request->validate(
            [
                "convention"=>['required'],
                "check"=>['required'],
                "date"=>['required', "date"],
                "nature"=>['required', 'max:100'],
                "debit"=>['required', 'regex:/^\d+(\.\d+)?$/'],
                "credit"=>['required', 'regex:/^\d+(\.\d+)?$/'],
            ],
            [
                "*.required" => "Ce champ est obligatoire*",
                "*.max" => "La taille est trop longue*",
                "*.regex" => "Format incorrect*",
            ]
        );
        $ipAddress = $request->ip();
        $activity = new Activity();
        $activity->log_name = Auth::user()->name;
        $activity->description = "Ouverture page recouvrement";
        $activity->subject_type = 'Création de recouvrement effectuée';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\Recouvrement\RecouvrementController';
        $activity->event = 'Création de recouvrement effectuée';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();

        $conventionId=$request->convention["key"];
        $credit=$request->credit;
        $debit=$request->debit;
        $latestRecord = Recouvrement::where('convention_id', $conventionId)->latest('created_at')->first();
        if($latestRecord!==null){
            $solde=$latestRecord->solde;
            if($credit!=0){
                $totalSolde=$credit+$solde;
                $save=Recouvrement::create([
                    "convention_id"=>$conventionId,
                    "credit"=>$request->credit,
                    "debit"=>$request->debit,
                    "nature"=>$request->nature,
                    "solde"=>$totalSolde,
                    "date_operation"=>$request->date,
                ]);
                return Inertia::render("Recouvrement/Index", [
                    "recouvrement" => Convention::where('status',true)->get(),
                    "success"=>"L'élément a bien été créé avec succès."
                ]);
            }
            else{
                if($solde>$debit){
                    $totalSolde=$solde-$debit;
                    $save=Recouvrement::create([
                        "convention_id"=>$conventionId,
                        "credit"=>$request->credit,
                        "debit"=>$request->debit,
                        "nature"=>$request->nature,
                        "solde"=>$totalSolde,
                        "date_operation"=>$request->date,
                    ]);
                    return Inertia::render("Recouvrement/Index", [
                        "recouvrement" => Convention::where('status',true)->get(),
                        "success"=>"L'élément a bien été créé avec succès."
                    ]);
                }
                else{
                    $request->validate([
                       "myError"=>"required"
                    ],[
                        "myError.required"=>"Le compte pour cette convention ne dispose pas de fond suffissant pour débiter cette somme*"
                    ]);
                }
               
            }
            
        }
        else{
            if($credit!=0){
                $save=Recouvrement::create([
                    "convention_id"=>$conventionId,
                    "credit"=>$request->credit,
                    "debit"=>$request->debit,
                    "nature"=>$request->nature,
                    "solde"=>$credit,
                    "date_operation"=>$request->date,
                ]);
                return Inertia::render("Recouvrement/Index", [
                    "recouvrement" => Convention::where('status',true)->get(),
                    "success"=>"L'élément a bien été créé avec succès."
                ]);
            }
            else{
                $request->validate([
                    "myError"=>"required"
                 ],[
                     "myError.required"=>"Le compte pour cette convention ne dispose pas de fond suffissant pour débiter cette somme*"
                 ]);
            }
        }
        
    }
    /**
     * edit
     *
     * @return Response
     */
    public function edit(Request $request,$id)
    {
        
        $data=Recouvrement::where('convention_id',$id)->first();
        $dataConvention=Convention::find($id);
        $ipAddress = $request->ip();
        $activity = new Activity();
        $activity->log_name = Auth::user()->name;
        $activity->description = "Ouverture page recouvrement";
        $activity->subject_type = 'Modification';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\Recouvrement\RecouvrementController';
        $activity->event = 'Modification';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        return Inertia::render(
            "Recouvrement/IndexList",
            [
                "recouvrement" => Recouvrement::where("convention_id", $id)->get(),
                "convention"=>$dataConvention,
                "id"=>$id
            ]
        );
    }
     /**
     * edit
     *
     * @return Response
     */
    public function show(Request $request,$id){
        $ipAddress = $request->ip();
        $activity = new Activity();
        $activity->log_name = Auth::user()->name;
        $activity->description = "Ouverture page recouvrement";
        $activity->subject_type = 'Modification effectuée';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\Recouvrement\RecouvrementController';
        $activity->event = 'Modification effectuée';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        DB::table('recouvrements')->where('id',$id)->delete();
        return Inertia::render("Recouvrement/Index", [
            "recouvrement" => Convention::where('status',true)->get(),
            "success"=>"L'élément a bien été suppriméé avec succès."
        ]);
}
}
