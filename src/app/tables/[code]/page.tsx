'use client';

import { redirect } from 'next/navigation';
import Api from '../../../api/http-api';
import Table from '../../../models/table';
import TableAppBar from './components/appbar';
import Image from 'next/image';
import styles from './table.module.css';
import { useEffect, useState } from 'react';
import Loading from '../../loading';
import { socket } from '../../../api/sokcet';
import SessionUser from '../../../models/sessionUser';


export default function TablePage({ params }: { params: { code: string } }) {
    const tableCode = params.code;
    const [table, setTable] = useState<Table | null>(null);
    const [counter, setCounter] = useState(0);

    const [sessionUsers, setSessionUsers] = useState<SessionUser[]>([]);

    useEffect(() => {
        Api.getTableBycode(tableCode).then((response) => {
            if (!response.success) {
                redirect('/');
            }

            const tableUpdated: Table = Table.parseJson(response.data);

            if (tableUpdated.restaurant == null) {
                redirect('/');
            }

            setTable(tableUpdated);
        }).catch(error => {
            console.log(error);
            redirect('/');
        });

        if (socket.disconnected) {
            socket.io.opts.query = {
                'table_code': tableCode,
            };

            socket.connect();
        }

        function onUsers(data: any) {
            console.log('socket onUsers');

            if (data.sessionUsers) {
                if (data.sessionUsers && Array.isArray(data.sessionUsers)) {
                    let newSessionUsers: SessionUser[] = [];
                    data.sessionUsers.forEach((sessionUser: any) => {
                        newSessionUsers.push(SessionUser.parseJson(sessionUser));
                    });

                    setSessionUsers(newSessionUsers);
                }
            }
        }

        socket.on('users', onUsers);

        return () => {
            console.log('going out of table page');

            socket.disconnect();
        };
    }, [tableCode]);

    return (
        <>
            <TableAppBar
                title={table ? table.restaurant!.name : 'Loading'}
            />

            {
                table ?
                    <div className={styles.mainContainer}>
                        <div className={styles.imageBox}>
                            <Image
                                src={table.restaurant!.image}
                                sizes="(max-width: 768px) 100vw, 33vw"
                                fill
                                priority={true}
                                alt={`Imagem de ${table.restaurant!.name}`}
                            />
                        </div>

                        <div className={styles.descriptionBox}>
                            <p>
                                {table.restaurant!.description}
                            </p>
                        </div>

                        <div className={styles.tableNumber}>
                            Mesa {table!.number}
                        </div>

                        <div className={styles.sessionUserGroupContainter}>
                            {sessionUsers.map((sessionUser, index) => {
                                return (
                                    <div key={index} className={styles.sessionUserContainter}>
                                        <div className={styles.sessionUserItemContainter}>
                                            <Image
                                                className={styles.sessionUserImage}
                                                src={'/images/avatar_' + sessionUser.user!.imageId + '.png'}
                                                width={40}
                                                height={40}
                                                priority={false}
                                                alt={`Imagem de perfil de ${sessionUser.user!.name}`}
                                            />
                                            <span className={styles.sessionUserName}>{sessionUser.user!.name}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div>
                            {table.restaurant?.products.map((product, index) => {
                                return (
                                    <div key={index} className={styles.productContainter}>
                                        <Image
                                            className={styles.productImage}
                                            src={product.image}
                                            width={160}
                                            height={160}
                                            priority={false}
                                            alt={`Imagem de produto ${product.name}`}
                                        />
                                        <div>
                                            <p className={styles.productTitle}>{product.name}</p>

                                            <p>{product.description}</p>

                                            <p className={styles.productPrice}>R$ {product.price / 100}</p>
                                        </div>

                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    :
                    <Loading></Loading>
            }

            <button onClick={() => setCounter(counter + 1)}>click {counter}</button>
        </>
    );
}