<?php

// Install

use App\Http\Controllers\InstallController;
use Illuminate\Support\Facades\Route;


Route::get('/', [InstallController::class, 'step0'])->name('install.step0');
Route::get('/step1', [InstallController::class, 'step1'])->name('install.step1');
Route::get('/step2', [InstallController::class, 'step2'])->name('install.step2');
Route::get('/step3', [InstallController::class, 'step3'])->name('install.step3');