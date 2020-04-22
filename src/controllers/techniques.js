
var model = require('../models/techniquesModel');

const requiredFields = ['name', 'tatic_id', 'description', 'source']

function search(){
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

function newEntry(data){
    return new Promise((resolve, reject) =>{
        model.create(data).then(res => {
            resolve(res);
        }).catch(err => {
            console.log(`error adding new technique: ${err};`);
            reject(err);
        })
    });
}

module.exports = {search,newEntry};