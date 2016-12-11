<!--
***********************************************************************
 * Title: PDosage
 * Description: Pediatric Dose Calculator
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
***********************************************************************
-->
<template>
    <div class="panel panel-default">
	<div class="panel-heading">
	    <h4>Patient Data</h4>
	</div>
	<div class="panel-body">
	    <form data-toggle="validator">
		<div class="row">
		    <div class="col-md-1 col-md-offset-2">
			<label>Age:</label>
		    </div>
		    <div class="col-md-6">
			<div class="form-group">
			    <div class="input-group">
				<input class="form-control" type="number" min="0" max="150" v-model.number="inAgeY" placeholder="Years" required autocomplete="off">
				<span class="input-group-addon">Y</span>
				<input class="form-control" type="number" min="0" max="11" v-model.number="inAgeM" placeholder="Months" autocomplete="off" data-error="Months must be between 0 to 11">
				<span class="input-group-addon">M</span>
				<input class="form-control" type="number" min="0" max="30" v-model.number="inAgeD" placeholder="Days" autocomplete="off"  data-error="Days must be between 0 to 30">
				<span class="input-group-addon">D</span>
			    </div>
			    <div class="help-block with-errors"></div>
			</div>
		    </div>
		</div>
		<div class="row">
		    <div class="col-md-1 col-md-offset-2">
			<label>Weight:</label>
		    </div>
		    <div class="col-md-5">
			<div class="form-group">
			    <div class="input-group">
				<input class="form-control" type="number" min="0.25" max="200" step=".01" v-model.number="inWt" placeholder="Body weight in kg" required autocomplete="off">
				<span class="input-group-addon">kg</span>
			    </div>
			    <div class="help-block with-errors"></div>
			</div>
		    </div>
		    <div class="col-md-1"><input type="reset" class="btn btn-default pull-right"></div>
		</div>
	    </form>
	</div>
    </div>
</template>

<script>
 export default {
     name:"DataInput",
     props:["patient"],
     data:function(){
	 return{
	     inWt: this.patient.wt,
	     inAgeY: this.patient.age.y,
	     inAgeM: this.patient.age.m,
	     inAgeD: this.patient.age.d
	 }
     },
     watch: {
	 inWt:function(){
	     var val=parseFloat(this.inWt);
	     if(val>=0.25 && val<=200){
		 this.patient.wt=val;
	     }
	     else{
		 this.patient.wt=null;
	     }
	 },
	 inAgeY:function(){
	     var val=parseFloat(this.inAgeY);
	     if(val>=0 && val<=150){
		 this.patient.age.y=val;
	     }
	     else{
		 this.patient.age.y=null;
	     }
	 },
	 inAgeM:function(){
	     var val=parseFloat(this.inAgeM);
	     if(val>=0 && val<=11){
		 this.patient.age.m=val;
	     }
	     else{
		 this.patient.age.m=null;
	     }
	 },
	 inAgeD:function(){
	     var val=parseFloat(this.inAgeD);
	     if(val>=0 && val<=30){
		 this.patient.age.d=val;
	     }
	     else{
		 this.patient.age.d=null;
	     }
	 }
     }
 }
</script>
