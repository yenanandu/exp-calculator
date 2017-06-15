import Ember from 'ember';

export default Ember.Component.extend({
  init(){
    this._super(...arguments);
    iteration : false;
    //this.set('userExpData.checkFlag',true);
  },
  expDataList :[],
  endDateList :[],
  companyNameCheck : false,
  companyNameNotEmpty : Ember.computed.notEmpty('userExpData.companyName'),
  companyNameisValid: Ember.computed.match('userExpData.companyName', /^[a-zA-Z ]*$/ ),
  companyNameValidStatus: Ember.computed.and('companyNameNotEmpty','companyNameisValid'),
  companyNameErrMsg:'not valid name',

  startDateFieldCheck : false,
  //startDateFieldPreviousCheck : Ember.computed.equal('userExpData.checkFlag',true),
  startDateFieldPreviousCheck : true,
  startDateFieldisValid : Ember.computed.match('userExpData.startDate', /^(0?[1-9]|[12][0-9]|3[01])$/ ),
  startMonthFieldisValid : Ember.computed.match('userExpData.startMonth', /^0[1-9]|1[0-2]$/ ),
  startYearFieldisValid : Ember.computed.match('userExpData.startYear', /^(19|20)\d{2}$/ ),
  fullstartDateFieldisValid : Ember.computed.and('startDateFieldisValid','startMonthFieldisValid','startYearFieldisValid','startDateFieldPreviousCheck'),
  startDateFieldErrMsg : 'not a valid date',

  endDateFieldCheck : false,
  endDateFieldPreviousCheck : true,
  endDateFieldisValid : Ember.computed.match('userExpData.endDate', /^(0?[1-9]|[12][0-9]|3[01])$/ ),
  endMonthFieldisValid : Ember.computed.match('userExpData.endMonth', /^0[1-9]|1[0-2]$/ ),
  endYearFieldisValid : Ember.computed.match('userExpData.endYear', /^(19|20)\d{2}$/ ),
  fullendDateFieldisValid : Ember.computed.and('endDateFieldisValid','endMonthFieldisValid','endYearFieldisValid','endDateFieldPreviousCheck'),
  endDateFieldErrMsg : 'not a valid date',

  formButtonCheck : Ember.computed.and('companyNameValidStatus','fullstartDateFieldisValid','fullendDateFieldisValid'),

  fullstartdate : Ember.computed('userExpData.startDate','userExpData.startMonth','userExpData.startYear', function(){
    return this.get('userExpData.startDate')+"/"+this.get('userExpData.startMonth')+"/"+this.get('userExpData.startYear');
  }),
  fullenddate : Ember.computed('userExpData.endDate','userExpData.endMonth','userExpData.endYear', function(){
    return this.get('userExpData.endDate')+"/"+this.get('userExpData.endMonth')+"/"+this.get('userExpData.endYear');
  }),

  //notEmptyEndDateList : Ember.computed.notEmpty(this.get('endDateList')),
  duration: Ember.computed('fullstartdate', 'fullenddate', function() {
    var date1 = new Date(this.get('fullstartdate'));
    var date2 = new Date(this.get('fullenddate'));
    var month = ((date2.getFullYear() * 12 + date2.getMonth()) - (date1.getFullYear() * 12 + date1.getMonth()));
    return Math.floor(month/12)+" Years "+month %12+" month";
  }),

  actions: {

        calculate: function (user) {
            //console.log(this.get('userExpData.startDate'));

            let tempData = {"companyNameData":this.get('userExpData.companyName'),
            "startDateData":this.get('fullstartdate'),
            "endDateData":this.get('fullenddate'),
            "duration":this.get('duration')
            //"recodeStatus":
          };
          if(this.get('formButtonCheck')){
            this.get('expDataList').pushObject(tempData);
            this.get('expDataList').pushObject(this.get('fullenddate'));
            this.send('formReset', user);
          }

        },
        previousDateCheck : function(){
          let tempdate, checkDate, resultValue;
          tempdate = new Date(this.get('fullstartdate'));
          tempdate.setHours(0,0,0,0);
          console.log("tempdate :"+tempdate+" expDataList"+this.get('expDataList').length);
          if(this.get('expDataList').length >0){
            this.get('expDataList').forEach(function (list) {
              console.log("list Date value"+list);
              checkDate = new Date(list);
              checkDate.setHours(0,0,0,0);
              if(checkDate < tempdate){
                checkDate='';
                resultValue=false;
              }else{
                checkDate='';
                resultValue=true;
              }
            });
            return result;
          }
          else{
            return true;
          }
        },
        focusOutCompanyName : function(){
            this.set('companyNameCheck',true);
        },
        focusOutStartDate : function(){
            this.set('startDateFieldCheck',true);
          /*  if(this.send('previousDateCheck')){
              this.set('userExpData.checkFlag',true);
            }
            else{
              this.set('userExpData.checkFlag',false);
            }*/

        },
        focusOutEndDate : function(){
          this.set('endDateFieldCheck',true);
        },
        formReset : function(user){
          this.set('companyNameCheck',false);
          this.set('startDateFieldCheck',false);
          this.set('endDateFieldCheck',false);
          //this.set('startDateFieldPreviousCheck',false);
          this.set('userExpData.companyName','');
          this.set('userExpData.startDate','');
          this.set('userExpData.startMonth','');
          this.set('userExpData.startYear','');
          this.set('userExpData.endDate','');
          this.set('userExpData.endMonth','');
          this.set('userExpData.endYear','');

        }

    }

});
