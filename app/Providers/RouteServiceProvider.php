<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * The path to the "home" route for your application.
     *
     * Typically, users are redirected here after authentication.
     *
     * @var string
     */
    public const HOME = '/';

    /**
     * Define your route model bindings, pattern filters, and other route configuration.
     */
    public function boot(): void
    {
        $this->configureRateLimiting();

        $this->routes(function () {
            Route::middleware('api')
                ->prefix('api')
                ->group(base_path('routes/api.php'));

            // $this->installRoutes();
            $this->webRoutes();
            $this->carlosRoutes();
        });
    }


    /**
     * installRoutes
     *
     * @return void
     */
    protected function installRoutes()
    {
        Route::middleware('web')
        ->group(base_path('routes/install.php'));
    }

    /**
     * webRoutes
     *
     * @return void
     */
    protected function webRoutes()
    {
        Route::middleware('web')
        ->group(base_path('routes/web.php'));
    }

    /**
     * webRoutes
     *
     * @return void
     */
    protected function carlosRoutes()
    {
        Route::middleware('web')
        ->group(base_path('routes/carlos.php'));
    }

    /**
     * Configure the rate limiters for the application.
     */
    protected function configureRateLimiting(): void
    {
        RateLimiter::for('api', function (Request $request) {
            return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
        });
    }
}
