'use client';

import { useRouter } from 'next/navigation';
import { getCookie } from '../../utils/cookie';
import { useEffect } from 'react';

export default function SessionPage() {
    const router = useRouter();

    useEffect(() => {
        if (getCookie('sessionUserId') == '') {
            router.push('/');
        }
    });

    return <h1>Sessão</h1>;
}