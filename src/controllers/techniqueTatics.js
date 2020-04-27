
var model = require('../models/techniqueTaticsModel');


const newEntry = (data) => {
    return new Promise((resolve, reject) =>{
        model.create(data).then(res => {
            resolve(res);
        }).catch(err => {
            console.log(`error adding new relationship between technique and tatic : ${err};`);
            reject(err);
        })
    });
}

const getByTaticId = (id) => {
    return new Promise((resolve, reject) => {
        model.findAll({
            where: {
                tatic_id:id
            }
        }).then(res => {
            resolve(res);
        }).catch(err => {            
            console.log(`error returning techniques for tatic: ${err};`);
            reject(err);
        })
    });
}

const getByTechniqueId = (id) => {
    return new Promise((resolve, reject) => {
        model.findAll({
            where: {
                technique_id:id
            }
        }).then(res => {
            resolve(res);
        }).catch(err => {            
            console.log(`error returning techniques for technique: ${err};`);
            reject(err);
        })
    });
}

const updateEntry = (id,data) => {
    return new Promise((resolve, reject) => {
        model.update(data,{ where:{ id:id } }).then(res => {
            resolve(res);
        }).catch(err => {            
            console.log(`error updating ${err};`);
            reject(err);
        })
    
    });
}

module.exports = {newEntry,getByTaticId,getByTechniqueId,updateEntry};