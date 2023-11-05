export default class Api {
    public static url: string = 'https://smartmenu.nntech.online';

    public static async get(path: string): Promise<any> {
        if (path[0] != '/') {
            path = '/' + path;
        }

        console.log('making get request to: ' + this.url + '/api' + path);

        const res = await fetch(this.url + '/api' + path, {
            cache: 'no-store',
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