<?php

namespace App\Http\Controllers;

use App\Models\Beneficiary;
use App\Models\City;
use App\Models\Pays;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Ecole;
use Inertia\Response;
use App\Models\Region;
use App\Models\Partner;
use App\Models\Candidat;
use App\Models\Convention;
use App\Models\Logement;
use App\Models\Province;
use App\Models\Orphelinat;
use App\Models\Filiere_bac;
use App\Models\Inscription;

use App\Models\ChampScoring;
use Illuminate\Http\Request;
use App\Models\Type_handicap;
use Illuminate\Validation\Rule;
use App\Models\scoringOpenField;
use App\Models\ScoringCloseField;
use App\Models\Situation__social;
use App\Models\Information__pluse;




use App\Models\Partner_contact;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Redirect;

class DashboardController extends Controller
{
    /**
     * index
     *
     * @return Response
     */
    public function index(): Response
    {
        //Accounte candidate
        //$totalCandidate = User::where('user_type','candidate')->count();
        $candidateValidate = User::where('email_verified_at', '!=', NULL)->where('user_type', 'candidate')->count();
        $candidateInValidate = User::where('email_verified_at', '=', NULL)->where('user_type', 'candidate')->count();
        //Inscription candidate
        $totalInscris = Inscription::count();
        //dd($totalInscris);
        $totalFinish = Inscription::where('etat', true)->count();
        $totalPaused = Inscription::where('etat', false)->count();

        $inscris = Inscription::all();
        $province = Province::all();
        //KPI FOR PARTNER
        $partner = Partner::where('user_id','!=',NULL)->count();
        $partnerNoaccount = Partner::where('user_id','=',NULL)->count();
        //dd($partnerNoaccount);
        //KPI FOR CONVENTION
        $conventionFinish = Convention::where('status', true)->count();
        $conventionPaused = Convention::where('status', false)->count();




        $candidat = Candidat::all();
        return Inertia::render('Home', [
            'candidat' =>  $candidat,
            'candidateValidate' => $candidateValidate,
            'candidateInValidate' => $candidateInValidate,

            'totalInscris' => $totalInscris,
            'totalFinish' => $totalFinish,
            'totalPaused' => $totalPaused,

            "inscris" => $inscris,
            "province" => $province,

            "partenaire" => $partner,
            "partnerNoAccount" =>  $partnerNoaccount,
            "conventionF" => $conventionFinish,
            "conventionP" => $conventionPaused


        ]);
    }
public function testApp(){
    return Inertia::render('candidate/SaveData');
}
public function testAppOne(Request $request){

    // dd($request->all());
    foreach ($request->all() as $key => $value) {
     
        Inscription::create([
            "user_id"=>$value[0]["user_id"],
        "dataForm"=>json_encode($value[0]["dataForm"]),
        "status"=>$value[0]["status"],
        "etat"=>$value[0]["etat"],
        "massarCode"=>$value[0]["massarCode"],
        "emailAddress"=>$value[0]["emailAddress"],
        "gsm"=>$value[0]["gsm"],
        "numberCin"=>$value[0]["numberCin"],
    
            ]);
    }
    return redirect()->back();

 
}
    public function listCandidate(): Response
    {

        $inscription = Inscription::where('etat', true)->get();
        return Inertia::render('candidate/List', [
            'inscription' =>  $inscription,

        ]);
    }
    public function resultScoring(): Response
    {
   
        $beneficiaries=Beneficiary::all();
        $ecoles = Ecole::take(10)->get();
        $filiere_bacs = Filiere_bac::all();
        $logements = Logement::all();
        $orphelinats = Orphelinat::all();
        $situation__socials = Situation__social::all();
        $information__pluses = Information__pluse::all();
        $handicapType = Type_handicap::all();
        $champScoring = ChampScoring::all();
        $provinces = Province::all();
        $regions = Region::all();
        $cities = City::all();
        $scoringOpenField = scoringOpenField::all();
        $scoringCloseField = ScoringCloseField::all();
        $fieldScoring = ChampScoring::all();
        $inscription = Inscription::where('etat', true)->get();
        return Inertia::render('candidate/Result', [
            'inscription' =>  $inscription,
            'regions' =>  $regions,
            'provinces' =>  $provinces,
            'cities' =>  $cities,
            'scoringCloseField' => $scoringCloseField,
            'scoringOpenField' => $scoringOpenField,
            'fieldScoring' => $fieldScoring,
            'ecoles' => $ecoles,
            'filiere_bacs' => $filiere_bacs,
            'logements' => $logements,
            'orphelinats' => $orphelinats,
            'situation__socials' => $situation__socials,
            'information__pluses' => $information__pluses,
            'beneficiaries'=>$beneficiaries,

        ]);
    }
    public function detailScoring($id): Response
    {
        $decodedID = base64_decode(urldecode($id));
        $myInscription = Inscription::where('user_id', $decodedID)->first();
        $ecoles = Ecole::all();
        $filiere_bacs = Filiere_bac::all();
        $logements = Logement::all();
        $orphelinats = Orphelinat::all();
        $situation__socials = Situation__social::all();
        $information__pluses = Information__pluse::all();
        $handicapType = Type_handicap::all();
        $champScoring = ChampScoring::all();
        $provinces = Province::all();
        $regions = Region::all();
        $cities = City::all();
        $scoringOpenField = scoringOpenField::all();
        $scoringCloseField = ScoringCloseField::all();
        $fieldScoring = ChampScoring::all();
        $inscription = Inscription::where('etat', true)->get();
        return Inertia::render('candidate/Detail', [
            'myInscription' => $myInscription,
            'inscription' =>  $inscription,
            'regions' =>  $regions,
            'provinces' =>  $provinces,
            'cities' =>  $cities,
            'scoringCloseField' => $scoringCloseField,
            'scoringOpenField' => $scoringOpenField,
            'fieldScoring' => $fieldScoring,
            'ecoles' => $ecoles,
            'filiere_bacs' => $filiere_bacs,
            'logements' => $logements,
            'orphelinats' => $orphelinats,
            'situation__socials' => $situation__socials,
            'information__pluses' => $information__pluses,

        ]);
    }

