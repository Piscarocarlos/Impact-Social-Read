<?php

namespace App\Http\Controllers\Percentagehandicap;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Percentage_handicap;
use App\Http\Controllers\Controller;

class PercentagehandiController extends Controller
{
    public function index(){
        return Inertia::render("Percentagehandicap/Index",[
            "pourcentage" => Percentage_handicap::all(),
        ]);
    }
    /**
     * index
     *
     * @return Response
     */
    public function create() : Response
    {
        return Inertia::render("Percentagehandicap/Create",[
           
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
        $request->validate([
            'pourcentage'=>['required', 'regex:/^\d+(\.\d+)?%$/','unique:percentage_handicaps'],
        ]);
        $pourcentage=Percentage_handicap::create([
            'pourcentage'=>$request->pourcentage
        ]);
        return redirect()->route('dashboard.pourcentage-handicap.index')->with('success', "Le pourcentage  d'handicap a été créé avec succès");
    }
     /**
     * edit
     *
     * @return Response
     */
    public function edit($id)
    {
        return Inertia::render("Percentagehandicap/Update",[
            'pourcentage'=>Percentage_handicap::find($id)
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
            'pourcentage'=>['required', 'regex:/^\d+(\.\d+)?%$/'],
        ]);
       DB::table('percentage_handicaps')->where('id',$id)->update([
            'pourcentage'=>$request->pourcentage
        ]);
        return redirect()->route('dashboard.pourcentage-handicap.index')->with('success', "Le pourcentage  d'handicap a été modifiéé avec succès");
    }
    /**
     * show
     *
     * @param  mixed $request
     * @return void
     */
    public function show($id)
    {
        DB::table('percentage_handicaps')->where('id',$id)->delete();
        return redirect()->route('dashboard.pourcentage-handicap.index')->with('success', "Le pourcentage  d'handicap a été suppriméé avec succès");
    }
}
