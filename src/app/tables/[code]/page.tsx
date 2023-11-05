'use client';

import { useRouter } from 'next/navigation';
import Api from '../../../api/http-api';
import Table from '../../../models/table';
import TableAppBar from './components/appbar';
import Image from 'next/image';
import styles from './table.module.css';
import { useEffect, useState } from 'react';
import Loading from '../../loading';
import { socket } from '../../../api/sokcet';
import SessionUser from '../../../models/sessionUser';
import ImageSelector from './components/imageSelector';
import NameTextField from './components/nameTextField';
import { Button } from '@mui/material';
import { setCookie } from '../../../utils/cookie';


export default function TablePage({ params }: { params: { code: string } }) {
    const router = useRouter();

    const tableCode = params.code;
    const [table, setTable] = useState<Table | null>(null);
    const [counter, setCounter] = useState(0);
    const [profileImageSelected, setProfileImageSelected] = useState('1');
    const [profileName, setProfileName] = useState('');

    const [sessionUsers, setSessionUsers] = useState<SessionUser[]>([]);

    function onImageSelected(value: string) {
        console.log('image id selected: ' + value);
        setProfileImageSelected(value);
    }

    function onNameChanged(value: string) {
        console.log('name changed to: ' + value);
        setProfileName(value);
    }

    function enterTable() {
        Api.enterTableBycode(params.code, profileName, Number(profileImageSelected)).then((response) => {
            if (!response.success) {
                router.push('/');
            }

            if (!(response.data.sessionUser)) {
                router.push('/');
            }

            const sessionUser : SessionUser = SessionUser.parseJson(response.data.sessionUser);

            setCookie('sessionUserId', `${sessionUser.id}`, 30);

            console.log('cookies', document.cookie);

            console.log('sessionUser', sessionUser);

            router.push('/session');

        }).catch(error => {
            console.log(error);
            router.push('/');
        });
    }

    useEffect(() => {
        Api.getTableBycode(tableCode).then((response) => {
            if (!response.success) {
                router.push('/');
            }

            const tableUpdated: Table = Table.parseJson(response.data);

            if (tableUpdated.restaurant == null) {
                router.push('/');
            }

            setTable(tableUpdated);
        }).catch(error => {
            console.log(error);
            router.push('/');
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
                    <>
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

                            <div className={styles.productGroupContainer}>
                                {table.restaurant?.products.map((product, index) => {
                                    return (
                                        <div key={index} className={styles.productContainter}>
                                            <Image
                                                className={styles.productImage}
                                                src={product.image}
                                                width={160}
                                                height={160}
                                                style={{ aspectRatio: 1 }}
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

                        <div className={styles.profileSelectorMainContainer}>
                            <div className={styles.profileTitle}>Perfil</div>

                            <div className={styles.profileImageContainer}>
                                <div className={styles.profileImageSelection}>
                                    <Image
                                        src={'/images/avatar_' + profileImageSelected + '.png'}
                                        sizes="(max-width: 300px) vw, 33vw"
                                        fill
                                        priority={false}
                                        alt={'Sua imagem de perfil'}
                                    />
                                </div>
                            </div>

                            <div className={styles.profileImageContainer}>
                                <ImageSelector
                                    handleChange={onImageSelected}
                                ></ImageSelector>
                            </div>

                            <div className={styles.profileNameTitle}>
                                Nome
                            </div>

                            <NameTextField handleChange={onNameChanged} />

                            <div className={styles.enterButtonContainer}>
                                <Button
                                    variant="contained"
                                    sx={[{
                                        '&:hover': {
                                            backgroundColor: 'white',
                                        },
                                    }, {
                                        borderRadius: 50,
                                        backgroundColor: '#FBEBEB',
                                        color: '#ED2939',
                                        fontSize: '20px',
                                        width: 300,
                                        padding: '25px'
                                    }]}
                                    onClick={enterTable}
                                >ENTRAR</Button>
                            </div>
                        </div>
                    </>
                    :
                    <Loading></Loading>
            }
        </>
    );
}