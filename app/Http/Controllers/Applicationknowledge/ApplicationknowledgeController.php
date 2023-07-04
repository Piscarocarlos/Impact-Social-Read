<?php

namespace App\Http\Controllers\Applicationknowledge;

use Inertia\Inertia;
use Inertia\Response;
use Inertia\Controller;
use App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Information__pluse;
use Illuminate\Support\Facades\DB;

class ApplicationknowledgeController extends Controller
{
    public function index(){
        return Inertia::render("Applicationknowledge/Index",[
            "informations" =>Information__pluse::all()
        ]);
    }
    /**
     * index
     *
     * @return Response
     */
    public function create() : Response
    {
        return Inertia::render("Applicationknowledge/Create");
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
            'name_information' =>  ['required', 'regex:/^[^\d]*$/','max:255','unique:information__pluses'],
        ]);
        $information=Information__pluse::create(["name_information"=>$request->name_information]);
        return redirect()->route('dashboard.connaissance-application.index')->with('success', "Le type de renseignement a été créé avec succès");
    }
      /**
     * edit
     *
     * @return Response
     */
    public function edit($id)
    {
        $info=Information__pluse::find($id);
        if($info->status==true){
            DB::table('information__pluses')->where('id',$id)->update([
                "status"=>false
              ]);
              return redirect()->route('dashboard.connaissance-application.index')->with('success', "Le statut de cette information a été modifiée avec succès");
        }
        else{
            DB::table('information__pluses')->where('id',$id)->update([
                "status"=>true
              ]);
              return redirect()->route('dashboard.connaissance-application.index')->with('success', "Le statut de cette information a été modifiée avec succès");
        }
    }
}
