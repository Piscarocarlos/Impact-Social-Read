<?php

namespace App\Http\Controllers\configuration;

use Inertia\Inertia;
use App\Models\Setting;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Currency;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;

class ConfigurationController extends Controller
{
    public function indexActivation()
    {
        $settings = Setting::all();
        return Inertia::render("Configuration/Activation", [
            'settings' => $settings
        ]);
    }
    public function updateActivation(Request $request)
    {
        // dd($request->all());
        $candidate = Setting::where('type', 'candidature')->first();
        $maintenace = Setting::where('type', 'maintenance_mode')->first();
        $https = Setting::where('type', 'https')->first();
        $scoring = Setting::where('type', 'scoring')->first();
        $partenaire = Setting::where('type', 'partenaire')->first();
        $beneficiaire = Setting::where('type', 'beneficiaire')->first();
        $boursier = Setting::where('type', 'boursier')->first();
        $mail = Setting::where('type', 'mail_de_confirmation')->first();
        $operation = Setting::where('type', 'operation')->first();
        //   dd($maintenace->value,'hello',$request->input('dataHttps'));


        $https->update([
            'value' => $request->input('dataHttps'),
        ]);


        $maintenace->update([
            'value' => $request->input('dataMaintenance'),
        ]);
        $candidate->update([
            'value' => $request->input('dataCandidature'),
        ]);
        $boursier->update([
            'value' => $request->input('dataBoursier'),
        ]);
        $partenaire->update([
            'value' => $request->input('dataPartenaire'),
        ]);
        $scoring->update([
            'value' => $request->input('dataScoring'),
        ]);
        $beneficiaire->update([
            'value' => $request->input('dataBeneficiaire'),
        ]);
        $operation->update([
            'value' => $request->input('dataOperation'),
        ]);
        $mail->update([
            'value' => $request->input('dataMail'),
        ]);



        return redirect()->route('dashboard.activation.module.configuration');
    }



    //

    public function currencySetting()
    {
        $currencies =  currency::all();



        $defaultCurrency = Setting::whereIn('type', ['defaultCurrency', 'format', 'separator', 'decimalPlaces'])->get();


        //dd($defaultCurrency);



        return Inertia::render('Configuration/CurrencySetting', ["currency" => $currencies, "defaultCurrency" => $defaultCurrency]);
    }



    public function saveDefaultCurrency(Request $request)
    {


        $newCurrency = $request->only(["defaultCurrency"]);

        $existingRecords = DB::table('settings')
            ->whereIn('type', array_keys($newCurrency))
            ->get();

        foreach ($newCurrency as $type => $value) {
            $existingRecord = $existingRecords->firstWhere('type', $type);

            if ($existingRecord) {
                // Update existing record
                DB::table('settings')
                    ->where('type', $type)
                    ->update(['value' => $value]);
            } else {
                // Insert new record
                DB::table('settings')->insert([
                    'type' => $type,
                    'value' => $value,
                ]);
            }
        }
    }

    public function saveFormatSettings(Request $request)
    {

        $newCurrency = $request->only([
            "format",
            "separator",
            "decimalPlaces"
        ]);


        $existingRecords = DB::table('settings')
            ->whereIn('type', array_keys($newCurrency))
            ->get();

        foreach ($newCurrency as $type => $value) {
            $existingRecord = $existingRecords->firstWhere('type', $type);

            if ($existingRecord) {
                DB::table('settings')
                    ->where('type', $type)
                    ->update(['value' => $value]);
            } else {
                // Insert new record
                DB::table('settings')->insert([
                    'type' => $type,
                    'value' => $value,
                ]);
            }
        }


        return redirect()->route("dashboard.currency.setting");
    }

    public function saveCurrency(Request $request)
    {
        //$newCurrency = $request->all();
        //dd($newCurrency);
        $newCurrency = $request->only([
            "newCurrencyName",
            "newCurrencyCode",
            "newCurrencySymbol",
            "newCurrencyExchangeRate"
        ]);

        $keys = [
            "name",
            "code",
            "symbol",
            "exchange_rate"
        ];

        $newCurrency = array_combine($keys, $newCurrency);


        Currency::insert($newCurrency);
    }


    public function deleteCurrency($id)
    {
        $defCurrency = Setting::all();




        $deletedcurrency = Currency::findOrFail($id);
        $deletedcurrency->delete();
        return Redirect::back();
    }

    public function saveModifiedCurrency(Request $request)
    {
        $formData = $request->only([
            'id',
            'name',
            'code',
            'symbol',
            'exchange_rate',
        ]);

        $id = $formData['id'];
        $dataToUpdate = [
            'name' => $formData['name'],
            'code' => $formData['code'],
            'symbol' => $formData['symbol'],
            'exchange_rate' => $formData['exchange_rate'],
        ];

        $currency = Currency::find($id);

        foreach ($dataToUpdate as $key => $value) {
            $currency->$key = $value;
        }

        $currency->save();
    }








    /**
     * indexSocialMedia
     *
     * @return Response
     */

