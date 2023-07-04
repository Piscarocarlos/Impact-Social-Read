<?php

namespace App\Http\Controllers\Filtre;

use Illuminate\Http\Request;
use Inertia\Inertia;


use App\Models\inscription;


use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\DB;


use App\Models\Region;
use App\Models\Province;
use App\Models\City;
use App\Models\Situation__social;
use App\Models\Logement;
use App\Models\Orphelinat;
use App\Models\Type_handicap;
use App\Models\Percentage_handicap;
use App\Models\Annee_bac;
use App\Models\Ecole;
use App\Models\Filiere_bac;
use App\Models\Information__pluse;
use App\Models\Beneficiary;










class CandidatureFiltreController extends Controller
{
    public function CandidatureFiltre()

    {


        $beneficiaryDataUndecoded =  [
            Beneficiary::select('dataBeneficiary')->get()->pluck('dataBeneficiary'),


        ];
        $decodedArrayB = [];



        foreach ($beneficiaryDataUndecoded[0] as $jsonString) {
            $decodedObject = json_decode($jsonString, true);
            $dataBenificiary = $decodedObject['dataBenificiary'];

            foreach ($dataBenificiary as $item) {
                $decodedArrayB[] = $item;
            }
        }


        $ids = array_column($decodedArrayB, 'id');

        $candidatDataUndecoded =  [
            //Inscription::whereIn('user_id', $ids)->pluck('dataForm'),
          Inscription::select('dataForm')->get()->pluck('dataForm'),



        ];


        $decodedArray = [];



        foreach ($candidatDataUndecoded[0] as $element) {
            // Decode the JSON data in each element and append it to the $decodedArray
            // $data = json_decode($element, true);
            $data = json_decode($element, true);
            $decodedArray[] = $data;
        }

        // Display the contents of the $decodedArray
        //dd($decodedArrayB, $decodedArray);




        $tableData = [
            'RegionData' => Region::select('name_region')->get()->pluck('name_region'),
            'ProvinceData' => Province::select('name_province')->get()->pluck('name_province'),
            'CityData' => City::select('name_city')->get()->pluck('name_city'),
            'SituationData' => Situation__social::select('name_situation')->get()->pluck('name_situation'),
            'SituationHandicapData' => ['true', 'false'],
            'EpsSupportData' => ['Oui', 'Non'],
            'HousingData' => Logement::select('name_logement')->get()->pluck('name_logement'),
            'OrphelinData' => Orphelinat::select('name_type')->get()->pluck('name_type'),
            'ParentalCareData' => ['true', 'false'],
            'HandicapTypeData' => Type_handicap::select('type_handicap')->get()->pluck('type_handicap'),
            'HandicapPercentageData' => Percentage_handicap::select('pourcentage')->get()->pluck('pourcentage'),
            'WorkSituationFatherData' => ['true', 'false'],
            'WorkSituationMotherData' => ['true', 'false'],
            'SituationBankFatherData' => ['true', 'false'],
            'SituationBankMotherData' => ['true', 'false'],
            'YearBacData' => Annee_bac::select('year_bac')->get()->pluck('year_bac'),
            'SchoolNameData' => Ecole::select('nom_fr')->get()->pluck('nom_fr'),
            'BacStreamData' => Filiere_bac::select('name_filiere')->get()->pluck('name_filiere'),
            'FundationInfoData' => Information__pluse::select('name_information')->get()->pluck('name_information'),
            'GenreData' => ['Masculin', 'Féminin'],


        ];

        //dd($tableData);
        return Inertia::render('Filtre/CandidatureFiltre', ['tableData' => $tableData, 'decodedArray' => $decodedArray]);
    }