    /**
     * applyManagment
     *
     * @return void
     */
    public function applyManagment($id)
    {
        $candidat = Candidat::findorFail($id);
        return Inertia::render('Apply/Index', [
            'candidat' => $candidat
        ]);
    }


    public function saveApplyManagment(Request $request)
    {
        return $request->all();
    }

    public function allDataCrud()
    {
        return Inertia::render('Crud/Index');
    }
    public function allDataCrudPartner()
    {
        return Inertia::render('Crudpartner/Index');
    }


    public function createCandidate()
    {
        $candidats = json_decode(Candidat::all());
        return Inertia::render(
            'Apply/Create',
            [
                'candidats' => $candidats
            ]

        );
    }

    public function storeCandidate(Request $request)
    {
        $request->validate([
            'name' => 'required',
        ]);

        $candidat = new Candidat();
        $candidat->name = $request->name;
        $candidat->save();
        return redirect()->route("dashboard.apply", $candidat->id)->with("success", "Candidat created successfully.");
    }

    public function updateCandidate(Request $request, $id)
    {

        //   dd($request->all());
        $candidat = Candidat::findorFail($id);
        // dd($candidat);
        $data = $request->all();
        $steps = json_encode($data);
        // dd($steps);

        $candidat->steps = $steps;
        $candidat->update();

        return redirect()->route("dashboard.create.candidate")->with("success", "Candidat created successfully.");
    }

    public function inscriptionCandidate(): Response
    {
        $user = Auth::user();

        $myInscription = Inscription::where('user_id', $user->id)->first();
        $data = Candidat::where('activated', true)->first();
        $candidat = json_decode($data);
        $ecoles = Ecole::all();
        $filiere_bacs = Filiere_bac::all();
        $logements = Logement::all();
        $orphelinats = Orphelinat::all();
        $pays = Pays::all();
        $provinces = Province::all();
        $regions = Region::all();
        $cities = City::all();
        $situation__socials = Situation__social::all();
        $information__pluses = Information__pluse::all();
        $handicapType = Type_handicap::all();
        return Inertia::render('candidate/Inscription', [
            'candidat' => $candidat,
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
            'myInscription' => $myInscription,
            'handicapType' => $handicapType,
        ]);
    }
    public function deleteCandidate($id)
    {
        $candidat = Candidat::findorFail($id);
        $candidat->delete();
        return redirect()->route("dashboard.create.candidate")->with("success", "Candidat created successfully.");
    }

