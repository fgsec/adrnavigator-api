
var model = require('../models/testsModel');

function search(){
    return new Promise((resolve, reject) => {
        model.findAll({
            where: {}
        }).then(res => {
            resolve(res);
        }).catch(err => {            
            console.log(`error searching tests: ${err};`);
            reject(err);
        })
    });
}

function newEntry(data){
    return new Promise((resolve, reject) =>{
        model.create(data).then(res => {
            resolve(res);
        }).catch(err => {
            console.log(`error adding new test: ${err};`);
            reject(err);
        })
    });
}

function getById(id){
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

function getByTechnique(id){
    return new Promise((resolve, reject) => {
        model.findAll({
            where: {
                technique_id:id
            }
        }).then(res => {
            resolve(res);
        }).catch(err => {            
            console.log(`error searching test: ${err};`);
            reject(err);
        })
    });
}

function updateEntry(id,data){
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

module.exports = {search,newEntry,getById,updateEntry,getByTechnique};