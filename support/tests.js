var expect = require("chai").expect;
/**
 * Verifica o status da resposta
 * @param {number} status valor numerico referente ao status desperado da requisicao
 */
checkStatus = (status) => {
    (pm.test)(`Should return status ${status}`, () => {
        pm.response.to.have.status(status);
    })
};
/**
 * Checa se parametro retornou com o tamanho esperado
 * @param {string} param nome do parametro
 * @param {number} length tamanho esperado do parametro
 */
paramHasLength = (paramName, param,length) => {
    (pm.test)(`Length of ${paramName} should be ${length}`, () =>{
        expect(param).to.have.lengthOf(length);
    })
}
/**
  * Checa se o valor de um campo eh o esperado. Se o caminho informado retorna uma lista, checa se veio preenchida. 
  * @param {Object} infos objeto que contem as informacoes esperadas (nome_do_parametro: {path,expect} // path: caminho na resposta, expect: valor esperado)
 */
checkReturnValues = (infos) => {
    Object.entries(infos).forEach(
        ([k, v]) => {
            name = typeof v['reduceTo'] !== 'undefined' ?
                v['reduceTo'] : v['expect'];
            (pm.test)(`[ ${k} ] should return [ ${name} ]`, () => {
                try{
                    isArray = name.includes("array");
                } catch (e) {
                    isArray = false;
                }
                if(isArray){
                    pm.expect(v['path'].length).to.be.above(0);
                } else {
                    pm.expect((v['path'])).to.eql(v['expect']);
                }
            })
        });
}
/**
  * Verifica se o tipo dos parametros da resposta sao conforme esperado
  * @param {Object} infos objeto que contem as informacoes esperadas (nome_do_parametro: {path,expect} // path: caminho na resposta, expect: tipo da variavel)
*/
checkType = (infos) => {
    Object.entries(infos).forEach(
        ([k, v]) => {
            (pm.test)(`Type of [ ${k} ] should be [ ${v['expect']} ]`, () => {
                pm.expect(typeof v['path']).to.eql(v['expect']);
            })
        }
    )
}
/**
  * Valida contrato de resposta a partir de schema 
  * @param {string} schemaInfo nome da variavel (de ambiente ou local) que contem o schema 
  * @param {json} response resposta da requisicao em json 
*/
contractValidation = (schemaInfo, response) => {
    if(pm.environment.get(schemaInfo) === undefined){
        schema = schemaInfo;
    }
    else{
        schema = JSON.parse(pm.environment.get(schemaInfo));
    }
    var Ajv = require('ajv'),
        ajv = new Ajv({
            logger: console,
            meta: false
        }),
        schema;
    (pm.test)('Contract validation', () => {
        pm.expect(ajv.validate(schema, response), JSON.stringify(ajv.errors)).to.be.true;
    });
}