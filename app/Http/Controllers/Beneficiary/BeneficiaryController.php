<?php

namespace App\Http\Controllers\Beneficiary;

use App\Models\City;
use Inertia\Inertia;
use App\Models\Region;
use App\Models\Province;
use App\Models\Beneficiary;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Ecole;

class BeneficiaryController extends Controller
{
    public function index(){
        $beneficiaries=Beneficiary::all();
        $provinces = Province::all();
        $regions = Region::all();
        $cities = City::all();
        $ecoles = Ecole::all();
      
return Inertia::render('Beneficiaire/Index',[
    'beneficiaries'=>$beneficiaries,
    'regions' =>  $regions,
    'provinces' =>  $provinces,
    'cities' =>  $cities,
    'ecoles' => $ecoles,
]);
    }
    public function storeList(Request $request) {

$dataJson=json_encode($request->all());
$tableSize = Beneficiary::count();
if ($tableSize == 0) {
    $beneficiary = Beneficiary::create(['dataBeneficiary' => $dataJson]);
} else {
    $beneficiary = Beneficiary::first();
    $beneficiary->dataBeneficiary = $dataJson;
    $beneficiary->save();
}

// if ($tableSize==0) {
//   $beneficiary= Beneficiary::create(
//     ['dataBeneficiary' => $dataJson], 
//  );
// } else {
//     $beneficiary = Beneficiary::updated(
//         ['dataBeneficiary' => $dataJson],
    
//     );
// }

// $beneficiary= Beneficiary::firstOrCreate(
//     ['dataBeneficiary' => $dataJson], 
//     ['dataBeneficiary' => $dataJson] );
$beneficiary = Beneficiary::updateOrCreate(
    ['dataBeneficiary' => $dataJson],
    ['dataBeneficiary' => $dataJson]
);


    return redirect()->route('dashboard.list.beneficiare');

}

}

