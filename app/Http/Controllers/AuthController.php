<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Inscription;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;


class AuthController extends Controller
{
    /**
     * login
     *
     * @return Response
     */
    public function login()
    {
        return Inertia::render('Authentication/LoginBoxed');

    }


    /**
     * register
     *
     * @return Response
     */
    public function register(): Response
    {
        return Inertia::render('Authentication/RegisterBoxed');
    }

    public function sign_up(Request $request)
    {

        $request->validate([
            'name' => ['required', 'string'],
            'email' => ['required', 'string', 'email'],
            'password' => ['required'],
        ]);


        $defaultValues = [
            "name" => $request->name,
            "lastName" => null,
            "address" =>null,
            "gsm" => null,
            "genre" => null,
            "dateOfBirth" => null,
            "placeOfBirth" => null,
            "massarCode" => null,
            "numberCin" => null,
            "country" => null,
            "regionOfOrigin" => null,
            "provinceOfOrigin" => null,
            "cityOfOrigin" => null,
            "emailAddress" => $request->email,
            "neighborhood" => null,
            "douar" => null,
            "yearBac" => null,
            "schoolRegion" => null,
            "schoolProvince" => null,
            "schoolCity" => null,
            "schoolName" => null,
            "bacStream" => null,
            "regionalBacScore" => null,
            "firstSemesterGrade" => null,
            "nameUrgency" => null,
            "gsmUrgency" => null,
            "linkFamily" => null,
            "addressUrgency" => null,
            "socialSituation" => null,
            "handicapSituation" => null,
            "supportByAnEPS" => null,
            "housing" => null,
            "orphelinType" => null,
            "parentalCare" => null,
            "amountPension" => null,
            "handicapType" => null,
            "handicapPercentage" => null,
            "nameEPS" => null,
            "nameResponsable" => null,
            "nameHousing" => null,
            "nameResponsableHousing" => null,
            "gsmEPSHousing" => null,
            "workSituationFather" => null,
            "workSituationMother" => null,
            "fatherWorkPlace" => null,
            "functionFather" => null,
            "fatherMonthlyAmount" => null,
            "motherWorkPlace" => null,
            "functionMother" => null,
            "motherMonthlyAmount" => null,
            "situationBankFather" => null,
            "situationBankMother" => null,
            "TotalNumberOfSiblings" => null,
            "NumberOfSiblingsMarried" => null,
            "NumberOfWorkingSiblings" => null,
            "fundationInfo" => null,
            "centersOfInterest" => null,
            "attestationRevenuFather" => null,
            "attestationBankFather" => null,
            "attestationBankMother" => null,
            "attestationRevenuMother" => null,
            "certificatDeccesMother" => null,
            "certificatDeccesFather" => null,
        ];


        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        Auth::login($user);
        if(Auth::check()){
    Inscription::create([
        "user_id"=>Auth::id(),
    "dataForm"=>json_encode($defaultValues)
        ]);
}
        return redirect()->route('dashboard.candidate.home');
    }


    /**
     * sign_in
     *
     * @param  mixed $request
     * @return void
     */
    public function sign_in(Request $request)
    {
        // dd($request);

        $request->validate([
            'email' => ['required', 'string', 'email'],
            'password' => ['required'],
        ]);

        $user = User::whereEmail($request->email)->first();

        if($user){
            if (Hash::check($request->password, $user->password)) {
                // dd($user);
                Auth::login($user);
                if ($user->user_type=="admin") {
                    return redirect()->route('dashboard.index');

                }
                return redirect()->route('dashboard.candidate.home');

            } else {
                return Redirect::route('login')->with('error', 'L\'adresse e-mail ou le mot de passe sont invalides');
            }
        } else {
            return Redirect::route('login')->with('error', 'Ce compte n\'existe pas ou a été supprimé');
        }

    }


    public function logout()
    {
        Auth::logout();
    }
}
