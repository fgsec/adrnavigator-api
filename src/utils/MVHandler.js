
const tatics_controller = require('../controllers/tatics');
const techniques_controller = require('../controllers/techniques');
const techniqueTatics_controller = require('../controllers/techniqueTatics');
const tests_controller = require('../controllers/tests');
const risk_handler = require('./riskHandler');

const exportView = () => {

    return Promise.all([techniques_controller.search(), tatics_controller.search()]).then( async values => {
        
        const result_set = new Array();

        techniques = values[0]
        tatics = values[1]

        const getLastTestForTechnique = async (technique) => {
            last_test = await tests_controller.getMostRecentByTechnique(technique.id)
            return { test: last_test , technique: technique}
        }

        const getTatics = async (technique_id,tatics) => {

            tatics_result = new Array()
            tatics_relationship = await techniqueTatics_controller.getByTechniqueId(technique_id)
            for(key_tr in tatics_relationship) {
                for(key_t in tatics) {
                    if(tatics[key_t].id === tatics_relationship[key_tr].tatic_id) {
                        tatics_result.push(tatics[key_t].name)
                    }
                }
            }
            return tatics_result
                
        }

        for(key in techniques) {
        
            technique_test = await getLastTestForTechnique(techniques[key])

            if(technique_test.test) {

                last_test_risk = await risk_handler.getOverallRiskByTechnique(technique_test.technique.id)

                let variation_id = 0
                if(!technique_test.technique.variation_id)
                    variation_id = technique_test.technique.id
                else
                    variation_id = technique_test.technique.variation_id

                technique_tatics = await getTatics(variation_id,tatics)
                
                technique_tatics_array = new Array()
                for(key_tt in technique_tatics) {
                    technique_tatics_array.push(technique_tatics[key_tt])
                }
                result = { 
                    technique: technique_test.technique,
                    test: technique_test.test,
                    tatics: technique_tatics_array,
                    risk: last_test_risk
                }
               
                result_set.push(result)
            }
                
        }

        return (result_set)

    });

}

const createJSONView = () => {

    return Promise.all([techniques_controller.search(), tatics_controller.search()]).then( async values => {
        
        const result_set = new Array();

        techniques = values[0]
        tatics = values[1]

        const getLastTestForTechnique = async (technique) => {
            const technique_tests = new Array()
            last_test = await tests_controller.getMostRecentByTechnique(technique.id)
            return { test: last_test , technique: technique}
        }

        const getTatics = async (technique_id,tatics) => {

            tatics_result = new Array()
            tatics_relationship = await techniqueTatics_controller.getByTechniqueId(technique_id)
            for(key_tr in tatics_relationship) {

                for(key_t in tatics) {
                    if(tatics[key_t].id === tatics_relationship[key_tr].tatic_id) {
                        tatics_result.push(tatics[key_t].name)
                    }
                }

            }
            return tatics_result
                
        }

        for(key in techniques) {
        
            technique_test = await getLastTestForTechnique(techniques[key])

            if(technique_test.test) {
                technique_tatics = await getTatics(technique_test.technique.id,tatics)
                last_test_risk = await risk_handler.getOverallRiskByTechnique(technique_test.technique.id)

                for(key_tt in technique_tatics) {

                    color = "#00FF00"
                    if(last_test_risk.result === 4)
                        color = "#FFA500"
                    if(last_test_risk.result === 0)
                        color = "#FF0000"

                    result = { 
                        "techniqueID": technique_test.technique.mid,
                        "tactic": (technique_tatics[key_tt]).replace(" ","-").toLowerCase(),
                        "color": color,
                        "comment": "",
                        "enabled": true,
                        "metadata": []
                    }
                    result_set.push(result)
                }
                
            }
                
        }

        return getJSONBase(result_set)

    });

}

const getJSONBase = (techniques) => {
    base = {
        "name": "layer",
        "version": "2.2",
        "domain": "mitre-enterprise",
        "description": "",
        "filters": {
            "stages": [
                "act"
            ],
            "platforms": [
                "Windows",
                "Linux",
                "macOS"
            ]
        },
        "sorting": 0,
        "viewMode": 0,
        "hideDisabled": false,
        "techniques": "ok",
        "gradient": {
            "colors": [
                "#ff6666",
                "#ffe766",
                "#8ec843"
            ],
            "minValue": 0,
            "maxValue": 100
        },
        "legendItems": [],
        "metadata": [],
        "showTacticRowBackground": false,
        "tacticRowBackground": "#dddddd",
        "selectTechniquesAcrossTactics": true
    };
    base.techniques = techniques;
    return base
}

const getTestsView = () => {

    return Promise.all([tests_controller.search()]).then( async values => {
        tests = values[0]
        for (test_key in tests) {
            console.log(tests[test_key].id)
        }
    })

}



module.exports = {createJSONView,exportView,getTestsView}