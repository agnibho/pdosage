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
	<div class="panel-body">
	    <div class="col-md-6 col-md-offset-3 well">
		<form>
		    <div class="form-group"><input type="text" class="form-control text-right" id="calc-input"></div>
		    <div class="form-group"><input type="text" class="form-control text-right" id="calc-output" disabled></div>
		    <div class="form-group row">
			<div class="col-xs-3"><button type="button" class="btn btn-default btn-block calc-ac">AC</button></div>
			<div class="col-xs-3"><button type="button" class="btn btn-default btn-block calc-ce">CE</button></div>
			<div class="col-xs-3"><button type="button" class="btn btn-default btn-block calc-key">(</button></div>
			<div class="col-xs-3"><button type="button" class="btn btn-default btn-block calc-key">)</button></div>
		    </div>
		    <div class="form-group row">
			<div class="col-xs-3"><button type="button" class="btn btn-default btn-block calc-key">7</button></div>
			<div class="col-xs-3"><button type="button" class="btn btn-default btn-block calc-key">8</button></div>
			<div class="col-xs-3"><button type="button" class="btn btn-default btn-block calc-key">9</button></div>
			<div class="col-xs-3"><button type="button" class="btn btn-default btn-block calc-key">/</button></div>
		    </div>
		    <div class="form-group row">
			<div class="col-xs-3"><button type="button" class="btn btn-default btn-block calc-key">4</button></div>
			<div class="col-xs-3"><button type="button" class="btn btn-default btn-block calc-key">5</button></div>
			<div class="col-xs-3"><button type="button" class="btn btn-default btn-block calc-key">6</button></div>
			<div class="col-xs-3"><button type="button" class="btn btn-default btn-block calc-key">*</button></div>
		    </div>
		    <div class="form-group row">
			<div class="col-xs-3"><button type="button" class="btn btn-default btn-block calc-key">1</button></div>
			<div class="col-xs-3"><button type="button" class="btn btn-default btn-block calc-key">2</button></div>
			<div class="col-xs-3"><button type="button" class="btn btn-default btn-block calc-key">3</button></div>
			<div class="col-xs-3"><button type="button" class="btn btn-default btn-block calc-key">-</button></div>
		    </div>
		    <div class="form-group row">
			<div class="col-xs-3"><button type="button" class="btn btn-default btn-block calc-key">0</button></div>
			<div class="col-xs-3"><button type="button" class="btn btn-default btn-block calc-key">.</button></div>
			<div class="col-xs-3"><button type="button" class="btn btn-default btn-block calc-eq">=</button></div>
			<div class="col-xs-3"><button type="button" class="btn btn-default btn-block calc-key">+</button></div>
		    </div>
		</form>
	    </div>
	</div>
    </div>
</template>

<script>
 $(document).ready(function(){
     $(".calc-key").click(function(){
	 $("#calc-input").val($("#calc-input").val()+$(this).text());
     });
     $(".calc-ac").click(function(){
	 $("#calc-input").val("");
	 $("#calc-output").val("");
     });
     $(".calc-ce").click(function(){
	 $("#calc-input").val($("#calc-input").val().slice(0,-1));
     });
     $(".calc-eq").click(calculate);
     $("#calc-input").change(calculate);
 });
 function calculate(){
     try{
	 var result=parseFloat(eval($("#calc-input").val()));
	 if(isNaN(result)){
	     throw("Error");
	 }
	 else{
	     $("#calc-output").val(result);
	 }
     }
     catch(e){
	 $("#calc-output").val("Error");
     }
 }
 export default {
     name: "CalculatorView"
 }
</script>
