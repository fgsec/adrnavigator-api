
var model = require('../models/testsModel');

const search = () => {
    return new Promise((resolve, reject) => {
        model.findAll({
            where: { }
        }).then(res => {
            resolve(res);
        }).catch(err => {            
            console.log(`error searching tests: ${err};`);
            reject(err);
        })
    });
}

const newEntry = (data) => {
    return new Promise((resolve, reject) =>{
        model.create(data).then(res => {
            resolve(res);
        }).catch(err => {
            console.log(`error adding new test: ${err};`);
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
            console.log(`error searching test: ${err};`);
            reject(err);
        })
    });
}

const getByTechnique = (id) => {
    return new Promise((resolve, reject) => {
        model.findAll({
            where: {
                technique_id:id
            }, order: [['execution_date', 'DESC']]
        }).then(res => {
            resolve(res);
        }).catch(err => {            
            console.log(`error searching test: ${err};`);
            reject(err);
        })
    });
}

const getMostRecentByTechnique = (id) => {
    return new Promise((resolve, reject) => {
        model.findOne({
            where: {
                technique_id:id
            }, order: [['execution_date', 'DESC']]
        }).then(res => {
            resolve(res);
        }).catch(err => {            
            console.log(`error searching test: ${err};`);
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

module.exports = {search,newEntry,getById,updateEntry,getByTechnique,getMostRecentByTechnique};