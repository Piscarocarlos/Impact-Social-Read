<?php

namespace App\Http\Controllers\Pays;

use App\Models\Pays;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PaysController extends Controller
{
    public function index(){
        return Inertia::render("Pays/Index",[
            "pays" => Pays::all()
        ]);
    }
    /**
     * index
     *
     * @return Response
     */
    public function create() : Response
    {
        return Inertia::render("Pays/Create");
    }
      
    
   
}
