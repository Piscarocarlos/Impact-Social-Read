<?php

namespace App\Http\Controllers\scoring;

use App\Models\City;
use App\Models\Pays;
use Inertia\Inertia;
use App\Models\Ecole;
use Inertia\Response;
use App\Models\Region;
use App\Models\Candidat;
use App\Models\Logement;
use App\Models\Province;
use App\Models\Orphelinat;
use App\Models\Filiere_bac;
use App\Models\Inscription;
use App\Models\ChampScoring;
use Illuminate\Http\Request;
use App\Models\Type_handicap;
use App\Models\scoringOpenField;
use App\Models\ScoringCloseField;
use App\Models\Situation__social;
use App\Models\Information__pluse;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class ScoringController extends Controller
{
    public function index(){
        $champScoring=ChampScoring::all();
$totalcoef=ChampScoring::sum('coef');
        return Inertia::render('scoring/Index',['champScoring'=>$champScoring,'totalcoef'=>$totalcoef]);
    }
    public function StoreChamp(Request $request){
        dd($request);

    }
    public function create($id){
        $ecoles=Ecole::take(10)->get();
        $filiere_bacs=Filiere_bac::all();
        $logements=Logement::all();
        $orphelinats=Orphelinat::all();
        $pays=Pays::all();
        $provinces=Province::take(10)->get();
        $regions=Region::all();
        $cities=City::take(10)->get();
        $situation__socials=Situation__social::all();
        $information__pluses=Information__pluse::all();
$handicapType=Type_handicap::all();
$champScoring=ChampScoring::all();
$idChamp=$id;
$fieldOpen=scoringOpenField::where('field_id',$id)->get();
$fieldClose=ScoringCloseField::where('field_id',$id)->get();

        return Inertia::render('scoring/Create',
        [
          'fieldOpen'=>$fieldOpen,
            'cities' => $cities,
            'ecoles' => $ecoles,
            'filiere_bacs' => $filiere_bacs,
            'logements' => $logements,
            'orphelinats' => $orphelinats,
            'pays' => $pays,
            'provinces' => $provinces,
            'regions' => $regions,
            'situation__socials' => $situation__socials,
            'information__pluses' => $information__pluses,
            'handicapType'=>$handicapType,
            'champScoring'=>$champScoring,
            'idChamp'=>$idChamp,
            'fieldClose'=>$fieldClose
        ]);
   
    }
public function updateStatus(Request $request,$id){
    
    $champScoring=ChampScoring::find($id);
  if ($request->coef!=null) {
    
    $champScoring->coef =$request->coef;
    $champScoring->update();

 return redirect()->back();
  } else {
    $champScoring->coef =0;
    $champScoring->status =!$champScoring->status;
    $champScoring->update();

 return redirect()->back();
  }

}
public function saveData(Request $request,$id){
    $content = $request->all();
    

    $size = strlen(json_encode($content));
  
//     $rules = [];
//    $data = $request->all();
//     foreach ($data as $key => $value) {
//         $rules[$key] = 'required';
//     }

//     $validator = Validator::make($data, $rules);
//     if ($validator->fails()) {
//         return $validator->errors();
//     }
//     dd($size);
   
    $dataJson=json_encode($request->all());
    

  
    $scoring=ScoringCloseField::create([
        'field_id'=>$id,
        'data'=>$dataJson,
    ]);

    return redirect()->route('dashboard.scoring.create',$id)->with('success', "La tranche a bien été créé avec succes");

}
public function updateCloseFieldValue(Request $request,$id){
    $data = ScoringCloseField::findorFail($id);

   $dataJson=json_encode($request->all());
   $data->data = $dataJson;
   $data->update();
return redirect()->back();
 }
public function saveDataTranchMethod(Request $request,$id){

    $dataJson=json_encode($request->all());
    $request->validate([

        // /*validation element required for step 2*/
             "min"=>"required|numeric",     
             "max"=>"required|numeric|gt:min",
             "val"=>"required|numeric",
        ],
        [
            "*.required"=>"Ce champ est obligatoire*",
            "*.numeric"=>"Format incorrect*",
            "*.gt"=>"Ce champ doit être superieur au min*",
        ]);

  
    $scoring=scoringOpenField::create([
        'field_id'=>$id,
        'type'=>$request->type,
        'data'=>$dataJson,
    ]);

    return redirect()->route('dashboard.scoring.create',$id)->with('success', "La tranche a bien été créé avec succes");

    }

    public function destroyTranch($id){
        $t = scoringOpenField::findorFail($id);
        // dd($t);
        $t->delete();
    return redirect()->back();
     }
}
