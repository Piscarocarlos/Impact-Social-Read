<?php

namespace App\Http\Controllers\Regions;
use Inertia\Inertia;

use Inertia\Response;
use App\Models\Region;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;



class RegionController extends Controller
{
    public function index(){
        return Inertia::render("Region/Index",[
            "regions" => Region::all()
        ]);
    }
    /**
     * index
     *
     * @return Response
     */
    public function create() : Response
    {
        return Inertia::render("Region/Create");
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
            'name' => ['required', 'regex:/^[^\d]*$/','max:50'],
        ]);
        $region=Region::create(['name_region'=>$request->name]);
        return redirect()->route('dashboard.regions.index')->with('success', "La région a été créée avec succès");
    }
    
      /**
     * edit
     *
     * @return Response
     */
    public function edit($id)
    {
        $regions=Region::find($id);
        if($regions->status==true){
            DB::table('regions')->where('id',$id)->update([
                "status"=>false
              ]); 
              return redirect()->route('dashboard.regions.index')->with('success', "Le statut de la région a été modifiée avec succès");
        }
        else{
            DB::table('regions')->where('id',$id)->update([
                "status"=>true
              ]); 
              return redirect()->route('dashboard.regions.index')->with('success', "Le statut de la région a été modifiée avec succès");
        }
    }
}
