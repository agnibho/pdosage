/**********************************************************************
 * Title: PDosage
 * Description: Pediatric Calculator
 * Author: Agnibho Mondal
 * Website: http://code.agnibho.com
 **********************************************************************
   Copyright (c) 2016 Agnibho Mondal
   All rights reserved
 **********************************************************************
   This file is part of PDosage.
   
   PDosage is free software: you can redistribute it and/or modify
   it under the terms of the GNU General Public License as published by
   the Free Software Foundation, either version 3 of the License, or
   (at your option) any later version.
   
   PDosage is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   GNU General Public License for more details.
   
   You should have received a copy of the GNU General Public License
   along with PDosage. If not, see <http://www.gnu.org/licenses/>.
 **********************************************************************/

export default function Dosage(data){

    Object.defineProperty(data, "prop", {
	writable: false
    });

    this.get=function(){
	return data;
    }

    this.listDrugs=function(){
	var list=data.map(function(obj){
	    return obj.name;
	});
	return list;
    }

    this.getDrug=function(name, patient){
	if(this.listDrugs().indexOf(name)==-1){
	    return null;
	}
	var drug=JSON.parse(JSON.stringify(data.filter(extract)[0]));
	function extract(obj){
	    return (obj.name == name);
	}
	for(var i=0; i<drug.form.length; i++){
	    drug.form[i]=calculateDose(drug.form[i], patient);
	}
	return drug;
    }

    function calculateDose(form, patient){
	while(form.hasOwnProperty("range")){
	    var res=isolateRange(form, patient);
	    delete form.range;
	    if(res!=null){
		if(res.hasOwnProperty("range")){
		    form.range=res.range;
		}
		else{
		    form.dose=res.dose;
		}
	    }
	}
	if(form.dose){
	    form.dose=[].concat(form.dose);
	    for(var i=0; i<form.dose.length; i++){
		if(form.dose[i].hasOwnProperty("val")){
		    form.dose[i].val=[].concat(form.dose[i].val);
		}
		else if(form.dose[i].hasOwnProperty("perKg")){
		    form.dose[i].perKg=[].concat(form.dose[i].perKg);
		    form.dose[i].val=[];
		    form.dose[i].val[0]=Math.round(parseFloat(form.dose[i].perKg[0])*parseFloat(patient.wt)*100)/100;
		    form.dose[i].val[1]=Math.round(parseFloat(form.dose[i].perKg[1])*parseFloat(patient.wt)*100)/100;
		    form.dose[i]=setLimit(form.dose[i]);
		}
		else if(form.dose[i].hasOwnProperty("approx")){
		    form.dose[i].val=[];
		    form.dose[i].val=findApprox(form.dose[i].approx);
		    form.dose[i]=setLimit(form.dose[i]);
		}
		else if(form.dose[i].hasOwnProperty("eq")){
		    form.dose[i].eq=[].concat(form.dose[i].eq);
		    form.dose[i].val=[];
		    form.dose[i].val[0]=solveEq(form.dose[i].eq[0]);
		    form.dose[i].val[1]=solveEq(form.dose[i].eq[1]);
		    form.dose[i]=setLimit(form.dose[i]);
		}
		else{
		    form.dose[i].val=[];
		    form.dose[i].val[0]=null;
		    form.dose[i].val[1]=null;
		}
	    }
	}
	return form;

	function isolateRange(form, patient){
	    var min=0;
	    var max=0;
	    var type="";
	    if(patient.age.y===null && patient.age.m===null && patient.age.d===null){
		return null;
	    }
	    var pDays=patient.age.y*365+patient.age.m*30+patient.age.d;
	    for(var i=0; i<form.range.length; i++){
		if(form.range[i].hasOwnProperty("min")){
		    if(form.range[i].min.indexOf("kg")!=-1){
			min=form.range[i].min.slice(0, str.indexOf("kg"));
			type="wt";
		    }
		    else{
			min=strToDays(form.range[i].min);
			type="age";
		    }
		}
		else{
		    min=0;
		}
		if(form.range[i].hasOwnProperty("max")){
		    if(form.range[i].max.indexOf("kg")!=-1){
			max=form.range[i].max.slice(0, str.indexOf("kg"));
			type="wt";
		    }
		    else{
			max=strToDays(form.range[i].max);
			type="age";
		    }
		}
		else{
		    max=Infinity;
		}
		if(type=="wt"){
		    if(patient.wt>=min && patient.wt<max){
			return form.range[i];
		    }
		}
		else if(type=="age"){
		    if(pDays>=min && pDays<max){
			return form.range[i];
		    }
		}
	    }
	    return null;

	    function strToDays(str){
		var age={y: 0, m: 0, d: 0};
		var days=0;
		str=str.replace(/\s+/g, "");
		if(str.indexOf("y")!=-1){
		    age.y=str.slice(0, str.indexOf("y"));
		    str=str.slice(str.indexOf("y", -1));
		}
		if(str.indexOf("m")!=-1){
		    age.m=str.slice(0, str.indexOf("m"));
		    str=str.slice(str.indexOf("m", -1));
		}
		if(str.indexOf("d")!=-1){
		    age.d=str.slice(0, str.indexOf("d"));
		    str=str.slice(str.indexOf("d", -1));
		}
		days=age.y*365+age.m*30+age.d;
		return days;
	    }
	}

	function findApprox(arr){
	    var ret=[];
	    arr[0]=arr[0]/2;
	    for(var i=1; i<arr.length; i++){
		arr[i]=solveEq(arr[i]);
		ret[i-1]=Math.round(arr[i]/arr[0])/2;
	    }
	    if(!ret[0] || (ret[0]==ret[1])){
		ret[0]=ret[1];
		ret[1]=null;
	    }
	    return ret;
	}

	function solveEq(str){
	    var bw=parseFloat(patient.wt);
	    var ageY=patient.age.y;
	    var ageM=ageY*12+patient.age.m;
	    var ageD=ageM*30+patient.age.d;
	    var ret=eval(str);
	    ret=Math.round(ret*100)/100;
	    return ret;
	}

	function setLimit(dose){
	    if(dose.adult && dose.val){
		if(dose.val[0]>dose.adult[0]){
		    dose.val[0]=dose.adult[0];
		}
		if(dose.val[1]>dose.adult[1]){
		    dose.val[1]=dose.adult[1];
		}
	    }
	    if(dose.limit && dose.val){
		if(dose.val[0]>dose.limit[0]){
		    dose.val[0]=dose.limit[0];
		}
		if(dose.val[1]>dose.limit[1]){
		    dose.val[1]=dose.limit[1];
		}
	    }
	    if(dose.val[1]==dose.val[0]){
		dose.val[1]=null;
	    }
	    return dose;
	}
    }
}
