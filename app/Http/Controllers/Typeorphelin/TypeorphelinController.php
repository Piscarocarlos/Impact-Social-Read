<?php

namespace App\Http\Controllers\Typeorphelin;

use Inertia\Inertia;
use Inertia\Response;
use App\Models\Orphelinat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class TypeorphelinController extends Controller
{
    public function index(){
        return Inertia::render("Typeorphelin/Index",[
            "orphelin" => Orphelinat::all()
        ]);
        
    }
    /**
     * index
     *
     * @return Response
     */
    public function create() : Response
    {
        return Inertia::render("Typeorphelin/Create");
    }
      /**
     * store
     *
     * @param  mixed $request
     * @return void
     */
    public function store(Request $request)
    {
        $request->validate([
            'name_type' => ['required', 'regex:/^[^\d]*$/','max:50','unique:orphelinats'],
        ]);
        $oprphelin=Orphelinat::create(["name_type"=>$request->name_type]);
        return redirect()->route('dashboard.type-orphelin.index')->with('success', "La province a été créée avec succès");
    }
      /**
     * edit
     *
     * @return Response
     */
    public function edit($id)
    {
        $oprphelin=Orphelinat::find($id);
        if($oprphelin->status==true){
            DB::table('orphelinats')->where('id',$id)->update([
                "status"=>false
              ]); 
              return redirect()->route('dashboard.type-orphelin.index')->with('success', "Le statut du type d'orphelin a été modifié avec succès");
        }
        else{
            DB::table('orphelinats')->where('id',$id)->update([
                "status"=>true
              ]); 
              return redirect()->route('dashboard.type-orphelin.index')->with('success', "Le statut du type d'orphelin a été modifié avec succès");
        }
    }
}
