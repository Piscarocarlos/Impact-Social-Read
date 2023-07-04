<?php

namespace App\Http\Controllers\Homecandidate;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Section_one_home_candidate;
use App\Models\Section_three_home_candidate;
use App\Models\Section_two_home_candidate;

class HomecandidateController extends Controller
{
    public function index(){
        return Inertia::render('Homecandidate/Index',[
        ]);
    }

    public function home(){
        return Inertia::render('Homecandidate/Home',[
            "section1"=>Section_one_home_candidate::where('status',true)->first(),
            "section2"=>Section_two_home_candidate::where('status',true)->first(),
            "section3"=>Section_three_home_candidate::where('status',true)->take(6)->get(),
        ]);
    }
}
