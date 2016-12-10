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
	<drug-view :drug="drug" :patient="patient" :favs="favs" :id="modalId"></drug-view>
	<div class="panel-body">
	    <form>
		<input type="text" class="form-control" placeholder="Filter drugs by name" v-model="filter">
	    </form>
	</div>
	<div class="list-group">
	    <template v-for="item in bigList">
		<button type="button" class="list-group-item" v-on:click="launchModal(item)">{{item}}</button>
	    </template>
	</div>
    </div>
</template>

<script>
 import DrugView from "./DrugView.vue";
 export default {
     name: "ListView",
     props: ["patient", "dosage", "favs"],
     components: {"drug-view": DrugView},
     data:function(){
	 return{
	     filter: "",
	     drug: {},
	     modalId: "drug-view-2"
	 }
     },
     computed:{
	 bigList:function(){
	     return this.dosage.listDrugs().filter(function(val){
		 if(val.toLowerCase().indexOf(this.toLowerCase())!=-1){
		     return true;
		 }
		 else{
		     return false;
		 }
	     }, this.filter);
	 }
     },
     methods: {
	 launchModal:function(d){
	     this.drug=this.dosage.getDrug(d, this.patient);
	     $("#drug-view-2").modal("show");
	 }
     }
 }
</script>
