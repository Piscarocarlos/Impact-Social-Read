<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class checkUserBanned
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if(auth()->check() && (auth()->user()->banned!==0)){
            Auth::logout();
            $request->session()->invalidate();

            // $request->session()->regenerateToken();

            return redirect()->route('login');
            // ->with('error', 'Vous Avez été suspendu.');

        }
        return $next($request);
    }
}
