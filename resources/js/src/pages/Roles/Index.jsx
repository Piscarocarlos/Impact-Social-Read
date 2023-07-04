import React from 'react'
import DefaultLayout from '../../components/Layouts/DefaultLayout'
import { DataTable } from 'mantine-datatable'
import { Link } from '@inertiajs/inertia-react'

export default function Index({roles}) {
  return (
    <DefaultLayout>
      <div className="panel">
        <div className="flex justify-between">
          <h3 className="text-xl font-bold">Liste des roles</h3>
          <Link href={route('dashboard.roles.create')} className="btn btn-success">Créer un rôle</Link>
        </div>
        <DataTable
          columns={[
            { accessor: 'name', title: "Nom du rôle" },
            { accessor: 'created_at', title: "Date de création" }
          ]}
          records={roles}
        />
      </div>
    </DefaultLayout>
  )
}
