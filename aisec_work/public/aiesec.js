
var submit=document.querySelector("#sub");
var hour=60*60*1000;

setTimeout('Sub()',hour);

function Sub(){
	document.querySelector("form").submit();
}
