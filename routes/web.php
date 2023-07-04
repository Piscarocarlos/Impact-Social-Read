<?php

use Inertia\Inertia;
use App\Models\Family_convention;
use App\Http\Controllers\Controller;


use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AppController;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DataController;

use App\Http\Controllers\InstallController;
use App\Models\Section_three_home_candidate;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Pack\PackController;


use App\Http\Controllers\Pays\PaysController;
use App\Http\Controllers\Team\TeamController;
use App\Http\Controllers\Users\RoleController;
use App\Http\Controllers\Cities\CityController;
use App\Models\Section_three_home_candidate_ar;
use App\Http\Controllers\Devise\DeviseController;
use App\Http\Controllers\Sector\SectorController;
use App\Http\Controllers\Regions\RegionController;
use App\Http\Controllers\Partner\PartnerController;

use App\Http\Controllers\Schooly\SchoolyController;
use App\Http\Controllers\scoring\ScoringController;
use App\Http\Controllers\Service\ServiceController;
use App\Http\Controllers\Yearbac\YearBacController;
use App\Http\Controllers\Civility\CivilityController;
use App\Http\Controllers\Duration\DurationController;
use App\Http\Controllers\Googleauth\GoogleController;
use App\Http\Controllers\Verify\VerifyUserController;
use App\Http\Controllers\Provinces\ProvinceController;
use App\Http\Controllers\Reporting\ReportingController;
use App\Http\Controllers\Convention\ConventionController;
use App\Http\Controllers\Housintype\HousingTypeController;
use App\Http\Controllers\Smtpconfiguration\SmtpController;
use App\Http\Controllers\Beneficiary\BeneficiaryController;
use App\Http\Controllers\Statut\StatutConventionController;
use App\Http\Controllers\Typepartner\TypepartnerController;
use App\Http\Controllers\Convention\FileConventionCOntroller;
use App\Http\Controllers\Convention\SaveConventionController;
use App\Http\Controllers\IntutileActe\IntituleActeController;
use App\Http\Controllers\Recouvrement\RecouvrementController;
use App\Http\Controllers\Typehandicap\TypehandicapController;
use App\Http\Controllers\Typeorphelin\TypeorphelinController;
use App\Http\Controllers\Convention\ConventionupdateController;
use App\Http\Controllers\Homecandidate\HomecandidateController;
use App\Http\Controllers\Periodecandidature\PeriodeCandidature;
use App\Http\Controllers\Sourcepartner\SourcepartnerController;
use App\Http\Controllers\Partneraccount\PartnerAccountController;
use App\Http\Controllers\Partnercontact\PartnercontactController;
use App\Http\Controllers\Typeconvention\TypeconventionController;
use App\Http\Controllers\Updatepassword\UpdatepasswordController;
use App\Http\Controllers\Profilusercandidate\ProfiluserController;


use App\Http\Controllers\Section1candidatehome\section1Controller;

use App\Http\Controllers\Section2candidatehome\section2Controller;
use App\Http\Controllers\Section3candidatehome\section3Controller;
use App\Http\Controllers\CritereSelected\CritereSelectedController;
use App\Http\Controllers\Socialsituation\SocialsituationController;
use App\Http\Controllers\Operateurservice\OperatorserviceCOntroller;
use App\Http\Controllers\Typebeneficaire\TypebeneficiaireController;
use App\Http\Controllers\Familyconvention\FamilyconventionController;
use App\Http\Controllers\Percentagehandicap\PercentagehandiController;


use App\Http\Controllers\Section1candidatehomear\Section1ControllerAr;

use App\Http\Controllers\Section2candidatehomear\Section2ControllerAr;
use App\Http\Controllers\Section3candidatehomear\Section3ControllerAr;
use App\Http\Controllers\ServiceConvention\ServiceConventionController;
use App\Http\Controllers\Applicationknowledge\ApplicationknowledgeController;
use App\Http\Controllers\Typecategoriepartner\TypecategoriepartnerController;
use App\Http\Controllers\Typeoperateurservice\TypeoperateurserviceController;

