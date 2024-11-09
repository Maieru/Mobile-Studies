import axios from 'axios';

class ApiService {
    constructor(baseURL) {
        global.Buffer = require('buffer').Buffer;

        this.baseURL = baseURL;
        console.log('baseURL: ' + this.baseURL);

        this.axiousService = axios.create({
            baseURL: this.baseURL
        });

        this.debug = false;
    }

    async get(url) {
        return await this.axiousService.get(url).catch(error => {
            this.trataErro(error);
            return error
        });
    }

    async post(url, data) {
        return await this.axiousService.post(url, data).catch(error => { this.trataErro(error) });
    }

    async delete(url) {
        return await this.axiousService.delete(url).catch(error => { this.trataErro(error) });
    }

    async put(url, data) {
        return await this.axiousService.put(url, data).catch(error => { this.trataErro(error) });
    }

    trataErro(erro) {
        var mensagemErro = ''
        mensagemErro += erro.toString();

        if (erro.response)
            mensagemErro += ' - ' + JSON.stringify(erro.response.data);

        if (this.debug && erro.request)
            mensagemErro += ' ---- Detalhes da Requisição ---- ' + JSON.stringify(erro.request);

        console.log(mensagemErro);
    }
}

const apiClient = new ApiService('http://192.168.0.6:3000');

export default apiClient;