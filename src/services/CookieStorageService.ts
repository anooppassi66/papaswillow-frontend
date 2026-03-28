import Cookies from 'js-cookie';

export default class CookieStorageService {
    /**
     *
     * @param key
     * @returns
     */
    public static async getItem(key: string): Promise<string | null | undefined> {
        return Cookies.get(key);
    }

    /**
     *
     * @param key
     * @returns
     */
    public static getItemByKey(key: string) {
        return Cookies.get(key);
    }

    /**
     *
     * @param key
     * @param value
     */
    public static async setItem(name: string, value: string, expireTime: any): Promise<void> {
        Cookies.set(name, value, { expires: expireTime });
    }

    /**
     *
     * @param key
     */
    public static deleteCookieData(key: string): void {
        return Cookies.remove(key);
    }
}
