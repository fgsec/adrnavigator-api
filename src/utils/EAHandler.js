const fs = require('fs');
const tatics_controller = require('../controllers/tatics');
const techniques_controller = require('../controllers/techniques');
const techniqueTatics_controller = require('../controllers/techniqueTatics');

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
                    tatics[obj.x_mitre_shortname] = tatic;
                }
            });

            // Persist information on database

            id_value = 1
            const tatics_db = {};
            
            for (var obj in tatics) {
            
                obj_tatic = tatics[obj]
                tatics_db[obj_tatic.short_name] = id_value;
                id_value++
                tatics_controller.newEntry({ name: obj_tatic.name, description: obj_tatic.description }).then(data => {
                    console.log(`New tatic on DB: ${obj_tatic.name} `)
                }).catch(err => {
                    console.log(`Error adding tatic on DB: ${obj_tatic.name} `)
                })
                
            }


            techniques.forEach(obj => {

                techniques_controller.newEntry({
                    "name": obj.name,
                    "mid": obj.mid,
                    "source": obj.source,
                    "description": obj.description,
                    "plataform": obj.plataform,
                    "tatic_id": 2
                }).then(data => {
                    console.log(`New technique on DB: ${obj.name} `)
                    technique_tatics = obj.tatic_temp.split(";")
                    for (var technique_tatic in technique_tatics) {
                        tatic_entry_id = tatics_db[technique_tatics[technique_tatic]]
                        technique_entry_id = data.id
                        techniqueTatics_controller.newEntry({ technique_id: technique_entry_id, tatic_id: tatic_entry_id }).then(data => {
                            console.log(`created relantionship between tatic_id ${tatic_entry_id} and technique_id ${technique_entry_id} `)
                        }).catch(err => {
                            console.log(`Error creating relationship:`)
                        })

                    }
                }).catch(err => {
                    console.log(`Error adding technique on DB: ${tatics_data.name} `)
                })
               
            
                
            })

            //console.log(tatics)

            resolve("ok");
        });


    } catch (err) {
        console.log(err);
        reject(err);
    }
})

module.exports = {uploadToDB};