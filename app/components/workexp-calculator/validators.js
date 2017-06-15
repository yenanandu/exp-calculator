import { validator, buildValidations } from 'ember-cp-validations';
import DS from 'ember-data';


const { attr } = DS;

export const validation = buildValidations({
//  companyName: validator('presence', true),
  companyName: [
    validator('presence', true),
    validator('length', {
      max: 2,
      message: 'Please tell us your business name.'
    })
  ]
});

export default DS.Model.extend(validation, {
  companyName: attr('string')
});
