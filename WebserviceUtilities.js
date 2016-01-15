/*********************************
* 			Utility				 *
*********************************/
// Make call to Webservice
function httpGet(url)
{
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "GET", url, false );
	xmlHttp.send( null );
	return parse(xmlHttp.responseText);
}

//Change text to JSON object
function parse(data)
{
	var obj = JSON.parse(data);
	return obj;
}
