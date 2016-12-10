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
	    <template v-for="item in favList">
		<template v-if="item">
		    <div class="panel panel-default clickable" v-on:click="launchModal(item)">
			<div class="panel-heading">
			    <div class="panel-title">{{item.name}}</div>
			</div>
			<div class="panel-body">
			    <ul class="list-group">
				<template v-for="f in item.form">
				    <template v-for="d in f.dose">
					<template v-if="f.gen && d.val[0]">
					    <li class="list-group-item">{{f.mode}} {{item.name}} <strong>{{d.val[0]}}<span v-if="d.val[1]"> - {{d.val[1]}}</span> {{d.unit}}</strong> <span v-if="d.txt">{{d.txt}}</span><span v-else>per dose</span></li>
					</template>
				    </template>
				</template>
			    </ul>
			</div>
		    </div>
		</template>
	    </template>
	</div>
    </div>
</template>

<script>
 import DrugView from "./DrugView.vue";
 export default {
     name: "QuickView",
     props: ["patient", "dosage", "favs"],
     components: {"drug-view": DrugView},
     data:function(){
	 return {
	     favList: "[]",
	     drug: "{}",
	     modalId: "drug-view-1"
	 }
     },
     computed: {
	 favList:function(){
	     var arr=[];
	     for(var i=0; i<this.favs.length; i++){
		 arr.push(this.dosage.getDrug(this.favs[i], this.patient));
	     }
	     return arr;
	 }
     },
     methods: {
	 launchModal:function(d){
	     this.drug=d;
	     $("#"+this.modalId).modal("show");
	 }
     }
 }
</script>
