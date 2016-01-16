/*********************************
*		Controller  	 *
*********************************/
function process(){
	var boardArray = [];
	boardArray = getBoardArrayFromTrello(KEY, TOKEN);
	createKustomVariables(boardArray);
	exit();
}

/*********************************
*		Buils and send intent  	 *
*********************************/
function createKustomVariables (boardArray) {
	
// Constants
	var KUSTOM_ACTION = "org.kustom.action.SEND_VAR"; // Name of the setting App
	var targetComponent = "receiver"; //receiver, activity or service
	var applicationPackage = ""; // filter
	var applicationClass = ""; //filter
	var category = ""; //none, alt, browsable, cardock, deskdock, home, info, launcher, preference, selectedalt, tab or test
	var data = "";
	var mimeType = "";
	var extras = [];  // format "key:value"

// Go through Trello Object and build Extras
	var KUSTOM_ACTION_EXT_NAME = "org.kustom.action.EXT_NAME";
	// Key / value singular
	var KUSTOM_ACTION_VAR_NAME = "org.kustom.action.VAR_NAME";
	var KUSTOM_ACTION_VAR_VALUE = "org.kustom.action.VAR_VALUE";
	// Key / value multi
/* 	var KUSTOM_ACTION_VAR_NAME_ARRAY = "org.kustom.action.VAR_NAME_ARRAY";
	var KUSTOM_ACTION_VAR_VALUE_ARRAY = "org.kustom.action.VAR_VALUE_ARRAY";
 */

	// My extention
	var MSG = "MSG";	
	var varSetterName = KUSTOM_ACTION_EXT_NAME+":"+MSG;

	for (var i = 0; i < boardArray.length; i++) {			
		var boardName = boardArray[i].name;
		for (var j = 0; j < boardArray[i].lists.length; j++) {	
			var listName = boardArray[i].lists[j].name;				
			for (var k = 0; k < boardArray[i].lists[j].cards.length; k++) {
				var cardName = boardArray[i].lists[j].cards[k].name;
				if (null != cardName && cardName.length > 0) {
					var variableName =  KUSTOM_ACTION_VAR_NAME+ ":" + boardName+"_"+listName+"_"+k;
					var variableValue = KUSTOM_ACTION_VAR_VALUE+ ":" + cardName;	
					extras = [varSetterName, variableName, variableValue];
					sendIntent(KUSTOM_ACTION, targetComponent, applicationPackage, applicationClass, category, data, mimeType, extras);					
				}
			}		
		}
	}
}

/*********************************
*		Trello Board Object    	 *
*********************************/

// Get the Board Info From Trello
function getBoardArrayFromTrello (trelloApplicationKey, trelloUserToken)
{
	var boards = getArrayOfBoardsOnAccount(trelloApplicationKey, trelloUserToken);
	var lists = [];
	var cards = [];
	
	for (var i = 0; i < boards.length; i++) {
		lists = getArrayOfListsOnBoard(trelloApplicationKey, trelloUserToken, boards[i].id);	
		for (var k = 0; k < lists.length; k++) {
			cards = getArrayOfCardsOnList(trelloApplicationKey, trelloUserToken, lists[k].id);
			lists[k].cards = cards;
		}		
		boards[i].lists = lists;
	}
	return boards;
}


/*********************************
*		Trello Access Utils    	 *
*********************************/
// Get the list of boards from Trello account
function getArrayOfBoardsOnAccount(trelloApplicationKey, trelloUserToken)
{
	var urlBoards = "https://trello.com/1/members/my/boards?key="+trelloApplicationKey+"&token="+trelloUserToken;
	return httpGet(urlBoards);
}

// Get the array of lists from a board
function getArrayOfListsOnBoard(trelloApplicationKey, trelloUserToken, boardId)
{
	var urlLists = "https://api.trello.com/1/board/"+boardId+"/lists?key="+trelloApplicationKey+"&token="+trelloUserToken;
	var lists = httpGet(urlLists);
	return lists;
}

// Get the array of cards from a list
function getArrayOfCardsOnList(trelloApplicationKey, trelloUserToken, listId)
{
	var urlCards = "https://api.trello.com/1/lists/"+listId+"/cards?key="+trelloApplicationKey+"&token="+trelloUserToken;
	var cardsArray = httpGet(urlCards);
	return cardsArray;
}

// Get the Board Info From Trello
function getBoardInfoFromId(trelloApplicationKey, trelloUserToken, boardId)
{
	var urlBoard = "https://api.trello.com/1/board/"+boardId+"?key="+trelloApplicationKey+"&token="+trelloUserToken;
	return httpGet(urlBoard);
}

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

function test() {

	return  JSON.stringify(getBoardArrayFromTrello (KEY, TOKEN));
}