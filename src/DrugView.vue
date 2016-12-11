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
    <div class="modal fade" :id="id" tabindex="-1">
	<div class="modal-dialog">
	    <div class="modal-content">
		<div class="modal-header">
		    <div @click="toggleFav" class="clickable pull-left lead" title="Toggle Favorite" style="color:gold">
			<span v-if="isFav" class="glyphicon glyphicon-star"></span>
			<span v-else class="glyphicon glyphicon-star-empty"></span>
		    </div>
		    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>
		    <h3 class="modal-title">{{drug.name}}</h3>
		</div>
		<div class="modal-body">
		    <div class="panel panel-default">
			<div class="panel-body">
			    <div class="row">
				<div class="col-sm-6">
				    <p>
					<strong>Body Weight:</strong>
					<span v-if="patient.wt!==null">{{patient.wt}} kg</span>
					<span v-else>Not provided</span>
				    </p>
				</div>
				<div class="col-sm-6">
				    <p>
					<strong>Age:</strong>
					<span v-if="patient.age.y!==null">{{patient.age.y}} years</span> <span v-if="patient.age.m!==null">{{patient.age.m}} months</span> <span v-if="patient.age.d!==null">{{patient.age.d}} days</span>
					<span v-if="patient.age.y===null && patient.age.m===null && patient.age.d===null">Not provided</span>
				    </p>
				</div>
			    </div>
			</div>
		    </div>
		    <template v-for="item in drug.form">
			<div class="panel" :class="{'panel-info': item.gen, 'panel-default': !item.gen}">
			    <div class="panel-heading">
				<div class="panel-title">
				    {{item.mode}} {{drug.name}} <span v-if="item.content">({{item.content}})</span>
				</div>
			    </div>
			    <div class="panel-body">
				<div class="table-responsive">
				    <table class="table">
					<tbody>
					    <template v-for="i in item.dose">
						<template v-if="i.val[0]">
						    <tr>
							<td class="active" rowspan="2">Dose:</td>
							<td>{{i.val[0]}}<span v-if="i.val[1]"> - {{i.val[1]}}</span> {{i.unit}}</td>
							<td><span v-if="i.txt">{{i.txt}}</span><span v-else>per dose</span></td>
						    </tr>
						    <tr>
							<td><template v-if="i.perKg && (!i.limit || i.limit[0]!=i.val[0] || i.limit[1]!=i.val[1])">
							    <template v-if="i.perKg">
								<span v-if="i.perKg[0]">( {{i.perKg[0]}}<span v-if="i.perKg[1]">-{{i.perKg[1]}}</span> {{i.unit}}/kg</span>
								<template v-if="i.adult">
								    ; Adult: {{i.adult[0]}}<span v-if="i.adult[1] && i.adult[1]!=i.adult[0]">-{{i.adult[1]}}</span> {{i.unit}}
								</template>
								<template v-if="i.limit">
								    ; Limit: {{i.limit[0]}}<span v-if="i.limit[1] && i.limit[1]!=i.limit[0]">-{{i.limit[1]}}</span> {{i.unit}}
								</template>
								)
							    </template>
							</td>
							<td><span v-if="i.comment">{{i.comment}}</span></td>
						    </tr>
						</template>
					    </template>
					</tbody>
				    </table>
				</div>
				<div class="well" v-if="item.comment">
				    {{item.comment}}
				</div>
			    </div>
			</div>
		    </template>
		    <div class="well" v-if="drug.comment">
			{{drug.comment}}
		    </div>
		</div>
		<div class="modal-footer">
		    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
		</div>
	    </div>
	</div>
    </div>
</template>

<script>
 export default {
     name: "DrugView",
     props: ["drug", "patient", "favs", "id"],
     data:function(){
	 return{
	     isFav: false
	 }
     },
     computed: {
	 isFav:function(){
	     return this.favs.indexOf(this.drug.name) != -1;
	 }
     },
     methods: {
	 toggleFav:function(){
	     if(this.isFav){
		 this.favs.splice(this.favs.indexOf(this.drug.name), 1);
	     }
	     else{
		 this.favs.push(this.drug.name);
	     }
	     localStorage.setItem("pdosage_favs", JSON.stringify(this.favs));
	 }
     }
 }
 
</script>
