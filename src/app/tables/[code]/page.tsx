import { redirect } from 'next/navigation';
import Api from '../../../api/http-api';
import Table from '../../../models/table';


export default async function TablePage({ params }: { params: { code: string } }) {
    const response = await Api.getTableBycode(params.code);

    if (!response.success) {
        redirect('/');
    }

    const table: Table = Table.parseJson(response.data);

    if (table.restaurant == null) {
        redirect('/');
    }

    return (
        <>
            <h1>{table.restaurant!.name}</h1>
        </>
    );
}