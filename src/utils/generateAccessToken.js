import Cookies from 'js-cookie'
import Crypto from 'crypto-js'

const cryptoSecretKey = "pWnmj4AcVt"

export default async function generateAccessToken() {
    if (Cookies.get('neon-pack-api-token')) {
        return Crypto.AES.decrypt(Cookies.get('neon-pack-api-token'), cryptoSecretKey).toString(Crypto.enc.Utf8)
    } else {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/pack`, {
                method: 'POST',
                mode: 'cors'
            });
            const { token } = await response.json();

            Cookies.set('neon-pack-api-token', Crypto.AES.encrypt(token, cryptoSecretKey).toString(), { expires: new Date(new Date().getTime() + 4 * 60 * 60 * 1000) });
            return token
        } catch (error) {
            console.log(error)
        }
    }
}