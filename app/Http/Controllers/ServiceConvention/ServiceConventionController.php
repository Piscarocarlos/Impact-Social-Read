<?php

namespace App\Http\Controllers\ServiceConvention;

use Inertia\Inertia;
use Inertia\Response;
use App\Models\Service;
use App\Models\Convention;
use Illuminate\Http\Request;
use App\Models\Service_convention;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use function PHPUnit\Framework\isNull;

class ServiceConventionController extends Controller
{
    /*public function index(){

        return Inertia::render("Serviceconvention/Index",[
           "service"=>Service_convention::all()
        ]);
    }*/
     /**
     * index
     *
     * @return Response
     */
    /*
      public function create() : Response
    {
        return Inertia::render("Serviceconvention/Createservice",
        [
            "convention"=>Convention::all(),
        ]
    );
    }
     */
    /**
     * edit
     *
     * @return Response
     */
    public function edit($id)
    {
        $data=Convention::find($id);

        return Inertia::render("Serviceconvention/Createservice",
        [
            "convention"=>json_decode($data),
            "service"=>Service::all(),
        ]);
    }
    /**
     * update
     *
     * @return Response
     */
    public function update(Request $request,$id){
        $request->validate([
            "service_id" => ["required"],
            "convention_id"=> ["required"],
            "cout" => ["required"],
            "partner" => ["required"],
            "objectif" => ["required"],
            "cout_service" => ["required"],
            "type_operator" => ["required","regex:/^[A-Za-z0-9]+$/","max:50"],
        ],
        [
            "*.required"=>"Ce champ est obligatoire*",
            "*.regex"=>"Format incorrect*",
            "*.max"=>"Ce champ est trop long*"
        ]
    );
    $test="";
    $service=$request->service_id["key"];
    $intValue = intval($service);
    $convention=$request->convention_id;
    $req=Service_convention::where("convention_id", $convention)->where("service_id",$intValue)->get();
    //dd($req);
    foreach($req as $key =>$value){
        $test=$value->service_id;
        
    }

   // dd("valeur : ".$test. " service saisie :". $service);



    if(empty($test)){
        $save=Service_convention::create([
            "service_id"=>$service,
            "convention_id"=>$convention,
            "cout"=>$request->cout,
            "partner"=>$request->partner,
            "objectif"=>$request->objectif,
            "cout_service"=>$request->cout_service,
            "type_operator"=>$request->type_operator,
        ]);
        return Inertia::render("Convention/IndexList",[
            "success" => "Le service a bien été calculé avec succès"
        ]);

    }
    else{
        if($test==$intValue){
            //dd('val test : '.$test, " ", "val intvalue :".$intValue);
            $data=Convention::find($id);
            return Inertia::render("Convention/IndexList",[
                "errors" => "Impossible d'ajouter ce service car il a déjà été ajouté pour cette convention"
            ]);
        }
        else{
            //dd("différent");
            $save=Service_convention::create([
                "service_id"=>$service,
                "convention_id"=>$convention,
                "cout"=>$request->cout,
                "partner"=>$request->partner,
                "objectif"=>$request->objectif,
                "cout_service"=>$request->cout_service,
                "type_operator"=>$request->type_operator,
            ]);
            return Inertia::render("Convention/IndexList",[
                "success" => "Le service a bien été ajouté avec succès"
            ]);
        }
    }
    }
    /**
     * show
     *
     * @return Response
     */
    public function show($id){
        $data=Service_convention::where("convention_id",$id)->get();
        $convention=Convention::find($id);
        $serachService=Service::all();
        return Inertia::render("Serviceconvention/Index",[
            "service"=>$data,
            "id"=>$id,
            "convention"=>$convention,
            "serachService"=>$serachService
         ]);
    }
}
