const fs = require('fs');


function uploadToDB(){
    return new Promise((resolve, reject) => {
        try {


            fs.readFile(__dirname + "/../data/enterprise-attack.json", (err, data) => {
                if (err) reject(err);

                let techniques = new Array()
                let tatics = new Array()

                eafile = JSON.parse(data).objects;
                eafile.forEach(obj => {

                    // Gather only techniques
                    if (obj.type === "attack-pattern") {

                        /*
                        "kill_chain_phases" is an array with two keys, this two lines are responsable for breaking 
                        the array and generating a list with only our desired value
                        */

                        tatics_temp_array = new Array()
                        obj.kill_chain_phases.forEach(item => {tatics_temp_array.push(item.phase_name)})

                        technique = {
                            name: obj.name,
                            mid: obj.external_references[0].external_id,
                            source: obj.external_references[0].source_name,
                            description: obj.description,
                            plataform: (obj.x_mitre_platforms).join(";"),
                            tatic_temp: tatics_temp_array.join(";")
                        };
                        techniques.push(technique)
                        console.log(technique)
                    } else if(obj.type === "x-mitre-tactic") {
                        tatic = {
                            name: obj.name,
                            description: obj.description
                        }
                        tatics.push(tatic)
                        console.log(tatic)
                    }
                        
                });

                resolve(techniques);
            });
            
            
          } catch (err) {
            console.log(err)
            reject(err)
          }

    });
}

module.exports = {uploadToDB};