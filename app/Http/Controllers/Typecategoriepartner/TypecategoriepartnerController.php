<?php

namespace App\Http\Controllers\Typecategoriepartner;

use Inertia\Inertia;
use Inertia\Response;
use App\Models\Type_partner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\Type_categorie_partner;
use Spatie\Activitylog\Models\Activity;

class TypecategoriepartnerController extends Controller
{
    public function index(Request $request){
        $ipAddress = $request->ip();
        $activity = new Activity();
        $activity->log_name = Auth::user()->name;
        $activity->description = "Ouverture page catégorie partenaire";
        $activity->subject_type = 'Lecture des données';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\Typecatégoriepartner\TypecatégoriepartnerController';
        $activity->event = 'Lecture des données';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        return Inertia::render("Typecategoriepartner/Index",[
            "categories" =>Type_categorie_partner::all(),
            "typePartenaire"=>Type_partner::all(),
        ]);
        /*"categories" =>DB::table('type_categorie_partners')
            ->join('type_partners', 'type_categorie_partners.type_partner_id', '=', 'type_partners.id')
            ->get()*/
    }
    /**
     * index
     *
     * @return Response
     */
    public function create(Request $request) : Response
    {
        $ipAddress = $request->ip();
        $activity = new Activity();
        $activity->log_name = Auth::user()->name;
        $activity->description = "Ouverture page création catégorie partenaire";
        $activity->subject_type = 'Création';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\Typecatégoriepartner\TypecatégoriepartnerController';
        $activity->event = 'Création';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        return Inertia::render("Typecategoriepartner/Create",[
            "type_partenaires" =>Type_partner::all()
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
        //dd('ok');
        $request->validate([
            'name_categorie' => ['required', 'regex:/^[^\d]*$/','max:50','unique:type_categorie_partners'],
            'type_partner'=>"required"
        ],
        [
            "*.required"=>"Ce champ est obligatoire*",
            "name_categorie.regex"=>"Format incorrect*",
            "name_categorie.unique"=>"Cette catégorie existe déjà dans la base de données*",
            "name_categorie.max"=>"La taille de ce champ est trop longue*"
        ]
    );
    $ipAddress = $request->ip();
    $activity = new Activity();
    $activity->log_name = Auth::user()->name;
    $activity->description = "Ouverture page création catégorie partenaire";
    $activity->subject_type = 'Sauvegarde effectuée';
    $activity->subject_id = 1;
    $activity->causer_type = 'App\Controller\Typecatégoriepartner\TypecatégoriepartnerController';
    $activity->event = 'Sauvegarde effectuée';
    $activity->causer_id = Auth::user()->id ;
    $activity->properties = ['ip' =>  $ipAddress];
    $activity->save();
        $categorie=Type_categorie_partner::create(['name_categorie'=>$request->name_categorie,'type_partner_id'=>$request->type_partner]);
        return Inertia::render("Typecategoriepartner/Index",[
            "categories" =>Type_categorie_partner::all(),
            "typePartenaire"=>Type_partner::all(),
            "success"=>"L'élément a été créé avec succès."
        ]);
    }
    /**
     * edit
     *
     * @return Response
     */
    public function edit(Request $request,$id)
    {
        $convention=Type_categorie_partner::find($id);
        $ipAddress = $request->ip();
        $activity = new Activity();
        $activity->log_name = Auth::user()->name;
        $activity->description = "Modification  catégorie partenaire";
        $activity->subject_type = 'Modification statut catégorie partenaire';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\Typecatégoriepartner\TypecatégoriepartnerController';
        $activity->event = 'Modification statut catégorie partenaire';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        if($convention->status==true){
            DB::table('type_categorie_partners')->where('id',$id)->update([
                "status"=>false
              ]); 
              return Inertia::render("Typecategoriepartner/Index",[
            "categories" =>Type_categorie_partner::all(),
            "typePartenaire"=>Type_partner::all(),
            "success"=>"Le statut a  été changé  avec succès."
        ]);
        }
        else{
            DB::table('type_categorie_partners')->where('id',$id)->update([
                "status"=>true
              ]); 
              return Inertia::render("Typecategoriepartner/Index",[
            "categories" =>Type_categorie_partner::all(),
            "typePartenaire"=>Type_partner::all(),
            "success"=>"Le statut a  été changé  avec succès."
        ]);
        }
    }
     /**
     * show
     *
     * @return Response
     */
    public function show(Request $request,$id){
        $ipAddress = $request->ip();
        $activity = new Activity();
        $activity->log_name = Auth::user()->name;
        $activity->description = "Modification  catégorie partenaire";
        $activity->subject_type = 'Modification catégorie partenaire';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\Typecatégoriepartner\TypecatégoriepartnerController';
        $activity->event = 'Modification catégorie partenaire';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
       
        return Inertia::render("Typecategoriepartner/Update",[
            "categorie"=>Type_categorie_partner::find($id),
            "type_partenaires" =>Type_partner::all()
        ]);
    }
     //SAVE A NEW FORM UPDATE
     /**
     * update
     *
     * @param  mixed $request
     * @return void
     */
    public function update(Request $request,$id){
       
        $request->validate([
            'name_categorie' => ['required', 'regex:/^[^\d]*$/','max:50'],
            'type_partner'=>"required"
        ],
        [
            "*.required"=>"Ce champ est obligatoire*",
            "name_categorie.regex"=>"Format incorrect*",
            "name_categorie.max"=>"La taille de ce champ est trop longue*"
        ]
    );
    $ipAddress = $request->ip();
        $activity = new Activity();
        $activity->log_name = Auth::user()->name;
        $activity->description = "Modification  catégorie partenaire";
        $activity->subject_type = 'Modification catégorie partenaire effectuée';
        $activity->subject_id = 1;
        $activity->causer_type = 'App\Controller\Typecatégoriepartner\TypecatégoriepartnerController';
        $activity->event = 'Modification catégorie partenaire effectuée';
        $activity->causer_id = Auth::user()->id ;
        $activity->properties = ['ip' =>  $ipAddress];
        $activity->save();
        DB::table('type_categorie_partners')->where('id',$id)->update([
            'name_categorie'=>$request->name_categorie,
            'type_partner_id'=>$request->type_partner
        ]);
        return Inertia::render("Typecategoriepartner/Index",[
            "categories" =>Type_categorie_partner::all(),
            "typePartenaire"=>Type_partner::all(),
            "success"=>"L'élément a été modifiéé avec succès."
        ]);
    }
}
