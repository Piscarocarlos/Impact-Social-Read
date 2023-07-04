<?php

namespace App\Http\Controllers\Team;

use App\Models\Role;
use App\Models\Team;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Mail\NewTeamMemberMail;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class TeamController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $teams= Team::all();
        $roles= Role::all();
        return Inertia::render('Team/Index',[
            'role'=>$roles,
            "roles"=>$roles,
            "teams"=>$teams->map(function($team, $key){
                return [
                    'id'=>$team->id,
                    'user_id'=>$team->user->id,
                    'name'=>$team->user->name,
                    'email'=>$team->user->email,
                    'phone'=>$team->user->phoneNumber,
                    'role_id'=>$team->role_id,
                    'role'=>$team->role->name,
                    'created_at'=> $team->created_at->diffForHumans(),
                    'keys'=>$key+1,
                    'status'=>$team->status
                ];

            })
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name'=>'required',
            'email'=>'required|unique:users',
            'role_id'=>'required'
        ],[
            'name.required'=>'Ce champ est obligatoire',
            'email.required'=>'Ce champ est obligatoire',
            'role_id.required'=>'Ce champ est obligatoire',
        ]);

                $user = new User();
                $user->name = $request->name;
                $user->email = $request->email;
                $user->phoneNumber = $request->phoneNumber;
                $user->user_type = "team_member";
                $user->password = "Ip".rand(1000,9999);
                if ($user->save()) {
                    $team = new Team();
                    $team->user_id=$user->id;
                    $team->role_id = $request->role_id;
                    $team->save();
                    Mail::to($user->email)->send(new NewTeamMemberMail($user->name, $user->email, $user->password,$user->id));
                    $team->save();
                    return redirect()->route('dashboard.teams.index');
                }else{
                    return back();
                }

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $team=Team::findOrFail($id);
        $roles=Role::all();
        return Inertia::render("Team/Edit",[
            'team' => $team,
            'roles'=>$roles,
            'team_user'=>$team->user,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name'=>'required',
            'email'=>'required',
            'role_id'=>'required'
        ],[
            'name.required'=>'Ce champ est obligatoire',
            'email.required'=>'Ce champ est obligatoire',
            'role_id.required'=>'Ce champ est obligatoire',
        ]);
        $users = User::all();
        $user=User::findOrFail($id);


        foreach($users as $use) {
            if($request->email==$use->email) {
                if($user->email==$request->email){
                    $use->name= $request->name;
                    $use->phoneNumber=$request->phoneNumber;
                    $use->user_type = "team_member";
                    $use->password = "Ip1234";
                    if($use->save()){
                        $team=Team::where('user_id',$id)->first();
                        $team->role_id=$request->role_id;
                        $team->save();
                        if($team->save()){
                            return Inertia::render('Team/Index',[
                                'success'=>"hello boy"
                            ]);
                        // return redirect()->route('dashboard.teams.index')->with('success', 'helloboy');
                        }
                    }
                }else{
                    return back();
                }
            }else{

                $user->update([
                    'email'=>$request->email
                ]);
                $user->name= $request->name;
                $user->phoneNumber=$request->phoneNumber;
                if($user->save()){
                    $team=Team::where('user_id',$id)->first();
                    $team->role_id=$request->role_id;
                    $team->save();
                    if($team->save()){
                    return redirect()->route('dashboard.teams.index');
                    }
                }

            }
        }

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $team =Team::FindOrFail($id);
        if($team->user->banned!==0){
            $team->delete();
            auth::logout();
            session()->flush();
            return redirect()->route('login');

        }
    }
}
