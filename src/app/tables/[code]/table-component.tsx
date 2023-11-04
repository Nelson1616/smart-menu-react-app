'use client';

import { useRouter } from 'next/navigation';
import Api from '../../../api/http-api';
import Table from '../../../models/table';

export default function TableComponent(props: any) {
    const code : string = props.code;
    console.log(code);
    const router = useRouter();

    function enterInSession() {
        router.push('/session');
    }

    async function get() {
        try {
            const response = await Api.get(`tables/${code}`);
            
            if (response.success) {
                const data = response.data;

                const table : Table = Table.parseJson(data);

                console.log(table);
            }
        } catch (e) {
            console.log((e as Error).message);
        }
    }

    get();

    return (
        <>
            <button type='button' onClick={() => enterInSession()}>
                Entrar
            </button>
        </>
    );
}