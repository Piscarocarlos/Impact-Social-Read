<?php

namespace App\Http\Controllers\Sector;

use Inertia\Inertia;
use Inertia\Response;
use App\Models\Filiere_bac;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class SectorController extends Controller
{
    public function index(){
        return Inertia::render("Sector/Index",[
            "filiere" => Filiere_bac::all()
        ]);
    }
    /**
     * index
     *
     * @return Response
     */
    public function create() : Response
    {
        return Inertia::render("Sector/Create");
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
            'name_filiere' =>  ['required', 'regex:/^[^\d]*$/','max:50','unique:filiere_bacs'],
        ]);
        $filiere=Filiere_bac::create([
            'name_filiere'=>$request->name_filiere
        ]);
        return redirect()->route('dashboard.filiere-bac.index')->with('success', "La province a été créée avec succès");
    }
      /**
     * edit
     *
     * @return Response
     */
    public function edit($id)
    {
        $filiere=Filiere_bac::find($id);
        if($filiere->status==true){
            DB::table('filiere_bacs')->where('id',$id)->update([
                "status"=>false
              ]);
              return redirect()->route('dashboard.filiere-bac.index')->with('success', "Le statut de la filière du bac a été modifiée avec succès");
        }
        else{
            DB::table('filiere_bacs')->where('id',$id)->update([
                "status"=>true
              ]);
              return redirect()->route('dashboard.filiere-bac.index')->with('success', "Le statut de la filière du bac a été modifiée avec succès");
        }
    }
}
