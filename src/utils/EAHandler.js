const fs = require('fs');
const tatics_controller = require('../controllers/tatics');
const techniques_controller = require('../controllers/tatics');

const uploadToDB = async () => new Promise((resolve, reject) => {
    
    try {

        const techniques = new Array();
        const tatics = {};

        fs.readFile(__dirname + "/../data/enterprise-attack.json", (err, data) => {

            if (err)
                reject(err);
            
            eafile = JSON.parse(data).objects;

            // Iterate over all entries and stores only techniques and tatics

            eafile.forEach(obj => {
                if (obj.type === "attack-pattern") {
                    let tatics_temp_array = new Array();
                    obj.kill_chain_phases.forEach(item => { tatics_temp_array.push(item.phase_name); });
                    technique = {
                        name: obj.name,
                        mid: obj.external_references[0].external_id,
                        source: obj.external_references[0].source_name,
                        description: obj.description,
                        plataform: (obj.x_mitre_platforms).join(";"),
                        tatic_temp: tatics_temp_array.join(";")
                    };
                    techniques.push(technique);
                }
                else if (obj.type === "x-mitre-tactic") {
                    tatic = {
                        name: obj.name,
                        description: obj.description,
                        short_name: obj.x_mitre_shortname,
                    };
                    tatics[obj.name] = tatic;
                }
            });

            // Persist information on database

            id_value = 1
            let tatics_db = new Array();
            
            for (var obj in tatics) {
                obj_tatic = tatics[obj]
                tatics_controller.newEntry({ name: obj_tatic.name, description: obj_tatic.description }).then(data => {
                    console.log(`New tatic on DB: ${obj_tatic.name} `)
                    tatics_db.push({ id: id_value, name: obj_tatic.name });
                    id_value++
                }).catch(err => {
                    console.log(`Error adding tatic on DB: ${obj_tatic.name} `)
                })
            }
        

            techniques.forEach(obj => {
                technique_tatics = obj.tatic_temp.split(";")
               // console.log(technique_tatics)
                /*

                techniques_controller.newEntry({
                    "name": obj.name,
                    "mid": obj.mid,
                    "source": obj.source,
                    "description": obj.description,
                    "plataform": obj.plataform,
                    "tatic_id": 2
                }).then(data => {
                    console.log(`New technique on DB: ${obj.name} `)
                    tatics_db.push({ id: id_value, name: obj.name });
                    id_value++
                }).catch(err => {
                    console.log(`Error adding technique on DB: ${tatics_data.name} `)
                })

                */
                
            })

            console.log(tatics_db)

            resolve("ok");
        });


    } catch (err) {
        console.log(err);
        reject(err);
    }
})

module.exports = {uploadToDB};