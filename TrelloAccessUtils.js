/*********************************
*		Trello Access Utils    	 *
*********************************/
// Get the list of boards from Trello account
function getListOfBoards(trelloApplicationKey, trelloUserToken)
{
	var urlBoards = "https://trello.com/1/members/my/boards?key="+trelloApplicationKey+"&token="+trelloUserToken;
	return httpGet(urlBoards);
}

// Get the Board Info From Trello
function getBoardInfoFromId(trelloApplicationKey, trelloUserToken, boardId)
{
	var urlBoard = "https://api.trello.com/1/board/"+boardId+"?key="+trelloApplicationKey+"&token="+trelloUserToken;
	return httpGet(urlBoard);
}

// Get the array of lists from a board
function getLists(trelloApplicationKey, trelloUserToken, boardId)
{
	var urlLists = "https://api.trello.com/1/board/"+boardId+"/lists?key="+trelloApplicationKey+"&token="+trelloUserToken;
	var lists = httpGet(urlLists);
	return lists;
}

// Get the array of cards from a list
function getCards(trelloApplicationKey, trelloUserToken, listId)
{
	var urlCards = "https://api.trello.com/1/lists/"+listId+"/cards?key="+trelloApplicationKey+"&token="+trelloUserToken;
	var cardsArray = httpGet(urlCards);
	return cardsArray;
}