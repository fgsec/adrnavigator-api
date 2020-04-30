const fs = require('fs');
const tatics_controller = require('../controllers/tatics');
const techniques_controller = require('../controllers/techniques');
const techniqueTatics_controller = require('../controllers/techniqueTatics');


const getEAFile = () => new Promise( async (resolve, reject) => {
    fs.readFile(__dirname + "/../data/enterprise-attack.json", (err, data) => {
        if (err) 
            reject(err);
        if (data) {
            eafile = JSON.parse(data).objects;
            resolve(eafile)
        }
    });
})

const uploadToDB = () => new Promise( async (resolve, reject) => {
    try {
        const techniques = new Array();
        const tatics = {};

        let eafile = await getEAFile().then(data => {
            return data
        }).catch(err => {
            console.log("Error reading JSON file for MITRE")
            reject(err)
        })
        
        // Iterate over all entries and stores only techniques and tatics
        console.log(eafile)
        eafile.forEach(obj => {
            if (obj.type === "attack-pattern") {
                let tatics_temp_array = new Array();
                obj.kill_chain_phases.forEach(item => { tatics_temp_array.push(item.phase_name); });
                technique = {
                    name: obj.name,
                    mid: obj.external_references[0].external_id,
                    source: obj.external_references[0].source_name,
                    description: obj.description,
                    plataform: (obj.x_mitre_platforms).join(", "),
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
        const tatics_db = {};
        // Construct object with ID of created Tatics - this is used later to create the relationship between techniques and tatics
        for (var obj in tatics) {
            obj_tatic = tatics[obj]
            tatics_db[obj_tatic.short_name] = await tatics_controller.newEntry({ name: obj_tatic.name, description: obj_tatic.description }).then(data => {
                return data.id;
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
                // Iterate over specific tatics of technique and insert row for relationship
                for (var technique_tatic in technique_tatics) {
                    tatic_entry_id = tatics_db[technique_tatics[technique_tatic]]
                    console.log(tatics_db[technique_tatics[technique_tatic]].id)
                    technique_entry_id = data.id
                    techniqueTatics_controller.newEntry({ technique_id: technique_entry_id, tatic_id: tatic_entry_id }).then(data => {
                        console.log(`created relantionship between tatic_id ${tatic_entry_id} and technique_id ${technique_entry_id} `)
                    }).catch(err => {
                        console.log(`Error creating relationship`)
                    })
                }
            }).catch(err => {
                console.log(`Error adding technique on DB: ${tatics_data.name} `)
            })
            
        })

        resolve("Att&ck JSON exported to DB without errors!");
    
    } catch (err) {
        console.log(err);
        reject(err);
    }
})

module.exports = {uploadToDB};