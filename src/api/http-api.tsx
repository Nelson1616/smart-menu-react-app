export default class Api {
    private static addr: string = 'https://smartmenu.nntech.online/api';

    public static async get(path: string): Promise<any> {
        if (path[0] != '/') {
            path = '/' + path;
        }

        const res = await fetch(this.addr + path, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
            },
        });

        if (!res.ok) {
            throw new Error('Erro ao se comunicar com a API');
        }

        return res.json();
    }

    public static async getTableBycode(code : string) {
        try {
            const response = await this.get(`tables/${code}`);
            
            return response;
        } catch (e) {
            console.log((e as Error).message);
        }
    }
}