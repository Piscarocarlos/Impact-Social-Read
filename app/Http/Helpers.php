<?php


use App\Models\Setting;
use Illuminate\Support\Facades\Cache;


/**
 * Get setting value by key
 * @param string $key
 * @param null $default
 * @return mixed
 */


 if(!function_exists('get_setting')) {
    function get_setting($key, $default = null, $lang = false) {

        $settings_table = Setting::all();
        if($lang == false) {
            $setting = $settings_table->where('type', $key)->first();
        } else {
            $setting = $settings_table->where('type', $key)->where('lang', $lang)->first();
            $setting = !$setting ? $settings_table->where('type', $key)->first() : $setting;
        }
        // return $setting;
        return $setting == null ? $default : $setting->value;
    }
 }

function format_price($price,  $curent_symbol, $isMinimize = false)
{
    $fomated_price = $price;
    $price = round((float) $price, 2);
    // Minimize the price
    if ($isMinimize) {
        $temp = number_format($price / 1000000000, 2, ".", "");

        if ($temp >= 1) {
            $fomated_price = $temp . "B";
        } else {
            $temp = number_format($price / 1000000, 2, ".", "");
            if ($temp >= 1) {
                $fomated_price = $temp . "M";
            }
        }
    } else {
        $fomated_price = number_format($price, 2, ".", " ");
    }
    // return $fomated_price;
    // $fomated_price = $fomated_price;

    return $fomated_price . ' ' .  $curent_symbol;
}



