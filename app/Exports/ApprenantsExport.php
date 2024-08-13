<?php

namespace App\Exports;

use App\Models\Horaire;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class ApprenantsExport implements FromCollection, WithHeadings
{
    public function collection()
    {
        return Horaire::select('nom', 'prenom', 'discipline', 'jour', 'heure_arrive', 'heure_depart')->get();
    }

    public function headings(): array
    {
        return [
            'Nom',
            'Prénom',
            'Discipline',
            'Jour',
            'Heure d\'arrivée',
            'Heure de départ',
        ];
    }
}