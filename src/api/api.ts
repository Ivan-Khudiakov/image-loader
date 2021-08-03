import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://api.giphy.com/v1/gifs/',
    params: {
        api_key: 'bRGENH8XjYsaKfboBXySbgmPFRge0135',
    },
})

export const GiphiAPI = {
    getImage(tag: string) {
        return instance.get(`random?tag=${tag}`)
    },
}
