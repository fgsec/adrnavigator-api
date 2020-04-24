
var model = require('../models/taticsModel');

const search = () => {
    return new Promise((resolve, reject) => {
        model.findAll({
            where: {}
        }).then(res => {
            resolve(res);
        }).catch(err => {            
            console.log(`error searching tatics: ${err};`);
            reject(err);
        })
    });
}

const newEntry = (data) => {
    return new Promise((resolve, reject) =>{
        model.create(data).then(res => {
            resolve(res);
        }).catch(err => {
            console.log(`error adding new tatics: ${err};`);
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
            console.log(`error returning ID for tatic: ${err};`);
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

module.exports = {search,newEntry,getById,updateEntry};