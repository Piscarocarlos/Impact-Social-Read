<?php

namespace App\Http\Controllers\Convention;

use Inertia\Inertia;
use App\Models\Convention;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Spatie\Activitylog\Models\Activity;

class SaveConventionController extends Controller
{
    /**
     * store
     *
     * @param  mixed $request
     * @return void
     */
    public function store(Request $request)
    {
        $request->validate(
            [
                "newConvention" => ['required'],
                "familleConvention" => ['required'],
                "critereSelected"=>["required"],
                "accountBank"=>["required"],
                "openBook"=>["required"],
            ],
            [
                "*.required" => "Ce champ est obligatoire"
            ]
        );
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
            $allData = $request->all();
            $path = Storage::disk("public")->put("conventionFile", $request->file("fileConvention"));
            $allData["fileConvention"] = $path;
            $save=Convention::create([
                'data'=>json_encode($allData)
            ]);
             return Inertia::render("Convention/IndexList",[
                "success" => "La conventiona a été mise en attente de complément."
            ]);
        } else {
            $allData = $request->all();
            $save=Convention::create(['data'=>json_encode($allData)]);
             return Inertia::render("Convention/IndexList",[
                "success" => "La conventiona a été mise en attente de complément."
            ]);
        }
    }
     /**
     * edit
     *
     * @param  mixed $request
     * @return void
     */
    public function edit(Request $request,$id){
        DB::table('service_conventions')->where('id',$id)->delete();
        $ipAddress = $request->ip();
        $activity = new Activity();
        $activity->log_name = Auth::user()->name;
        $activity->description = "Suppression convention";
        $activity->subject_type = 'Suppression effectuée';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\Convention\ConventionController';
        $activity->event = 'Suppression effectuée';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        return Inertia::render("Convention/IndexList",[
            "success" => "L'élément a bien été supprimée."
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
        DB::table("conventions")->where('id',$id)->delete();
        $ipAddress = $request->ip();
        $activity = new Activity();
        $activity->log_name = Auth::user()->name;
        $activity->description = "Suppression convention";
        $activity->subject_type = 'Suppression effectuée';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\Convention\ConventionController';
        $activity->event = 'Suppression effectuée';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        return Inertia::render("Convention/IndexList",[
            "success" => "L'élément a bien été suppriméé."
        ]);
    }
}
