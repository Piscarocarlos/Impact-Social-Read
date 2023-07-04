<?php

use Illuminate\Support\Facades\Route;

Route::get('test-helper', function() {
    // return
    // dd(get_setting('candidature'));
    if (get_setting('candidature') == "true") {
        echo "J'active le module candidature";
    } else {
        echo "Je désactive le module candidature";
    }
});
