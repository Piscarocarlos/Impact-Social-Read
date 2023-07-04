<?php

namespace App\Http\Controllers\Convention;

use Inertia\Inertia;
use App\Models\Convention;
use Illuminate\Http\Request;
use App\Models\Statut_convention;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Spatie\Activitylog\Models\Activity;

class ConventionupdateController extends Controller
{
    /**
     * store
     *
     * @param  mixed $request
     * @return void
     */
    public function store(Request $request)
    {
        $id = $request->id;
        $request->validate(
            [
                /*bloc1*/
                "newConvention" => ['required'],
                "familleConvention" => ['required'],
                /*bloc 2*/
                "numberPartner" => ['required'],
                "partnerId" => ['required'],
                "statutConvention" => ['required',],
                "dateSignature" => ['required', 'date', 'date_format:Y-m-d', 'before_or_equal:today'],
                "dureeConvention" => ['required'],
                "contactPartner" => ['required',],

                "dateEffet" => ['required',],
                "dateFin" => ['required', 'date_format:Y-m-d', 'after:dateEffet'],

                "montantGlobal" => ["required", "regex:/^\d+(\.\d{1,2})?$/"],
                "devise" => ["required"],
                "contributionPartnaire" => ["required", "regex:/^\d+(\.\d{1,2})?$/"],
                "echeancierReglement" => ["required", "regex:/^\d+$/"],
                "dateEcheanceReglement" => ["required", 'date_format:Y-m-d', 'after:today'],
                "montantReglement" => ["required", "regex:/^\d+(\.\d{1,2})?$/"],

                "dateLimiteSelection" => ["required"],
                "numberBeneficiaryNextCohort" => ["required", "regex:/^\d+$/"],
                "modePartner" => ["required"],
                "critereSelected" => ["required"],

                "validateBeneficiary" => ["required"],
                "openBook" => ["required"],
                "accountBank" => ["required"],
                "service" => ["required"],
            ],
            [
                "*.required" => "Ce champ est obligatoire*",
                "*.after" => "La date de ce champ  doit être supérieure à une date*",
                "*.before_or_equal" => "La date de signature ne peut pas être supérieure à la date d'effet*",
                "*.regex" => "Format incorrect*"
            ]
        );
        /*bloc1*/
        if ($request->newConvention["value"] == "Non") {
            $request->validate(
                [
                    "reference" => ['required', "max:10", "regex:/^[A-Za-z0-9]+$/"],
                ],
                [
                    "*.required" => "Ce champ est obligatoire*",
                    "*.max" => "Ce champ est trop long*",
                    "*.regex" => "Format incorrect*",
                ]
            );
        }

        if (strtoupper($request->dureeConvention) == "MONO-COHORTE FERME") {
            $request->validate(
                [
                    "dureeEnAnnee" => ['required', "regex:/^\d+$/"],
                    "numberBeneficiary" => ['required', "regex:/^\d+$/"],
                    "periodeAccompagnement" => ['required', "regex:/^\d+$/"],
                ],
                [
                    "*.required" => "Ce champ est obligatoire*",
                    "*.regex" => "Format incorrect*",
                ]
            );
        }
        if (strtoupper($request->dureeConvention) == "PLURI-COHORTE") {
            $request->validate(
                [
                    "dureeEnAnnee" => ['required', "regex:/^\d+$/"],
                    "numberCohorte" => ['required', "regex:/^\d+$/"],
                    "dureeAccompagnement" => ['required', "regex:/^\d+$/"],
                    "numberBeneficiary" => ['required', "regex:/^\d+$/"],
                    "numberBeneficiaryMax" => ['required', "regex:/^\d+$/"],
                ],
                [
                    "*.required" => "Ce champ est obligatoire*",
                    "*.regex" => "Format incorrect*",
                ]
            );
        }


        if (strtoupper($request->typeConvention) == "ECRITE" || strtoupper($request->typeConvention) == "PACK") {
            $request->validate(
                [
                    "dateEffetFile" => ['required', 'date', 'date_format:Y-m-d', 'before_or_equal:today'],
                    "dateFinFile" => ['required', 'date_format:Y-m-d', 'after:dateEffetFile'],
                ],
                [
                    "*.required" => "Ce champ est obligatoire*",
                    "*.mimes" => "Seul le format pdf est autorisé*",
                    "*.max" => "La taille maximum est de 2048*",
                    "*.before_or_equal" => "La date de ce champ ne doit pas être supérieure à la date d'aujourd'hui*",
                    "*.after" => "La date de ce champ  doit être supérieure à la date d'aujourd'hui*",
                ]
            );
        }
        if (strtoupper($request->dureeConvention) == "ANNUELLE RENOUVELABLE") {
            $request->validate(
                [
                    "preavis" => ['required', "regex:/^\d+$/"],
                    "echeance" => ['required', 'date_format:Y-m-d', 'after:today'],
                    "numberBeneficiaryMax" => ['required', "regex:/^\d+$/"],
                ],
                [
                    "*.required" => "Ce champ est obligatoire*",
                    "*.regex" => "Format incorrect*",
                    "*.after" => "La date de ce champ doit être supérieure à la date d'aujourd'hui*",
                ]
            );
        }
        if (strtoupper($request->dureeConvention) == "ANNUELLE FERME") {
            $request->validate([
                "echeance" => ['required', 'date_format:Y-m-d', 'after:today'],
                "numberBeneficiaryMax" => ['required', "regex:/^\d+$/"],
            ]);
        }
        if (strtoupper($request->dureeConvention) == "OUVERTE") {
            $request->validate(
                [
                    "echeance" => ['required', 'date_format:Y-m-d', 'after:today'],
                ],
                [
                    "*.required" => "Ce champ est obligatoire*",
                    "*.after" => "La date de ce champ doit être supérieure à la date d'aujourd'hui*",
                ]
            );
        }
   
        if ($request->accountBank["value"] == "Oui") {
            $request->validate(
                [
                    "ribConvention" => ['required', "regex:/^[A-Za-z0-9]+$/", "max:27"],
                ],
                [
                    "*.required" => "Ce champ est obligatoire*",
                    "*.regex" => "Format incorrect*",
                    "*.max" => "La taille de ce champ est trop long*"
                ]
            );
        }
        if ($request->openBook["value"] == "Oui") {
            $request->validate(
                [
                    "modelReporting" => ['required',],
                ],
                [
                    "*.required" => "Ce champ est obligatoire*",
                ]
            );
        }
        $ipAddress = $request->ip();
        $activity = new Activity();
        $activity->log_name = Auth::user()->name;
        $activity->description = "Ouverture page convention";
        $activity->subject_type = 'Modification des données';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\Convention\ConventionController';
        $activity->event = 'Modification des données';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        if ($request->file("fileConvention") !== null) {
            $request->validate(
                [
                    "fileConvention" => ["file", "mimes:pdf,PDF", "max:2048"],
                ],
                [
                    "*.mimes" => "Seul le format pdf est autorisé*",
                    "*.max" => "La taille maximum est de 2048*",
                ]
            );
            $allData=$request->all();
            $path=Storage::disk("public")->put("conventionFile",$request->file("fileConvention"));
            $allData["fileConvention"]=$path;
            DB::table('conventions')->where("id",$id)->update([
                'data'=>json_encode($allData),
                'status'=>true
            ]);
            return Inertia::render("Convention/IndexList",[
                "success" => "La conventiona été modifiéée avec succès."
            ]);
        } 
        else {
            $allData=$request->all();
            $path=$request->fileConvention;
            $allData["fileConvention"]=$path;
            DB::table('conventions')->where("id",$id)->update([
                'data'=>json_encode($allData),
                'status'=>true
            ]);
            return Inertia::render("Convention/IndexList",[
                "success" => "La conventiona été modifiéé avec succès."
            ]);
        }
    }
    /**
     * edit
     *
     * @return Response
     */
    public function edit(Request $request,$id)
    {
        $data=Convention::find($id);
        $DataReq=json_decode($data);
        $ipAddress = $request->ip();
        $activity = new Activity();
        $activity->log_name = Auth::user()->name;
        $activity->description = "Ouverture page convention spécifique";
        $activity->subject_type = 'Modification des données';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\Convention\ConventionController';
        $activity->event = 'Modification des données';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        return Inertia::render("Convention/Changestatut",[
            "convention"=>$DataReq,
            "statut"=>Statut_convention::where("status",true)->get(),
        ]);
    }
    /**
     * update
     *
     * @param  mixed $request
     * @return void
     */
    public function update(Request $request,$id)
    {
        $statut=$request->statutConvention;
        $allData=Convention::find($id);
        $data=json_decode($allData->data, true);
        $data["statutConvention"]=$statut;
      
        DB::table("conventions")->where('id',$id)->update([
            "data"=>json_encode($data)
        ]);
        $ipAddress = $request->ip();
        $activity = new Activity();
        $activity->log_name = Auth::user()->name;
        $activity->description = "Ouverture page convention";
        $activity->subject_type = 'Modification  statut convention effectuée';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\Convention\ConventionController';
        $activity->event = 'Modification  statut convention effectuée';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        return redirect()->route('dashboard.convention.finish')->with('success', "La convention a été modifié");
    }
}
