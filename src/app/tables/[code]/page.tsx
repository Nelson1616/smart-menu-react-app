import { Metadata } from 'next';
import TableComponent from './table-component';

export const metadata: Metadata = {
    title: 'Entrar na mesa',
};

export default async function TablePage({ params }: { params: { code: string } }) {
    return (
        <>
            <h1>{params.code}</h1>
        
            <TableComponent code={params.code}></TableComponent>
        </>
    );
}