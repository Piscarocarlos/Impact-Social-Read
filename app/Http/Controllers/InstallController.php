<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class InstallController extends Controller
{    
    /**
     * step0
     *
     * @return void
     */
    public function step0(): Response
    {
        return Inertia::render('Installation/Step0');
    }
    
    /**
     * step1
     *
     * @return Response
     */
    public function step1(): Response
    {
        $permission['php_version']            = number_format((float)phpversion(), 2, '.', '');
        $permission['curl_enabled']           = function_exists('curl_version');
        $permission['db_file_write_perm']     = is_writable(base_path('.env'));
        $permission['routes_file_write_perm'] = is_writable(base_path('app/Providers/RouteServiceProvider.php'));
        return Inertia::render('Installation/Step1', ['permission' => $permission]);
    }
    
    /**
     * step2
     *
     * @return Response
     */
    public function step2(): Response
    {
        return Inertia::render('Installation/Step2');
    }
    
      
    /**
     * step3
     *
     * @return Response
     */
    public function step3(): Response
    {
        return Inertia::render('Installation/Step3');
    }
       
    /**
     * writeEnvironmentFile
     *
     * @param  string $type
     * @param  mixed $val
     * @return void
     */
    public function writeEnvironmentFile(string $type, mixed $val) {
        $path = base_path('.env');
        if (file_exists($path)) {
            $val = '"'.trim($val).'"';
            file_put_contents($path, str_replace(
                $type.'="'.env($type).'"', $type.'='.$val, file_get_contents($path)
            ));
        }
    }
}