    public function filterUsers(Request $request)
    {


        dd('CONTROLLER INFILTRATED');
        $filters = $request->input('filters', []);

        // Retrieve users from the database
        $users = inscription::all();
        dd($users);

        $filteredUsers = [];

        foreach ($users as $user) {
            $userData = json_decode($user->dataform, true); // Decode the JSON string

            // Apply filters
            $regionFilter = $filters['region'] ?? null;
            $provinceFilter = $filters['province'] ?? null;
            $cityFilter = $filters['city'] ?? null;
            $socialSituationFilter = $filters['socialSituation'] ?? null;
            $handicapSituationFilter = $filters['handicapSituation'] ?? null;
            $supportByAnEPSFilter = $filters['supportByAnEPS'] ?? null;
            $housingFilter = $filters['housing'] ?? null;
            $orphelinTypeFilter = $filters['orphelinType'] ?? null;
            $parentalCareFilter = $filters['parentalCare'] ?? null;
            $handicapTypeFilter = $filters['handicapType'] ?? null;
            $handicapPercentageFilter = $filters['handicapPercentage'] ?? null;
            $workSituationFatherFilter = $filters['workSituationFather'] ?? null;
            $workSituationMotherFilter = $filters['workSituationMother'] ?? null;
            $situationBankFatherFilter = $filters['situationBankFather'] ?? null;
            $situationBankMotherFilter = $filters['situationBankMother'] ?? null;
            $yearBacFilter = $filters['yearBac'] ?? null;
            $schoolNameFilter = $filters['schoolName'] ?? null;
            $bacStreamFilter = $filters['bacStream'] ?? null;
            $fundationInfoFilter = $filters['fundationInfo'] ?? null;
            $genreFilter = $filters['genre'] ?? null;

            if ($regionFilter && $userData['regionOfOrigin'] !== $regionFilter) {
                continue; // Skip if region does not match the filter
            }

            if ($provinceFilter && $userData['provinceOfOrigin'] !== $provinceFilter) {
                continue; // Skip if province does not match the filter
            }

            if ($cityFilter && $userData['cityOfOrigin'] !== $cityFilter) {
                continue; // Skip if city does not match the filter
            }

            if ($socialSituationFilter && $userData['socialSituation'] !== $socialSituationFilter) {
                continue; // Skip if social situation does not match the filter
            }

            if ($handicapSituationFilter && $userData['handicapSituation'] !== $handicapSituationFilter) {
                continue; // Skip if handicap situation does not match the filter
            }

            if ($supportByAnEPSFilter && $userData['supportByAnEPS'] !== $supportByAnEPSFilter) {
                continue; // Skip if support by an EPS does not match the filter
            }

            if ($housingFilter && $userData['housing'] !== $housingFilter) {
                continue; // Skip if housing does not match the filter
            }

            if ($orphelinTypeFilter && $userData['orphelinType'] !== $orphelinTypeFilter) {
                continue; // Skip if orphelin type does not match the filter
            }

            if ($parentalCareFilter && $userData['parentalCare'] !== $parentalCareFilter) {
                continue; // Skip if parental care does not match the filter
            }

            if ($handicapTypeFilter && $userData['handicapType'] !== $handicapTypeFilter) {
                continue; // Skip if handicap type does not match the filter
            }

            if ($handicapPercentageFilter && $userData['handicapPercentage'] !== $handicapPercentageFilter) {
                continue; // Skip if handicap percentage does not match the filter
            }

            if ($workSituationFatherFilter && $userData['workSituationFather'] !== $workSituationFatherFilter) {
                continue; // Skip if work situation of father does not match the filter
            }

            if ($workSituationMotherFilter && $userData['workSituationMother'] !== $workSituationMotherFilter) {
                continue; // Skip if work situation of mother does not match the filter
            }

            if ($situationBankFatherFilter && $userData['situationBankFather'] !== $situationBankFatherFilter) {
                continue; // Skip if situation bank of father does not match the filter
            }

            if ($situationBankMotherFilter && $userData['situationBankMother'] !== $situationBankMotherFilter) {
                continue; // Skip if situation bank of mother does not match the filter
            }

            if ($yearBacFilter && $userData['yearBac'] !== $yearBacFilter) {
                continue; // Skip if year of Bac does not match the filter
            }

            if ($schoolNameFilter && $userData['schoolName'] !== $schoolNameFilter) {
                continue; // Skip if school name does not match the filter
            }

            if ($bacStreamFilter && $userData['bacStream'] !== $bacStreamFilter) {
                continue; // Skip if Bac stream does not match the filter
            }

            if ($fundationInfoFilter && $userData['fundationInfo'] !== $fundationInfoFilter) {
                continue; // Skip if foundation info does not match the filter
            }

            if ($genreFilter && $userData['genre'] !== $genreFilter) {
                continue; // Skip if genre does not match the filter
            }

            $filteredUsers[] = $user;
        }

        return response()->json($filteredUsers);
    }
}