    public function updateCandidateStatus(Request $request, $id)
    {
        $candidat_update = Candidat::findorFail($id);
        // dd($candidat);
        $candidats = Candidat::all();
        // desactive all candidat status
        foreach ($candidats as $candidat) {
            $candidat->activated = false;
            $candidat->update();
        }
        // dd($candidat);
        // active candidat status
        $candidat_update->activated = true;
        $candidat_update->update();
        return redirect()->route("dashboard.create.candidate")->with("success", "Candidat created successfully.");
    }

    public function updateInscriptonSaveForm(Request $request, $id)
    {
        if ($request->file('attestationRevenuFather')) {
            $fichier1 = Storage::disk('public')->put('document_parent', $request->file('attestationRevenuFather'));
            $request->merge(['attestationRevenuFather' => $fichier1]);
        }
        if ($request->file('attestationRevenuMother')) {
            $fichier2 = Storage::disk('public')->put('document_parent', $request->file('attestationRevenuMother'));
            $request->merge(['attestationRevenuMother' => $fichier2]);
        }
        if ($request->file('attestationRevenuFather')) {
            $fichier3 = Storage::disk('public')->put('document_parent', $request->file('attestationRevenuFather'));
            $request->merge(['attestationRevenuFather' => $fichier3]);
        }
        if ($request->file('attestationBankFather')) {
            $fichier4 = Storage::disk('public')->put('document_parent', $request->file('attestationBankFather'));
            $request->merge(['attestationBankFather' => $fichier4]);
        }
        if ($request->file('certificatDeccesFather')) {
            $fichier5 = Storage::disk('public')->put('document_parent', $request->file('certificatDeccesFather'));
            $request->merge(['certificatDeccesFather' => $fichier5]);
        }
        if ($request->file('certificatDeccesMother')) {
            $fichier6 = Storage::disk('public')->put('document_parent', $request->file('certificatDeccesMother'));
            $request->merge(['certificatDeccesMother' => $fichier6]);
        }
        $user = Auth::user()->id;

        $myInscription = Inscription::where("user_id", $user)->first();
        $dataJson = json_encode($request->all());
        //    dd($dataJson);
        $myInscription->dataForm = $dataJson;
        $myInscription->update();
        //  return   Inertia::location(route('dashboard.canditate.inscription'));
    }
    public function updateInscriptonStepOne(Request $request, $id)
    {
        // dd($request->all());
        $massarCode = $request->massarCode;
        $user = Auth::user()->id;
        $myInscription = Inscription::where("user_id", $user)->first();
        $inscriptionId = $myInscription->id;
        $request->validate(
            [

                /*validation element required for step 1*/
                "name" => 'required|regex:/^[a-zA-Z]+$/|max:50',
                "lastName" => 'required|regex:/^[a-zA-Z]+$/|max:50',
                "emailAddress" => [
                    'required',
                    'email',
                    Rule::unique('inscriptions')->ignore($inscriptionId)
                ],
                "gsm" => [
                    'required',
                    'regex:/^0[1-9]\d{8}$/',
                    Rule::unique('inscriptions')->ignore($inscriptionId)
                ], // ça doit être unique,
                "genre" => "required|max:10",
                "dateOfBirth" => "required|date",
                "placeOfBirth" => 'required|regex:/^[a-zA-Z]+$/|max:50',
                //   "massarCode"=>"required|regex:/^[a-zA-Z]{1}[0-9]{9}+$/|max:10|min:10",//ça doit être unique
                'massarCode' => [
                    'required',
                    'max:10',
                    'min:10',
                    'regex:/^[a-zA-Z]{1}[0-9]{9}+$/',
                    Rule::unique('inscriptions')->ignore($inscriptionId)
                ],

                "numberCin" => [
                    'required',
                    'max:10',
                    'regex:/^[a-zA-Z0-9_\-]*$/',
                    Rule::unique('inscriptions')->ignore($inscriptionId)
                ], //ça doit être unique
                "country" => "required",
                "regionOfOrigin" => "required|max:50",
                "provinceOfOrigin" => "required|max:50",
                "cityOfOrigin" => "required|max:50",
                "address" => "required|max:100",

            ],
            [
                'name.required' => 'Le nom champ est obligatoire *',
                'name.max' => 'Le nom ne doit pas dépasser 50 lèttres *',
                'lastName.required' => 'Le prénom champ est obligatoire *',
                'lastName.max' => 'Le prénom ne doit pas dépasser 60 lèttres *',
                'emailAddress.required' => 'L\'adresse mail est obligatoire*',
                'address.required' => 'L\'adresse est obligatoire*',

                '*.unique' => 'Cet élément existe déjà*',
                'emailAddress.max' => 'L\'adresse mail est trop longue*',
                'gsm.required' => 'Le GSM est obligatoire*',
                'gsm.regex' => 'Le GSM doit contenir que des chiffres*',
                'gsm.max' => 'La taille de GSM est de 10 chiffres*',
                'gsm.min' => 'La taille de GSM est de 10 chiffres*',
                'genre.required' => 'Le champ genre est obligatoire*',
                'dateOfBirth.required' => 'La date de naissance est obligatoire*',
                'placeOfBirth.required' => 'Le lieu de naissance est  obligatoire*',
                'placeOfBirth.regex' => 'Le lieu de naissance ne doit pas contenir des chiffres*',
                'placeOfBirth.max' => 'La taille de lieu de naissance est trop longue*',
                'massarCode.required' => 'Le code massar est obligatoire*',
                'massarCode.regex' => 'Le code massar est incorrect*',
                'massarCode.max' => 'Le code ne doit pas depasser 10 caractères*',
                'massarCode.min' => 'Le code doit avoir 10 caractères*',
                'numberCin.required' => 'Le numero CIN est obligatoire*',
                'numberCin.regex' => 'Le numero CIN est incorrect*',
                'numberCin.max' => 'Le numero CIN ne doit pas depasser 10 caracteres*',
                'numberCin.required' => 'Adresse postale est obligatoire*',
                'numberCin.max' => 'Adresse postale est trop longue*',
                'regionOfOrigin.required' => 'La region d\'origne est obligatoire*',
                'provinceOfOrigin.required' => 'La province est obligatoire*',
                'cityOfOrigin.required' => 'La ville est obligatoire*',
                'douar.regex' => 'Format incorrect*',
                'douar.max' => 'La taille est trop longue*',
                'quartier.regex' => 'Format incorrect*',
                'quartier.max' => 'Le champ quartier est trop longue',
                'country.required' => 'La nationnalité est obligatoire*',
                'name.regex' => 'Le nom ne doit pas contenir des chiffres',
                'lastName.regex' => 'Le prénom ne doit pas contenir des chiffres',

            ]
        );

        $dataJson = json_encode($request->all());

        $myInscription->dataForm = $dataJson;
        $myInscription->massarCode = $request->massarCode;
        $myInscription->gsm = $request->gsm;
        $myInscription->emailAddress = $request->emailAddress;
        $myInscription->numberCin = $request->numberCin;
        $myInscription->update();
    }
    public function updateInscriptonStepTwo(Request $request, $id)
    {
        // dd($request->all());
        $request->validate(
            [


                // /*validation element required for step 2*/
                "yearBac" => "required|max:4",
                "schoolRegion" => "required|max:50",
                "schoolProvince" => "required|max:50",
                "schoolCity" => "required|max:50",
                "schoolName" => "required|max:50",
                "bacStream" => "required|max:50",
                "regionalBacScore" => ['nullable', 'regex:/^\d*(\.\d{2})?$/', 'lte:21'],
                // 'note_bac_regionale' => 'regex:/^\d*(\.\d{2})?$/|lte:21',
                'firstSemesterGrade' => ['nullable', 'regex:/^\d*(\.\d{2})?$/', 'lte:21'],
            ],
            [
                "*.required" => "Ce champ est obligatoire*",
                "*.regex" => "La note est incorecte",
                "*.lte" => "La note  ne peut pas depasser 20*"
                // 'yearBac.required'=>'Année du bac est obligatoire*',
                // 'schoolRegion.required'=>'La region du lycée est obligatoire*',
                // 'bacStream.required'=>'La filière du bac est obligatoire*',
                // 'note_bac_regionale.regex'=>'La note du bac regional est incorrecte*',
                // 'note_bac_regionale.lte'=>'La note du bac regional ne peut pas depasser 20*',
                // 'firstSemesterGrade.lte'=>'La note du premier ne peut pas depasser 20*',
                // 'firstSemesterGrade.regex'=>'La note du premier semestre est incorrecte*',
                // 'mention_bac.required'=>'La mention du bac est obligatoire*',
                // 'schoolName.required'=>'Le nom du lycée est obligatoire*'
            ]
        );
        $user = Auth::user()->id;

        $myInscription = Inscription::where("user_id", $user)->first();

        $dataJson = json_encode($request->all());

        $myInscription->dataForm = $dataJson;
        $myInscription->update();
    }
    public function updateInscriptonStepThree(Request $request, $id)
    {
        $request->validate(
            [

                //  /*validation element required for step 3*/
                "nameUrgency" => 'required|regex:/^[a-zA-Z]+$/|max:50',
                "gsmUrgency" => "required|regex:/^0[1-9]\d{8}$/", //ça doit être unique
                "linkFamily" => 'required|regex:/^[a-zA-Z]+$/|max:50',

            ],
            [
                'nameUrgency.required' => 'Le nom de contact urgence est obligatoire*',
                'nameUrgency.regex' => 'Le nom format du nom est incorrect*',
                'nameUrgency.max' => 'La taille du nom est trop longue*',
                'gsmUrgency.required' => 'Le gsm est obligatoire*',
                'gsmUrgency.regex' => 'Le format de gsm est est invalide*',
                'gsmUrgency.max' => 'La taille de gsm est de 10 chiffres*',
                'gsmUrgency.min' => 'Le gsm doit avoir 10 chiffres*',
                'linkFamily.required' => 'Le lien de famille est obligatoire*',
                'linkFamily.regex' => 'Le lien de famille est incorrect*',
                'email_urgence.regex' => 'Email est incorrect*',
                'gsmUrgency.unique' => 'Le gsm d\'urgence doit être différent de votre gsm'
            ]

        );
        $user = Auth::user()->id;

        $myInscription = Inscription::where("user_id", $user)->first();
        $dataJson = json_encode($request->all());

        $myInscription->dataForm = $dataJson;
        $myInscription->update();
    }
    public function updateInscriptonStepFour(Request $request, $id)
    {
        $request->validate(
            [

                /*validation element required for step 4*/
                "socialSituation" => "required",
                "handicapSituation" => "required",
                "supportByAnEPS" => "required",
                "housing" => "required",
                //         /*if social situation  equal divorcé to add element for step 4*/
                "parentalCare" => "required_if:socialSituation,Parent divorcés",
                "amountPension" => [
                    "required_if:socialSituation,Parent divorcés",
                    function ($attribute, $value, $fail) use ($request) {
                        if ($request->input('socialSituation') === 'Parent divorcés' && !preg_match('/^\d*(\.\d{2})?$/', $value)) {
                            $fail('Le champ est obligatoire .');
                        }
                    },
                ],

                // regex:/^\d*(\.\d{2})?$/",
                /*if situation social equal orphelin to add element for step 4*/
                "orphelinType" => "required_if:socialSituation,Orphelin",
                /*if situation handicap equal yes to add element for step 4*/
                "handicapType" => "required_if:handicapSituation,yes",
                "handicapPercentage" => "required_if:handicapSituation,yes",
                //          /*if prise en charge eps equal yes to add element for step 4*/
                "nameEPS" => [
                    'required_if:supportByAnEPS,Oui',

                    function ($attribute, $value, $fail) use ($request) {
                        if ($request->input('supportByAnEPS') === 'Oui' && !preg_match('/^[a-zA-Z]+$/', $value)) {
                            $fail('Le champ est obligatoire .');
                        }
                    },
                ],
                "nameResponsable" => [
                    'required_if:supportByAnEPS,Oui',

                    function ($attribute, $value, $fail) use ($request) {
                        if ($request->input('supportByAnEPS') === 'Oui' && !preg_match('/^[a-zA-Z]+$/', $value)) {
                            $fail('Le champ est obligatoire .');
                        }
                    },
                ],
                /*if logement equal yes to add element for step 4*/
                "nameHousing" => [
                    // 'required_if:housing,EPS',
                    function ($attribute, $value, $fail) use ($request) {
                        if ($request->input('housing') === 'EPS' && $request->input('supportByAnEPS') === 'Non') {
                            $fail('Le champ est obligatoire .');
                        }
                    },
                ],
                "nameResponsableHousing" => [
                    // 'required_if:housing,EPS',
                    function ($attribute, $value, $fail) use ($request) {
                        if ($request->input('housing') === 'EPS' && $request->input('supportByAnEPS') === 'Non') {
                            $fail('Le champ est obligatoire .');
                        }
                    },
                ],
                "gsmEPSHousing" => [

                    function ($attribute, $value, $fail) use ($request) {
                        if (($request->input('housing') === 'EPS' || $request->input('supportByAnEPS') === 'Oui') && !preg_match('/^0[1-9]\d{8}$/', $value)) {
                            $fail('Le champ est obligatoire .');
                        }
                    },
                ],


                //   "required_if:housing,EPS
                //   |required_with:supportByAnEPS,Oui|regex:/^0[1-9]\d{8}$/",

            ],
            [
                "*.required" => "Ce champ est obligatoire*",
                "*.required_if" => "Ce champ est obligatoire*",
                "*.regex" => "Format incorrect*",
                "*.max" => "La taille est trop long*",
                "*.unique" => "Elément existe déjà dans la base de données*",
            ]
        );
        $user = Auth::user()->id;

        $myInscription = Inscription::where("user_id", $user)->first();
        $dataJson = json_encode($request->all());

        $myInscription->dataForm = $dataJson;
        $myInscription->update();
    }
    public function updateInscriptonStepFive(Request $request, $id)
    {
        $request->validate(
            [

                // /*validation element required for step 5*/
                "TotalNumberOfSiblings" => "required|numeric|max:10",
                "NumberOfSiblingsMarried" => "required|numeric|max:10|lte:TotalNumberOfSiblings",
                "NumberOfWorkingSiblings" => "required|numeric|max:10|lte:TotalNumberOfSiblings",
                "workSituationFather" => "required_if:socialSituation,Normale|required_if:orphelinType,de mere|required_if:parentalCare,Mon pere",
                "workSituationMother" => "required_if:socialSituation,Normale|required_if:orphelinType,de pere|required_if:parentalCare,Ma mere",
                "situationBankFather" => "required_if:socialSituation,Normale|required_if:orphelinType,de mere|required_if:parentalCare,Mon pere",
                "situationBankMother" => "required_if:socialSituation,Normale|required_if:orphelinType,de pere|required_if:parentalCare,Ma mere",
                "fatherMonthlyAmount" => "required_if:socialSituation,Normale|required_if:orphelinType,de mere|required_if:parentalCare,Mon pere",
                "motherMonthlyAmount" => "required_if:socialSituation,Normale|required_if:orphelinType,de pere|required_if:parentalCare,Ma mere",
                "functionFather" => "required_if:workSituationFather,trueF",
                "functionMother" => "required_if:workSituationMother,trueM",


            ],
            [
                "*.required" => "Ce champ est obligatoire*",
                "*.required_if" => "Ce champ est obligatoire*",
                "*.regex" => "Format incorrect*",
                "*.max" => "La taille est trop long*",
                "*.unique" => "Elément existe déjà dans la base de données*",
                "*.lte" => "La valeur de ce champ doit être inférieure au nombre total de frères et soeurs",
            ]
        );
        $user = Auth::user()->id;

        $myInscription = Inscription::where("user_id", $user)->first();
        $dataJson = json_encode($request->all());

        $myInscription->dataForm = $dataJson;
        $myInscription->update();
    }
    public function updateInscriptonStepSix(Request $request, $id)
    {
        $request->validate(
            [

                // /*validation element required for step 2*/
                "fundationInfo" => "required",
                //  "centersOfInterest"=>"required",
            ],
            [
                "*.required" => "Ce champ est obligatoire*",
                "*.regex" => "Format incorrect*",
                "*.max" => "La taille est trop long*",
                "*.unique" => "Elément existe déjà dans la base de données*"
            ]
        );
        $user = Auth::user()->id;

        $myInscription = Inscription::where("user_id", $user)->first();
        $dataJson = json_encode($request->all());

        $myInscription->dataForm = $dataJson;
        $myInscription->update();
    }
    public function updateInscriptonStepSeven(Request $request, $id)
    {

        $request->validate(
            [

                // /*validation element required for step 2*/
                "attestationRevenuFather" => "required_if:socialSituation,Normale|required_if:orphelinType,de mere|required_if:parentalCare,Mon pere",
                "attestationRevenuMother" => "required_if:socialSituation,Normale|required_if:orphelinType,de pere|required_if:parentalCare,Ma mere",
                //    'required|mimes:pdf|max:2500',
                "attestationBankMother" => 'required_if:situationBankMother,trueMB',
                "attestationBankFather" =>  'required_if:situationBankFather,trueFB',

                "certificatDeccesFather" => 'required_if:orphelinType,de pere,les deux',
                "certificatDeccesMother" => 'required_if:orphelinType,de mere,les deux',

            ],
            [
                "*.required" => "Ce champ est obligatoire*",
                "*.required_if" => "Ce champ est obligatoire*",
                "*.regex" => "Format incorrect*",
                "*.max" => "La taille est trop long*",
                "*.unique" => "Elément existe déjà dans la base de données*"
            ]

        );
        $requestData = $request->all();
        // $request->input('attestationRevenuFather', );
        if ($request->file('attestationRevenuFather')) {
            $path = $request->file('attestationRevenuFather')->store('document_parent');
            // dd($path);
            //    $fichier1=Storage::disk('public')->put('document_parent',$request->file('attestationRevenuFather'));
            // $request->merge('attestationRevenuFather' =>$path);
            $requestData['attestationRevenuFather'] = $path; // Ajouter le chemin temporaire du fichier à la requête
        }
        if ($request->file('attestationRevenuMother')) {
            $fichier2 = Storage::disk('public')->put('document_parent', $request->file('attestationRevenuMother'));
            $requestData['attestationRevenuMother'] = $fichier2;
        }
        if ($request->file('attestationBankFather')) {
            $fichier3 = Storage::disk('public')->put('document_parent', $request->file('attestationBankFather'));
            $requestData['attestationBankFather'] = $fichier3;
        }
        if ($request->file('attestationBankMother')) {
            $fichier4 = Storage::disk('public')->put('document_parent', $request->file('attestationBankMother'));
            $requestData['attestationBankMother'] = $fichier4;
        }
        if ($request->file('certificatDeccesFather')) {
            $fichier5 = Storage::disk('public')->put('document_parent', $request->file('certificatDeccesFather'));
            $requestData['certificatDeccesFather'] = $fichier5;
        }
        if ($request->file('certificatDeccesMother')) {
            $fichier6 = Storage::disk('public')->put('document_parent', $request->file('certificatDeccesMother'));
            $requestData['certificatDeccesMother'] = $fichier6;
        }
        $user = Auth::user()->id;

        $myInscription = Inscription::where("user_id", $user)->first();
        $dataJson = json_encode($requestData);
        $myInscription->dataForm = $dataJson;
        $myInscription->etat = !$myInscription->etat;
        $myInscription->update();
        return redirect()->route('dashboard.candidate.home');
    }
    public function ViewCandidate($id)
    {
        $decodedID = base64_decode(urldecode($id));

        $user = Auth::user();
        $provinces = Province::all();
        $regions = Region::all();
        $cities = City::all();
        $myInscription = Inscription::where('user_id', $decodedID)->first();
        return Inertia::render('candidate/ViewInscription', [
            'myInscription' => $myInscription,
            'regions' => $regions,
            'provinces' => $provinces,
            'cities' => $cities
        ]);
    }
    public function subscribeCandidate(Request $request)
    {
        // $candidat = Candidat::findorFail($id);
        // dd($candidat);
        $data = $request->all();

        // validations

        // get unique name associate to their validations
        // dd($request);






        //  /*validation element required for step 4*/
        //  "socialSituation"=>"required",
        //  "handicapSituation"=>"required",
        //  "supportByAnEPS"=>"required",
        //  "housing"=>"required",

        //         /*if social situation  equal normal no add element for step 4*/

        //         /*if social situation  equal divorcé to add element for step 4*/
        //         "parentalCare"=>"required",
        //         "amountPension"=>"required|regex:/^\d*(\.\d{2})?$/",

        //         /*if situation social equal orphelin to add element for step 4*/
        //         "orphelinType"=>"required",

        //         /*if situation handicap equal yes to add element for step 4*/
        //         "handicapType"=>"required",
        //         "handicapPercentage"=>"required",

        //          /*if prise en charge eps equal yes to add element for step 4*/
        //          "nameEPS"=> 'required|regex:/^[a-zA-Z]+$/|max:50',
        //          "nameResponsable"=> 'required|regex:/^[a-zA-Z]+$/|max:50',
        //          "gsmEPS"=>"required|regex:/^0[1-9]\d{8}$/",

        //           /*if logement equal yes to add element for step 4*/
        //           "nameHousing"=> 'required|regex:/^[a-zA-Z]+$/|max:50',
        //           "nameResponsableHousing"=> 'required|regex:/^[a-zA-Z]+$/|max:50',
        //           "gsmEPSHousing"=>"required|regex:/^0[1-9]\d{8}$/",

        //  /*validation element required for step 5*/

        //         /*if social situation  equal normal to add element for step 4*/
        //         "workSituationFather"=>"required",
        //             /*if workSituationFather  equal yes no add element for step 5*/
        //             //"fatherWorkPlace" optionnel
        //             "functionFather"=>"required|regex:/^[a-zA-Z]+$/|max:50",
        //             "fatherMonthlyAmount"=>"required|regex:/^\d*(\.\d{2})?$/",
        //             /*if workSituationFather  differend yes no add element for step 5*/
        //             "fatherMonthlyAmount"=>"required|regex:/^\d*(\.\d{2})?$/",

        //         "workSituationMother"=>"required",
        //             /*if workSituationMother  equal yes to add element for step 5*/
        //               //"MotherWorkPlace" optionnel
        //               "functionMother"=>"required|regex:/^[a-zA-Z]+$/|max:50",
        //               "MotherMonthlyAmount"=>"required|regex:/^\d*(\.\d{2})?$/",
        //               /*if workSituationMother  differend yes no add element for step 5*/
        //               "MotherMonthlyAmount"=>"required|regex:/^\d*(\.\d{2})?$/",

        //         "situationBankFather"=>"required",
        //         "situationBankMother"=>"required",
        //         "TotalNumberOfSiblings"=>"required|numeric|max:10",
        //         "NumberOfSiblingsMarried"=>"required|numeric|max:10",
        //         "NumberOfWorkingSiblings"=>"required|numeric|max:10",

        //  /*validation element required for step 6*/
        //  "fundationInfo"=>"required",
        //  "centersOfInterest"=>"required",

        //  /*validation element required for step 7*/
        //     /*if situation social equal normal(step4) and situation bank fathere && mother equel yes */
        //     "attestationRevenuFather"=> 'required|mimes:pdf|max:2500',
        //     "attestationBankFather"=> 'required|mimes:pdf|max:2500',
        //     "attestationRevenuMother"=> 'required|mimes:pdf|max:2500',
        //     "attestationBankMother"=> 'required|mimes:pdf|max:2500',
        //     /*if situation social equal orphelin(step4)*/
        //         /*orphelin de pere and situation bank mother equel yes*/
        //         "certificatDeccesFather"=>'required|mimes:pdf|max:2500',
        //         "attestationRevenuMother"=> 'required|mimes:pdf|max:2500',
        //         "attestationBankMother"=> 'required|mimes:pdf|max:2500',
        //         /*orphelin de mere and situation bank father equel yes*/
        //         "certificatDeccesMother"=>'required|mimes:pdf|max:2500',
        //         "attestationRevenuFather"=> 'required|mimes:pdf|max:2500',
        //         "attestationBankFather"=> 'required|mimes:pdf|max:2500',
        //     /*if situation social equal divorcé(step4)*/
        //         /*prise en charge by father and situation bank father*/
        //         "attestationRevenuFather"=> 'required|mimes:pdf|max:2500',
        //         "attestationBankFather"=> 'required|mimes:pdf|max:2500',
        //          /*prise en charge by mother and situation bank mother*/
        //          "attestationRevenuMother"=> 'required|mimes:pdf|max:2500',
        //          "attestationBankMother"=> 'required|mimes:pdf|max:2500',
        // /**if situation social equal orphelin and type orphelin equal two(des deux parents)  */
        // "certificatDeccesFather"=>'required|mimes:pdf|max:2500',
        // "certificatDeccesMother"=>'required|mimes:pdf|max:2500',
        // /**if situation social equal abondonné etap 7 no input element  */



        // ]);
    }
    public function banned ($id){
        $user= User::findOrFail($id);
        dd($user);
        return Inertia::render('Team/Index');

    }
}
