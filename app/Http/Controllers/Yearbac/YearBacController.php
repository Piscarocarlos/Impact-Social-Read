<?php

namespace App\Http\Controllers\Yearbac;

use Inertia\Inertia;
use Inertia\Response;
use App\Models\Annee_bac;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
class YearBacController extends Controller
{
    public function index(){
        return Inertia::render("Yearbac/Index",[
            "year" => Annee_bac::all()
        ]);
    }
     /**
     * index
     *
     * @return Response
     */
    public function create() : Response
    {
        return Inertia::render("Yearbac/Create");
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
            'year_bac' => 'required|regex:/^\d{4}$/|unique:annee_bacs',
        ]);
       $year=Annee_bac::create(["year_bac"=>$request->year_bac]);
       return redirect()->route('dashboard.annees-bac.index')->with('success', "La province a été créée avec succès");
    }
       /**
     * edit
     *
     * @return Response
     */
    public function edit($id)
    {
        $year=Annee_bac::find($id);
        if($year->status==true){
            DB::table('annee_bacs')->where('id',$id)->update([
                "status"=>false
              ]); 
              return redirect()->route('dashboard.annees-bac.index')->with('success', "Le statut de l'année du bac a été modifié avec succès");
        }
        else{
            DB::table('annee_bacs')->where('id',$id)->update([
                "status"=>true
              ]); 
              return redirect()->route('dashboard.annees-bac.index')->with('success', "Le statut de l'année a été modifié avec succès");
        }
    }
}