    public function indexSocialMedia()
    {
        return Inertia::render("Configuration/SocialMedia", [
            "id_client_google" => Setting::where('type', 'id_client_google')->first(),
            "cle_api_google" => Setting::where('type', 'cle_api_google')->first(),
            "id_client_facebook" => Setting::where('type', 'id_client_facebook')->first(),
            "cle_api_facebook" => Setting::where('type', 'cle_api_facebook')->first(),
            "api_key_twitter" => Setting::where('type', 'api_key_twitter')->first(),
            "api_secret_key_twitter" => Setting::where('type', 'api_secret_key_twitter')->first(),
            "access_token_twitter" => Setting::where('type', 'access_token_twitter')->first(),
            "access_token_secret_twitter" => Setting::where('type', 'access_token_secret_twitter')->first(),
        ]);
    }

    /**
     * saveGoogle
     *
     * @return Response
     */
    public function saveGoogle(Request $request)
    {
        $request->validate(
            [
                "id_client_google" => ['required'],
                "cle_api_google" => ['required'],
            ],
            [
                "*.required" => "Ce champ est obligatoire*",
            ]
        );

        $setting = Setting::where('type', 'id_client_google')->first();
        if ($setting) {
            $setting->type = "id_client_google";
            $setting->value = $request->id_client_google;
            $setting->lang = "fr";
            $setting->save();
        } else {
            $setting = new Setting();
            $setting->type = "id_client_google";
            $setting->value = $request->id_client_google;
            $setting->lang = "fr";
            $setting->save();
        }

        $setting = Setting::where('type', 'cle_api_google')->first();
        if ($setting) {
            $setting->type = "cle_api_google";
            $setting->value = $request->cle_api_google;
            $setting->lang = "fr";
            $setting->save();
        } else {
            $setting = new Setting();
            $setting->type = "cle_api_google";
            $setting->value = $request->cle_api_google;
            $setting->lang = "fr";
            $setting->save();
        }

        return redirect("/dashboard/configuration/social-media")->with("success", "Social media Google enregistré avec succès.");
    }

    /**
     * saveFacebook
     *
     * @return Response
     */
    public function saveFacebook(Request $request)
    {
        $request->validate(
            [
                "id_client_facebook" => ['required'],
                "cle_api_facebook" => ['required'],
            ],
            [
                "*.required" => "Ce champ est obligatoire*",
            ]
        );

        $setting = Setting::where('type', 'id_client_facebook')->first();
        if ($setting) {
            $setting->type = "id_client_facebook";
            $setting->value = $request->id_client_facebook;
            $setting->lang = "fr";
            $setting->save();
        } else {
            $setting = new Setting();
            $setting->type = "id_client_facebook";
            $setting->value = $request->id_client_facebook;
            $setting->lang = "fr";
            $setting->save();
        }

        $setting = Setting::where('type', 'cle_api_facebook')->first();
        if ($setting) {
            $setting->type = "cle_api_facebook";
            $setting->value = $request->cle_api_facebook;
            $setting->lang = "fr";
            $setting->save();
        } else {
            $setting = new Setting();
            $setting->type = "cle_api_facebook";
            $setting->value = $request->cle_api_facebook;
            $setting->lang = "fr";
            $setting->save();
        }

        return redirect("/dashboard/configuration/social-media")->with("success", "Social media Facebook enregistré avec succès.");
    }

    /**
     * saveTwitter
     *
     * @return Response
     */
    public function saveTwitter(Request $request)
    {
        $request->validate(
            [
                "api_key_twitter" => ['required'],
                "api_secret_key_twitter" => ['required'],
                "access_token_twitter" => ['required'],
                "access_token_secret_twitter" => ['required'],
            ],
            [
                "*.required" => "Ce champ est obligatoire*",
            ]
        );

        $setting = Setting::where('type', 'api_key_twitter')->first();
        if ($setting) {
            $setting->type = "api_key_twitter";
            $setting->value = $request->api_key_twitter;
            $setting->lang = "fr";
            $setting->save();
        } else {
            $setting = new Setting();
            $setting->type = "api_key_twitter";
            $setting->value = $request->api_key_twitter;
            $setting->lang = "fr";
            $setting->save();
        }

        $setting = Setting::where('type', 'api_secret_key_twitter')->first();
        if ($setting) {
            $setting->type = "api_secret_key_twitter";
            $setting->value = $request->api_secret_key_twitter;
            $setting->lang = "fr";
            $setting->save();
        } else {
            $setting = new Setting();
            $setting->type = "api_secret_key_twitter";
            $setting->value = $request->api_secret_key_twitter;
            $setting->lang = "fr";
            $setting->save();
        }

        $setting = Setting::where('type', 'access_token_twitter')->first();
        if ($setting) {
            $setting->type = "access_token_twitter";
            $setting->value = $request->access_token_twitter;
            $setting->lang = "fr";
            $setting->save();
        } else {
            $setting = new Setting();
            $setting->type = "access_token_twitter";
            $setting->value = $request->access_token_twitter;
            $setting->lang = "fr";
            $setting->save();
        }

        $setting = Setting::where('type', 'access_token_secret_twitter')->first();
        if ($setting) {
            $setting->type = "access_token_secret_twitter";
            $setting->value = $request->access_token_secret_twitter;
            $setting->lang = "fr";
            $setting->save();
        } else {
            $setting = new Setting();
            $setting->type = "access_token_secret_twitter";
            $setting->value = $request->access_token_secret_twitter;
            $setting->lang = "fr";
            $setting->save();
        }

        return redirect("/dashboard/configuration/social-media")->with("success", "Social media Twitter enregistré avec succès.");
    }
}