use App\Http\Controllers\configuration\ConfigurationController;
use App\Http\Controllers\Filtre\CandidatureFiltreController;



Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'login'])->name('login');
    Route::post('/login', [AuthController::class, 'sign_in'])->name('login');
    Route::get('/register', [AuthController::class, 'register'])->name('register');
    Route::post('/register', [AuthController::class, 'sign_up'])->name('register');
    Route::get('/', [Controller::class, 'home'])->name('home');

});

Route::get('/password/reset/{token}',[PartnerAccountController::class,'resetPassword']);
Route::get('auth/google',[GoogleController::class,'redirect'])->name('google_auth');
Route::get('auth/google/call-back',[GoogleController::class,'callbackGoogle'])->name('google_call_auth');
Route::post('/update-password-partner',[UpdatepasswordController::class,'partnerPassword']);
// Auth











Route::middleware(['auth'])->group(function () {
    //ROUTE FOR REDIRECT USER_TEAM AFTER CHANGED PASSWORD

    Route::as('dashboard.')->prefix('dashboard')->group(function () {
        Route::get('/team-user', [VerifyUserController::class, 'team'])->name('team_dashboard');


        Route::get('inscription-candidat', [DashboardController::class, 'inscriptionCandidate'])->name('candidate.inscription');
        // Route::post('subscribe-candidate',[DashboardController::class,'subscribeCandidate'])->name('subscribe.candidate');
        Route::get('view-candidate', [DashboardController::class, 'ViewCandidate'])->name('candidate.view');

        Route::get('view-candidate/{id}', [DashboardController::class, 'ViewCandidate'])->name('candidate.view');

        //   Stept route candidature inscription
        Route::post('subscribe-candidate-step1/{id}', [DashboardController::class, 'updateInscriptonStepOne'])->name('subscribe.candidate.step1');
        Route::post('subscribe-candidate-step2/{id}', [DashboardController::class, 'updateInscriptonStepTwo'])->name('subscribe.candidate.step2');
        Route::post('subscribe-candidate-step3/{id}', [DashboardController::class, 'updateInscriptonStepThree'])->name('subscribe.candidate.step3');
        Route::post('subscribe-candidate-step4/{id}', [DashboardController::class, 'updateInscriptonStepFour'])->name('subscribe.candidate.step4');
        Route::post('subscribe-candidate-step5/{id}', [DashboardController::class, 'updateInscriptonStepFive'])->name('subscribe.candidate.step5');
        Route::post('subscribe-candidate-step6/{id}', [DashboardController::class, 'updateInscriptonStepSix'])->name('subscribe.candidate.step6');
        Route::post('subscribe-candidate-step7/{id}', [DashboardController::class, 'updateInscriptonStepSeven'])->name('subscribe.candidate.step7');
        Route::post('subscribe-candidate-saveForm/{id}', [DashboardController::class, 'updateInscriptonSaveForm'])->name('subscribe.candidate.saveForm');

        // scoring candidate
        Route::get('test', [DashboardController::class, 'testApp'])->name('test.app');
        Route::post('testone', [DashboardController::class, 'testAppOne'])->name('test.app.one');


Route::get('scoring',[ScoringController::class,'index'])->name('scoring');
Route::post('store-scoring',[ScoringController::class,'storeChamp'])->name('scoring.store');
Route::get('create-scoring/{id}',[ScoringController::class,'create'])->name('scoring.create');
Route::post('update-scoring/{id}',[ScoringController::class,'updateStatus'])->name('scoring.update.status');
Route::post('save-scoring/{id}',[ScoringController::class,'saveData'])->name('scoring.save');
Route::post('save-scoring-tranch-method/{id}',[ScoringController::class,'saveDataTranchMethod'])->name('scoring.save.tranch.method');
Route::delete('delete-scoring-tranch-method/{id}',[ScoringController::class,'destroyTranch'])->name('delete.tranch.method');
Route::post('update-scoring-close-field-value/{id}',[ScoringController::class,'updateCloseFieldValue'])->name('update.close.field.value');
// BENIFIVIARY
Route::get('list-beneficiare',[BeneficiaryController::class,'index'])->name('list.beneficiare');
Route::post('store-list-beneficiare',[BeneficiaryController::class,'storeList'])->name('store.list.beneficiary');


// Configuration Activation Route
Route::get('configuration-activation-module',[ConfigurationController::class,'indexActivation'])->name('activation.module.configuration');
Route::post('update-activation',[ConfigurationController::class,'updateActivation'])->name('activation.update');
        // Route::get('inscription-candidat', [DashboardController::class, 'inscriptionCandidate'])->name('canditate.inscription');
        Route::post('subscribe-candidate/{id}', [DashboardController::class, 'subscribeCandidate'])->name('subscribe.candidate');
        //ROUTE FOR PROFIL CANDIDATE
        Route::get('profil-candidate', [ProfiluserController::class, 'profilCandidate'])->name('profil.candidate');
        Route::post('profil-candidate-update/{id}', [ProfiluserController::class, 'profilCandidateUpdate'])->name('profil.candidate.id');
        //ROUTE FOR HOME CANDIDAT
        Route::get('accueil-candidat', [HomecandidateController::class, "home"])->name('candidate.home');
        // ROUTE RESOURCE TEAM
        Route::resource('/teams', TeamController::class);


        Route::middleware(['admin'])->group(function () {

            Route::get('/', [DashboardController::class, 'index'])->name('index');

            //ROUTE FOR HOMEPAGE CANDIDATE FR
            Route::get('/accueil', [HomecandidateController::class, 'index'])->name('home.candidate');
            //ROUTE FOR SECTION1 HOME CANDIDATURE
            Route::resource('/section-one-candidate', section1Controller::class);
            //ROUTE FOR SECTION2 HOME CANDIDATURE
            Route::resource('/section-two-candidate', section2Controller::class);
            //ROUTE FOR SECTION2 HOME CANDIDATURE
            Route::resource('/section-three-candidate', section3Controller::class);

            //ROUTE FOR section1 CANDIDATE AR
            Route::resource('/section-one-candidate-ar', Section1ControllerAr::class);
            //ROUTE FOR section2 CANDIDATE AR
            Route::resource('/section-two-candidate-ar', Section2ControllerAr::class);
            //ROUTE FOR section3 CANDIDATE AR
            Route::resource('/section-three-candidate-ar', Section3ControllerAr::class);

            Route::get('/all-data-crud', [DashboardController::class, 'allDataCrud'])->name('all-data-crud');
            Route::get('/all-data-crud-partner', [DashboardController::class, 'allDataCrudPartner'])->name('all-data-crud-partner');

            // Candidature Admin
            Route::get('create-candidate-apply', [DashboardController::class, 'createCandidate'])->name('create.candidate');
            Route::post('store-candidate-apply', [DashboardController::class, 'storeCandidate'])->name('store.candidate');
            Route::post('update-candidate-apply/{id}', [DashboardController::class, 'updateCandidate'])->name('update.candidate');
            Route::delete('delete-candidate-apply/{id}', [DashboardController::class, 'deleteCandidate'])->name('delete.candidate');
            Route::put('update-candidate-status/{id}', [DashboardController::class, 'updateCandidateStatus'])->name('update.candidate.status');
            Route::get('apply-managment/{id}', [DashboardController::class, 'applyManagment'])->name('apply');
            Route::post('save-apply-managment', [DashboardController::class, 'saveApplyManagment'])->name('apply.save');
            Route::get('list-candidate', [DashboardController::class, 'listCandidate'])->name('list.candidate');
            Route::get('result-scoring-candidate', [DashboardController::class, 'resultScoring'])->name('result.scoring.candidate');
            Route::get('detail-scoring-candidate/{id}', [DashboardController::class, 'detailScoring'])->name('detail.scoring.candidate');


            Route::resource('roles', RoleController::class)->except(['edit']);
            Route::resource('data', DataController::class);
            Route::post("save-permission", [RoleController::class, 'savePermission'])->name('permission.save');
            //ROUTE FOR REGION
            Route::resource('regions', RegionController::class);
            //Route::resource('regions/{id}',RegionController::class);
            //ROUTE FOR PROVINCE
            Route::resource('provinces', ProvinceController::class);
            //ROUTE FOR CITY
            Route::resource('villes', CityController::class);
            //ROUTE FOR YEAR BAC
            Route::resource('annees-bac', YearBacController::class);
            //ROUTE FOR SECTOR BAC
            Route::resource('filiere-bac', SectorController::class);
            //ROUTE FOR SOCIAL SITUATION
            Route::resource('situation-sociale', SocialsituationController::class);
            //ROUTE FOR TYPE OF ORPHELAN
            Route::resource('type-orphelin', TypeorphelinController::class);
            //ROUTE FOR HOUSING TYPE
            Route::resource('type-logement', HousingTypeController::class);
            //ROUTE FOR APPLICATION KNOWLWIDGE
            Route::resource('connaissance-application', ApplicationknowledgeController::class);
            //ROUTE FOR PERIODE CANDIDATURE
            Route::resource('periode-candidature', PeriodeCandidature::class);
            //ROUTE FOR SMTP CONFIGURATION
            //ROUTE FOR TYPE DANDICAP
            Route::resource('type-handicap', TypehandicapController::class);
            //ROUTE FOR PERCENTAGE HANDICAP
            Route::resource('pourcentage-handicap', PercentagehandiController::class);
            Route::resource('smtp-configuration', SmtpController::class);
            Route::get('smtp-configuration-update/{id}', [SmtpController::class, 'smtp_update'])->name('smtp_update');
            //ROUTE FOR TYPE OPERATOR
            Route::resource('type-operateur-service', TypeoperateurserviceController::class);
            //Route FOr BENEFICIARE
            Route::resource('type-beneficiaire', TypebeneficiaireController::class);
            //ROUTE FOR TYPE CONVENTION
            Route::resource('type-convention', TypeconventionController::class);
            //ROUTE FOR DURATION
            Route::resource('duration-convention', DurationController::class);
            //ROUTE FOR DEVISE
            Route::resource('liste-devise', DeviseController::class);
            //ROUTE FOR CIVILITY
            Route::resource('liste-civilite', CivilityController::class);
            //ROUTE FOR TYPE PARTNER
            Route::resource('liste-partenaire-type', TypepartnerController::class);
            //ROUTE FOR SOURCE PARTNER
            Route::resource('liste-source', SourcepartnerController::class);
            //ROUTE FOR TYPE CATEGORIE PARTNER
            Route::resource('liste-categorie-partenaire', TypecategoriepartnerController::class);
            //ROUTE FOR PARTNER
            Route::resource('liste-partenaire', PartnerController::class);
            //ROUTE FOR COUNTRY
            Route::resource('liste-pays', PaysController::class);
            //ROUTE FOR SCHOOLY
            Route::resource('liste-ecole', SchoolyController::class);
            //ROUTE FOR CONTACT PARTNER
            Route::resource('contact-partenaires', PartnercontactController::class);
            //ROUTE FOR SERVICE ACCOMPAGNEMENT
            Route::resource('service', ServiceController::class);
            //ROUTE FOR OPERATEUR DE SERVICE
            Route::resource('operateur-service', OperatorserviceCOntroller::class);
            //ROUTE FOR FAMILY CONVENTION
            Route::resource('famille-convention', FamilyconventionController::class);
            //ROUTE FOR UPDATE FILE SETTING HOME CANDIDATE FOR SECTION THREE
            Route::post('update-icon-home-page/{id}', [section3Controller::class, 'updatefile'])->name('update.file');
            Route::post('update-icon-home-page-ar/{id}', [Section3ControllerAr::class, 'updatefile'])->name('update.file.ar');
            //ROUTE FOR THE PACK CONVENTION
            Route::resource('list-pack', PackController::class);
            //ROUTE FOR STATUT CONVENTION
            Route::resource("statut-convention", StatutConventionController::class);
            //MODEL REPORTING
            Route::resource("model-reporting", ReportingController::class);
            //CRITERRE SELECTED
            Route::resource("critere-selection", CritereSelectedController::class);
            //ROUTE FOR INTITULLE DACT
            Route::resource("intitule-acte", IntituleActeController::class);
            //ROUTE FOR THE CONVENTION
            Route::resource('convention', ConventionController::class);
            Route::resource('convention-update', ConventionupdateController::class);
            Route::resource("save-convention", SaveConventionController::class);
            Route::get('convention-finish', [ConventionController::class, "indexFinalise"])->name('convention.finish');
            Route::get('convention-attente', [ConventionController::class, "indexAttente"])->name('convention.attente');
            //ROUTE FOR SERVICE CONVENTION
            Route::resource('service-convention', ServiceConventionController::class);
            Route::get('service-convention-update/{id}', [ServiceConventionController::class, "serviceConvention"])->name('service.convention');
            //DOWLOAD FILE CONVENTION
            Route::get("file-convention/{id}", [FileConventionCOntroller::class, 'file'])->name("file.convention");
            //RECOUVREMENT
            ROute::resource('recouvrement', RecouvrementController::class);
        });


                    Route::get('/', [DashboardController::class, 'index'])->name('index');

        //ROUTE FOR HOMEPAGE CANDIDATE FR
        Route::get('/accueil',[HomecandidateController::class,'index'])->name('home.candidate');
        //ROUTE FOR SECTION1 HOME CANDIDATURE
        Route::resource('/section-one-candidate',section1Controller::class);
        //ROUTE FOR SECTION2 HOME CANDIDATURE
        Route::resource('/section-two-candidate',section2Controller::class);
        //ROUTE FOR SECTION2 HOME CANDIDATURE
        Route::resource('/section-three-candidate',section3Controller::class);

        //ROUTE FOR section1 CANDIDATE AR
        Route::resource('/section-one-candidate-ar',Section1ControllerAr::class);
        //ROUTE FOR section2 CANDIDATE AR
        Route::resource('/section-two-candidate-ar',Section2ControllerAr::class);
        //ROUTE FOR section3 CANDIDATE AR
        Route::resource('/section-three-candidate-ar',Section3ControllerAr::class);

        Route::get('/all-data-crud', [DashboardController::class, 'allDataCrud'])->name('all-data-crud');
        Route::get('/all-data-crud-partner', [DashboardController::class, 'allDataCrudPartner'])->name('all-data-crud-partner');

        // Candidature Admin
        Route::get('create-candidate-apply', [DashboardController::class, 'createCandidate'])->name('create.candidate');
        Route::post('store-candidate-apply', [DashboardController::class, 'storeCandidate'])->name('store.candidate');
        Route::post('update-candidate-apply/{id}', [DashboardController::class, 'updateCandidate'])->name('update.candidate');
        Route::delete('delete-candidate-apply/{id}', [DashboardController::class, 'deleteCandidate'])->name('delete.candidate');
        Route::put('update-candidate-status/{id}', [DashboardController::class, 'updateCandidateStatus'])->name('update.candidate.status');
        Route::get('apply-managment/{id}', [DashboardController::class, 'applyManagment'])->name('apply');
        Route::post('save-apply-managment', [DashboardController::class, 'saveApplyManagment'])->name('apply.save');
        Route::get('list-candidate', [DashboardController::class, 'listCandidate'])->name('list.candidate');
        Route::get('result-scoring-candidate', [DashboardController::class, 'resultScoring'])->name('result.scoring.candidate');
        Route::get('detail-scoring-candidate/{id}', [DashboardController::class, 'detailScoring'])->name('detail.scoring.candidate');


        Route::get('currency-setting', [ConfigurationController::class, 'currencySetting'])->name('currency.setting');
        Route::get('/api/configuration/currencies', [ConfigurationController::class, 'getCurrencies']);

        Route::post('/delete-currency/{id}', [ConfigurationController::class, 'deleteCurrency'])->name('delete.currency');


        Route::post('/save-modified-currency', [ConfigurationController::class, 'saveModifiedCurrency'])->name('save.modified.currency');

        Route::post('/save-currency', [ConfigurationController::class, 'saveCurrency'])->name('save.currency');
        Route::post('/save-default-currency', [ConfigurationController::class, 'saveDefaultCurrency'])->name('save.default.currency');
        Route::post('/save-format-settings', [ConfigurationController::class, 'saveFormatSettings'])->name('save.format.settings');

        Route::get('/candidaturefiltre', [CandidatureFiltreController::class, 'CandidatureFiltre'])->name('Candidature.Filtre');
        Route::post('/filterusers', [CandidatureFiltreController::class, 'filterUsers'])->name('filter.users');




        Route::resource('roles', RoleController::class)->except(['edit']);
        Route::resource('data', DataController::class);
        Route::post("save-permission", [RoleController::class, 'savePermission'])->name('permission.save');
        //ROUTE FOR REGION
        Route::resource('regions',RegionController::class );
        //Route::resource('regions/{id}',RegionController::class);
        //ROUTE FOR PROVINCE
        Route::resource('provinces',ProvinceController::class);
        //ROUTE FOR CITY
        Route::resource('villes',CityController::class);
        //ROUTE FOR YEAR BAC
        Route::resource('annees-bac',YearBacController::class);
        //ROUTE FOR SECTOR BAC
        Route::resource('filiere-bac',SectorController::class);
        //ROUTE FOR SOCIAL SITUATION
        Route::resource('situation-sociale',SocialsituationController::class);
        //ROUTE FOR TYPE OF ORPHELAN
        Route::resource('type-orphelin',TypeorphelinController::class);
        //ROUTE FOR HOUSING TYPE
        Route::resource('type-logement',HousingTypeController::class);
        //ROUTE FOR APPLICATION KNOWLWIDGE
        Route::resource('connaissance-application',ApplicationknowledgeController::class);
        //ROUTE FOR PERIODE CANDIDATURE
        Route::resource('periode-candidature',PeriodeCandidature::class);
        //ROUTE FOR SMTP CONFIGURATION
        //ROUTE FOR TYPE DANDICAP
        Route::resource('type-handicap',TypehandicapController::class);
        //ROUTE FOR PERCENTAGE HANDICAP
        Route::resource('pourcentage-handicap',PercentagehandiController::class);
        Route::resource('smtp-configuration',SmtpController::class);
        Route::get('smtp-configuration-update/{id}',[SmtpController::class,'smtp_update'])->name('smtp_update');
        //ROUTE FOR TYPE OPERATOR
        Route::resource('type-operateur-service',TypeoperateurserviceController::class);
        //Route FOr BENEFICIARE
        Route::resource('type-beneficiaire',TypebeneficiaireController::class);
        //ROUTE FOR TYPE CONVENTION
        Route::resource('type-convention',TypeconventionController::class);
        //ROUTE FOR DURATION
        Route::resource('duration-convention',DurationController::class);
        //ROUTE FOR DEVISE
        Route::resource('liste-devise',DeviseController::class);
        //ROUTE FOR CIVILITY
        Route::resource('liste-civilite',CivilityController::class);
        //ROUTE FOR TYPE PARTNER
        Route::resource('liste-partenaire-type',TypepartnerController::class);
        //ROUTE FOR SOURCE PARTNER
        Route::resource('liste-source',SourcepartnerController::class);
        //ROUTE FOR TYPE CATEGORIE PARTNER
        Route::resource('liste-categorie-partenaire',TypecategoriepartnerController::class);
        //ROUTE FOR PARTNER
        Route::resource('liste-partenaire',PartnerController::class);
        //ROUTE FOR COUNTRY
        Route::resource('liste-pays',PaysController::class);
        //ROUTE FOR SCHOOLY
        Route::resource('liste-ecole',SchoolyController::class);
        //ROUTE FOR CONTACT PARTNER
        Route::resource('contact-partenaires',PartnercontactController::class);
        //ROUTE FOR SERVICE ACCOMPAGNEMENT
        Route::resource('service',ServiceController::class);
        //ROUTE FOR OPERATEUR DE SERVICE
        Route::resource('operateur-service',OperatorserviceCOntroller::class);
        //ROUTE FOR FAMILY CONVENTION
        Route::resource('famille-convention',FamilyconventionController::class);
        //ROUTE FOR UPDATE FILE SETTING HOME CANDIDATE FOR SECTION THREE
        Route::post('update-icon-home-page/{id}',[section3Controller::class,'updatefile'])->name('update.file');
        Route::post('update-icon-home-page-ar/{id}',[Section3ControllerAr::class,'updatefile'])->name('update.file.ar');
        //ROUTE FOR THE PACK CONVENTION
        Route::resource('list-pack',PackController::class);
        //ROUTE FOR STATUT CONVENTION
        Route::resource("statut-convention",StatutConventionController::class);
        //MODEL REPORTING
        Route::resource("model-reporting",ReportingController::class);
        //CRITERRE SELECTED
        Route::resource("critere-selection",CritereSelectedController::class);
        //ROUTE FOR INTITULLE DACT
        Route::resource("intitule-acte",IntituleActeController::class);
        //ROUTE FOR THE CONVENTION
        Route::resource('convention',ConventionController::class);
        Route::resource('convention-update',ConventionupdateController::class);
        Route::resource("save-convention",SaveConventionController::class);
        Route::get('convention-finish',[ConventionController::class,"indexFinalise"])->name('convention.finish');
        Route::get('convention-attente',[ConventionController::class,"indexAttente"])->name('convention.attente');
        //ROUTE FOR SERVICE CONVENTION
        Route::resource('service-convention',ServiceConventionController::class);
        Route::get('service-convention-update/{id}',[ServiceConventionController::class,"serviceConvention"])->name('service.convention');
        //DOWLOAD FILE CONVENTION
        Route::get("file-convention/{id}",[FileConventionCOntroller::class,'file'])->name("file.convention");
        //RECOUVREMENT
        Route::resource('recouvrement',RecouvrementController::class);
        //ACCOUNT PARTENER
        Route::resource('account-partner',PartnerAccountController::class);

        //CONFIGURATION
        Route::post('configuration/social-media-google', [ConfigurationController::class, 'saveGoogle'])->name("configuration.save.google");
        Route::get('configuration/social-media', [ConfigurationController::class, 'indexSocialMedia'])->name("configuration.index.social.media");
        Route::post('configuration/social-media-facebook', [ConfigurationController::class, 'saveFacebook'])->name("configuration.save.facebook");
        Route::post('configuration/social-media-twitter', [ConfigurationController::class, 'saveTwitter'])->name("configuration.save.twitter");

    });
        });



    Route::get('logout', [AuthController::class, 'logout'])->name('logout');

//ROUTE FOR USER_TEAM  VERICATION AFTER CREATE.
Route::get('/verfication-user/{id}', [VerifyUserController::class, 'verifyAction'])->name('verifyAction');
Route::post('/verify_user/{id}', [VerifyUserController::class, 'changepassword'])->name('verify');

