
var model = require('../models/techniquesModel');
var model_tt = require('../models/techniqueTaticsModel');

const search = () => {
    return new Promise((resolve, reject) => {
        model.findAll({
            where: {}
        }).then(res => {
            resolve(res);
        }).catch(err => {            
            console.log(`error searching techniques: ${err};`);
            reject(err);
        })
    });
}

const newEntry = (data) => {
    return new Promise((resolve, reject) =>{

        model.create(data).then(res => {
            resolve(res);
        }).catch(err => {
            console.log(`error adding new technique: ${err};`);
            reject(err);
        })

    });

}

const getById = (id) => {
    return new Promise((resolve, reject) => {
        model.findAll({
            where: {
                id:id
            }
        }).then(res => {
            resolve(res);
        }).catch(err => {            
            console.log(`error searching techniques: ${err};`);
            reject(err);
        })
    });
}

const getVariationsById = (id) => {
    return new Promise((resolve, reject) => {
        model.findAll({
            where: {
                variation_id:id
            }
        }).then(res => {
            resolve(res);
        }).catch(err => {            
            console.log(`error searching techniques: ${err};`);
            reject(err);
        })
    });
}

const updateEntry = (id,data) => {
    return new Promise((resolve, reject) => {
        delete data["id"]; // for some reason, sequileze is allowing the update of ID column
        model.update(data,{ where:{ id:id } }).then(res => {
            resolve(res);
        }).catch(err => {            
            console.log(`error updating ${err};`);
            reject(err);
        })
    
    });
}

module.exports = {search,newEntry,getById,getVariationsById,updateEntry};