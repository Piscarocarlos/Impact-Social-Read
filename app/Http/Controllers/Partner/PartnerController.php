<?php

namespace App\Http\Controllers\Partner;

use App\Models\Pays;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Source;
use App\Models\Partner;
use App\Mail\PartnerMail;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\Partner_contact;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Models\Type_categorie_partner;
use Spatie\Activitylog\Models\Activity;

class PartnerController extends Controller
{
    public function index(Request $request){
        $ipAddress = $request->ip();
        $activity = new Activity();
        $activity->log_name = Auth::user()->name;
        $activity->description = "Ouverture page home partenaire";
        $activity->subject_type = 'Lecture des données';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\Partner\PartnerController';
        $activity->event = 'Lecture des données';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        return Inertia::render("Partner/Index",[
            "partenaires" => Partner::all()
        ]);
    }
    /**
     * index
     *
     * @return Response
     */
    public function create(Request $request) : Response
    {
        $userPartner=User::where('user_type','partenaire')->get();
        //dd($userPartner);
        $ipAddress = $request->ip();
        $activity = new Activity();
        $activity->log_name = Auth::user()->name;
        $activity->description = "Ouverture page création partenaire";
        $activity->subject_type = 'Création';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\Partner\PartnerController';
        $activity->event = 'Création';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
       
        return Inertia::render("Partner/Create",[
            "categories" => Type_categorie_partner::all(),
            "sources"=>Source::all(),
            "pays"=>Pays::all(),
            "contact"=>Partner_contact::all(),
            "users"=>$userPartner,
            "partner"=>Partner::all()
        ]);
    }
      /**
     * store
     *
     * @param  mixed $request
     * @return void
     */
    public function store(Request $request)
    {
        $user=null;
        //dd(json_encode($request->contact));
        $request->validate([
            "name_partner"=>['required', 'regex:/^[^\d]*$/','max:50'],
            "categorie_partner"=>['required'],
            "adresse_partner"=>['required'],
            "region_partner"=>['required', 'regex:/^[^\d]*$/','max:50'],
            "ville_partner"=>['required', 'regex:/^[^\d]*$/','max:50'],
            "pays_partner"=>['required'],
            "web_site_partner"=>['required', /*'regex:/^https?:\/\/(www\.)?[\w.-]+\.[a-z]{2,}\/?$/'*/'max:50'],
            "tel_standard_partner"=>['required', 'regex:/^0[1-9]\d{8}$/'],
            "likedin_partner"=>['required' /*'regex:/^https?:\/\/(www\.)?linkedin\.com\/company\/[\w-]+\/?$/'*/,'max:200'],
            "source_partner"=>['required'],
            "contact"=>['required'],
            "tag"=>['required'],
            //"user_id"=>['required','unique:partners']
        ],
        [
            "*.required"=>"Ce champ est obligatoire*",
            "*.regex"=>"Le format est incorrect*",
            "*.max"=>"La taille de cet élément est trop longue*"
        ]
    );
    if($request->tag==1){
        $request->validate([
            'email'=>'required|email|unique:users'
        ],
        [
            '*.required'=>"Ce champ est obligatoire*",
            '*.max'=>"La taille de ce champ est trop longue",
            "*.unique"=>"Cette adresse email existe déjà*",
            "*.email"=>"Format adresse email incorrect*",
        ]
        );
        $generatePassword = Str::random(10);
        $Password="partner".$generatePassword;
        $hashedPassword = Hash::make($Password);
        $account=User::create([
            "name"=>$request->name_partner,
            "email"=>$request->email,
            "password"=>$hashedPassword,
            "user_type"=>"partenaire"
        ]);
        $partner=Partner::create([
            "name_partner"=>$request->name_partner,
            "categorie_partner"=>$request->categorie_partner,
            "adresse_partner"=>$request->adresse_partner,
            "region_partner"=>$request->region_partner,
            "ville_partner"=>$request->ville_partner,
            "pays_partner"=>$request->pays_partner,
            "web_site_partner"=>$request->web_site_partner,
            "tel_standard_partner"=>$request->tel_standard_partner,
            "likedin_partner"=>$request->likedin_partner,
            "source_partner"=>$request->source_partner,
            "contact_partner_id"=>json_encode($request->contact),
            'user_id'=>$account->id
        ]);
        }
        else{
            $partner=Partner::create([
                "name_partner"=>$request->name_partner,
                "categorie_partner"=>$request->categorie_partner,
                "adresse_partner"=>$request->adresse_partner,
                "region_partner"=>$request->region_partner,
                "ville_partner"=>$request->ville_partner,
                "pays_partner"=>$request->pays_partner,
                "web_site_partner"=>$request->web_site_partner,
                "tel_standard_partner"=>$request->tel_standard_partner,
                "likedin_partner"=>$request->likedin_partner,
                "source_partner"=>$request->source_partner,
                "contact_partner_id"=>json_encode($request->contact),
            ]);
        }
       
     
        $ipAddress = $request->ip();
        $activity = new Activity();
        $activity->log_name = Auth::user()->name;
        $activity->description = "Ouverture page création partenaire";
        $activity->subject_type = 'Création effectuée';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\Partner\PartnerController';
        $activity->event = 'Création effectuée';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        return Inertia::render("Partner/Index",[
            "partenaires" => Partner::all(),
            "success"=>"Le partenaire a été créé avec succès."
        ]);
    }
     /**
     * edit
     *
     * @return Response
     */
    public function edit(Request $request,$id)
    {

        $ipAddress = $request->ip();
        $activity = new Activity();
        $activity->log_name = Auth::user()->name;
        $activity->description = "Ouverture page modification partenaire";
        $activity->subject_type = 'Modification';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\Partner\PartnerController';
        $activity->event = 'Modification';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        return Inertia::render("Partner/Update",[
           "partner"=>Partner::find($id),
           "categories" => Type_categorie_partner::all(),
            "sources"=>Source::all(),
            "pays"=>Pays::all(),
            "contact"=>Partner_contact::all()
        ]);
    }
    /**
     * update
     *
     * @return Response
     */
    public function update(Request $request,$id)
    {
        $request->validate([
            "name_partner"=>['required', 'regex:/^[^\d]*$/','max:50'],
            "categorie_partner"=>['required'],
            "adresse_partner"=>['required'],
            "region_partner"=>['required', 'regex:/^[^\d]*$/','max:50'],
            "ville_partner"=>['required', 'regex:/^[^\d]*$/','max:50'],
            "pays_partner"=>['required'],
            "web_site_partner"=>['required', /*'regex:/^https?:\/\/(www\.)?[\w.-]+\.[a-z]{2,}\/?$/'*/'max:50'],
            "tel_standard_partner"=>['required', 'regex:/^0[1-9]\d{8}$/'],
            "likedin_partner"=>['required', /*'regex:/^https?:\/\/(www\.)?linkedin\.com\/company\/[\w-]+\/?$/'*/'max:200'],
            "source_partner"=>['required'],
            "contact"=>['required']
        ],
        [
            "*.required"=>"Ce champ est obligatoire*",
            "*.regex"=>"Le format est incorrect*",
            "*.max"=>"La taille de cet élément est trop longue*"
        ]
    );
        DB::table('partners')->where('id',$id)->update([
            "name_partner"=>$request->name_partner,
            "categorie_partner"=>$request->categorie_partner,
            "adresse_partner"=>$request->adresse_partner,
            "region_partner"=>$request->region_partner,
            "ville_partner"=>$request->ville_partner,
            "pays_partner"=>$request->pays_partner,
            "web_site_partner"=>$request->web_site_partner,
            "tel_standard_partner"=>$request->tel_standard_partner,
            "likedin_partner"=>$request->likedin_partner,
            "source_partner"=>$request->source_partner,
            "contact_partner_id"=>json_encode($request->contact),
        ]);
        $ipAddress = $request->ip();
        $activity = new Activity();
        $activity->log_name = Auth::user()->name;
        $activity->description = "Ouverture page modification partenaire";
        $activity->subject_type = 'Modification effectuée';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\Partner\PartnerController';
        $activity->event = 'Modification effectuée';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        return Inertia::render("Partner/Index",[
            "partenaires" => Partner::all(),
            "success"=>"Le partenaire a été modifiéé avec succès."
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
        DB::table('partners')->where('id',$id)->delete();
        $ipAddress = $request->ip();
        $activity = new Activity();
        $activity->log_name = Auth::user()->name;
        $activity->description = "Supression partenaire";
        $activity->subject_type = 'Suppression';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\Partner\PartnerController';
        $activity->event = 'Suppression';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        return Inertia::render("Partner/Index",[
            "partenaires" => Partner::all(),
            "success"=>"Le partenaire a été suppriméé avec succès."
        ]);
    }

}
