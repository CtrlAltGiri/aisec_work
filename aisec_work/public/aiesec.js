
var submit=document.querySelector("#sub");
var sec=1*1000
var minute=60*sec
var hour=60*minute

setTimeout('Sub()',hour);

function Sub(){
	document.querySelector("form").submit();
}