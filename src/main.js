/**********************************************************************
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
 **********************************************************************/

//Icon
import "./assets/logo.png"

//CSS
import "bootstrap/dist/css/bootstrap.css";
import "./custom.css";

//JS libs
import "jquery";
import "bootstrap";
import "bootstrap-validator";

//Backend files
import Dosage from "./dosage.js";
import data from "./data.json";

//Vue Components
import Vue from "vue";
import DataInput from "./DataInput.vue";
import QuickView from "./QuickView.vue";
import ListView from "./ListView.vue";
import CalculatorView from "./CalculatorView.vue";
import AboutView from "./AboutView.vue";

//Start app
new Vue({
    el: "#app",
    components: {
	"data-input": DataInput,
	"quick-view": QuickView,
	"list-view": ListView,
	"calculator-view": CalculatorView,
	"about-view": AboutView
    },
    data: {
	patient: {age: {y:null, m:null, d:null}, wt:null},
	dosage: "",
	favs: "[]"
    },
    created:function(){
	try{
	    this.favs=JSON.parse(localStorage.getItem("pdosage_favs"));
	}
	finally{
	    if(this.favs==null){
		this.favs=["Paracetamol", "Levosalbutamol", "Domperidone", "Drotaverine", "Ranitidine"];
	    }
	}
	try{
	    loc=JSON.parse(localStorage.getItem("pdosage_data"));
	    if(loc.timestamp>data.timestamp){
		this.dosage=new Dosage(loc.dosage);
	    }
	}
	catch(e){
	    if(!this.dosage){
		this.dosage=new Dosage(data.dosage);
		localStorage.setItem("pdosage_data", JSON.stringify(data));
	    }
	}
    }
});

//Routine jobs
import "./routine.js";

//Source Map
//#sourceMappingURL=dist/bundle.js.map
