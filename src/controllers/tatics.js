
var model = require('../models/taticsModel');


function search(){
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

function newEntry(data){
    return new Promise((resolve, reject) =>{
        model.create(data).then(res => {
            resolve(res);
        }).catch(err => {
            console.log(`error adding new tatics: ${err};`);
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
            console.log(`error returning ID for tatic: ${err};`);
            reject(err);
        })
    });
}

function updateEntry(id,data){
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