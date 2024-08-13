<?php

namespace App\Http\Controllers;

use App\Exports\ApprenantsExport;
use Maatwebsite\Excel\Facades\Excel;

class ExportController extends Controller
{
    public function export()
    {
        return Excel::download(new ApprenantsExport, 'apprenants.xlsx');
    }
}