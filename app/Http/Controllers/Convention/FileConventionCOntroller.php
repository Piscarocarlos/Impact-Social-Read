<?php

namespace App\Http\Controllers\Convention;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Dompdf\Dompdf;

class FileConventionCOntroller extends Controller
{
    public function file($id){
       $dompdf = new Dompdf();

        // Ajoutez du contenu au PDF
        $dompdf->loadHtml('<h1>Convention</h1>
            <h5>Model en cours de l\'intégration</h5>
        ');

        // Rendre le HTML en PDF
        $dompdf->render();

        // Générez le PDF et envoyez-le en tant que réponse
        $dompdf->stream('convention.pdf');
    }
}
