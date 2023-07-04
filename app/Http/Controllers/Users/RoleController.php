<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class RoleController extends Controller
{

    public function index(){
        return Inertia::render("Roles/Index", [
            "roles" => Role::all()
        ]);
    }


    /**
     * index
     *
     * @return Response
     */
    public function create() : Response
    {
        $permissions = Permission::all(['name', 'section'])->groupBy('section');
        return Inertia::render("Roles/Create", [
            "permissions" => $this->convert_object_to_array($permissions)
        ]);
    }

    protected function convert_object_to_array($object)
    {
        $content = [];
        foreach ($object as $key => $item) {
            array_push($content, $item);
        } 
        return $content; 
    }
    
    /**
     * store
     *
     * @param  mixed $request
     * @return void
     */
    public function store(Request $request)
    {
        $role = Role::create(['name' => $request->name]);
        $role->givePermissionTo($request->permissions);
        return redirect()->route('dashboard.roles.index')->with('success', "Le rôle a été créé avec succès");
    }

    public function savePermission(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'parent' => 'required'
        ]);

        $permission = Permission::create(['name' => $request->name, 'section'=> $request->parent]);
        return redirect()->back()->with('success', "La permission a été créée avec succès");
    }
}
