import { redirect } from 'next/navigation';
import Api from '../../../api/http-api';
import Table from '../../../models/table';
import TableAppBar from './components/appbar';
import Image from 'next/image';
import styles from './table.module.css';


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
            <TableAppBar
                title={table.restaurant.name}
            />
            <div className={styles.mainContainer}>
                <div className={styles.imageBox}>
                    <Image
                        src={table.restaurant.image}
                        sizes="(max-width: 768px) 100vw, 33vw"
                        fill
                        alt={`Imagem de ${table.restaurant.name}`}
                    />
                </div>

                <div className={styles.descriptionBox}>
                    <p>
                        {table.restaurant.description}
                    </p>
                </div>
            </div>
        </>
    );
}