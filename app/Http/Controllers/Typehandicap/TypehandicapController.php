<?php

namespace App\Http\Controllers\Typehandicap;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Models\Type_handicap;
use App\Models\Type_convention;
use App\Models\Type_beneficiare;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class TypehandicapController extends Controller
{
    public function index(){
        return Inertia::render("Typehandicap/Index",[
            "handicap" => Type_handicap::all(),
        ]);
    }
    /**
     * index
     *
     * @return Response
     */
    public function create() : Response
    {
        return Inertia::render("Typehandicap/Create",[
           
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
            'type_handicap'=>['required', 'regex:/^[^\d]*$/','max:50','unique:type_handicaps'],
        ]);
        $handicap=Type_handicap::create([
            'type_handicap'=>$request->type_handicap
        ]);
        return redirect()->route('dashboard.type-handicap.index')->with('success', "Le type d'handicap a été créé avec succès");
    }
     /**
     * edit
     *
     * @return Response
     */
    public function edit($id)
    {
        return Inertia::render("Typehandicap/Update",[
            'handicap'=>Type_handicap::find($id)
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
            'type_handicap'=>['required', 'regex:/^[^\d]*$/','max:50'],
        ]);
       DB::table('type_handicaps')->where('id',$id)->update([
            'type_handicap'=>$request->type_handicap
        ]);
        return redirect()->route('dashboard.type-handicap.index')->with('success', "Le type d'handicap a été modifiéé avec succès");
    }
    /**
     * show
     *
     * @param  mixed $request
     * @return void
     */
    public function show($id)
    {
        DB::table('type_handicaps')->where('id',$id)->delete();
        return redirect()->route('dashboard.type-handicap.index')->with('success', "Le type d'handicap a été suppriméé avec succès");
    }
}
