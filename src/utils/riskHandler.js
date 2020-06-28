
const tatics_controller = require('../controllers/tatics');
const techniques_controller = require('../controllers/techniques');
const techniqueTatics_controller = require('../controllers/techniqueTatics');
const tests_controller = require('../controllers/tests');

const getOverallRiskByTechnique = async (technique_id) => {

    return new Promise( async (resolve,reject) => {

        try {

            var technique = await techniques_controller.getById(technique_id)
            var variations = await techniques_controller.getVariationsById(technique_id)
            var ownrisk = await getRiskByTechnique(technique_id)

            var result_risk_calculator = new Array()
            result_risk_calculator.push(ownrisk.result)

            if(variations.length >= 1) {

                for(key_v in variations) {
                    variation_id = variations[key_v].id
                    result_for_variation = await getRiskByTechnique(variation_id)
                    result_risk_calculator.push( result_for_variation.result )
                }

                // calculate risks

                final_risk = 0
                for(key_r in result_risk_calculator) {
                    if(result_risk_calculator[key_r] == 1 || result_risk_calculator[key_r] == 3)
                        final_risk += 1
                }

                result_sum = 0
                if(result_risk_calculator.length === final_risk)
                    result_sum = 1
                
                if(final_risk > 0 && result_sum == 0)
                    result_sum = 4

                resolve({"result" : result_sum, why: `(${result_risk_calculator.length} != ${final_risk})`})

            } else {
                // Return calculation of only its tests
                getRiskByTechnique(technique_id).then(data => resolve(data))
            }

        } catch (err) { reject(err) }
        

    })

}

const getRiskByTechnique = (technique_id) => {

    return new Promise( async (resolve,reject) => {

        tests_controller.getByTechnique(technique_id).then(tests => {

            try {
                status_result = 3
            
                if(tests.length > 1) {
                    
                    recent_test = tests[0].result
                    older_test = tests[1].result

                    /*
                        1 = OK (Green)
                        0 = NOK (RED)
                        2 = ATENTION (ORANGE)
                    */

                    if(recent_test === 1 && older_test === 0 || recent_test === 1 && older_test === 1 ) {
                        status_result = 1
                    } else if(recent_test === 0 && older_test === 0) {
                        status_result = 0
                    } else if(recent_test === 0 && older_test === 1) {
                        status_result = 2
                    } 

                } else {
                    if(tests[0])
                        status_result = tests[0].result
                }
                
                resolve({ "result" : status_result })

            } catch (err) { console.log(err); reject(err) }
            
        }).catch(err => { console.log(err); reject(err) })
    
    })
    

}

module.exports = {getOverallRiskByTechnique,getRiskByTechnique};