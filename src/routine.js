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

$(document).ready(function(){

    //Remove loader
    $(".loader").remove();
    $(".container").fadeIn();

    //Update copyright
    $(".copyright").each(function(){
	if(new Date().getFullYear()>$(this).data("start")){
	    $(this).text($(this).data("start")+"-"+new Date().getFullYear());
	}
	else{
	    $(this).text(new Date().getFullYear());
	}
    });

    //Emit input on form reset
    $("input[type='reset']").on("click", function(e){
	this.form.reset();
	$(this.form).find("input, select, textarea").each(function(){
	    this.dispatchEvent(new Event("input"));
	});
    });
    
    //Change focus after number input
    $(".jump-focus").on("input", function(){
	if($(this).val().length == $(this).prop("maxlength")){
	    var all=$("input").toArray();
	    var i=all.indexOf(this)+1;
	    $(all[i]).focus().select();
	}
    });

    //Defocus after input finished
    $(".stop-focus").on("input", function(){
	if($(this).val().length == $(this).prop("maxlength")){
	    $(this).blur();
	    var target=$($(this).data("ref"));
	    $("html, body").animate({
		scrollTop: $(target).offset().top
	    }, 1000);
	}
    });
});
