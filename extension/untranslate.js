//This function is taken from http://stackoverflow.com/a/14570614
function observeDOM(obj, callback){
	var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
	var eventListenerSupported = window.addEventListener;
	if (MutationObserver){
		// define a new observer
		var obs = new MutationObserver(function(mutations, observer){
			if (mutations[0].addedNodes.length || mutations[0].removedNodes.length){
				callback();
			}
		});
		// have the observer observe foo for changes in children
		obs.observe(obj, {childList:true, subtree:true});
	}
	else if (eventListenerSupported){
		obj.addEventListener('DOMNodeInserted', callback, false);
		obj.addEventListener('DOMNodeRemoved', callback, false);
	}
}

//This function is taken from http://stackoverflow.com/a/9496574
function getAllElementsWithAttribute(attribute){
  var matchingElements = [];
  var allElements = document.getElementsByTagName('*');
  for (var i = 0, n = allElements.length; i < n; i++)
  {
    if (allElements[i].getAttribute(attribute) !== null)
    {
      // Element exists with attribute. Add to array.
      matchingElements.push(allElements[i]);
    }
  }
  return matchingElements;
}

//This is the method that does the actual magic
function untranslateNow(){
	//We determine if the user is on an item detail page based on it having a title
	var isItemDetailPage = document.getElementsByClassName('it-ttl').length>0;
	//We get all translated elements and work from there
	var translatedElements = getAllElementsWithAttribute('data-mtdes');

	for (var i=0;i<translatedElements.length;i++){
		var currentElement = translatedElements[i];
		var untranslatedText = currentElement.getAttribute('data-mtdes').replace('<wbr />','').replace('<wbr/>','');
		if (isItemDetailPage){
			//This is a special case: we have to go up two levels so we can replace the text correctly.
			var childNodes = currentElement.parentNode.parentNode.childNodes;
			for (var j=0;j<childNodes.length;j++){
				if (childNodes[j].nodeType===3){
					childNodes[j].nodeValue=untranslatedText;
					//Let's remove the attribute so it's not processed again,
					currentElement.removeAttribute('data-mtdes');
					//and also hide the "show original title" part
					currentElement.parentNode.style.visibility='hidden';
					break; //Nothing more to be done, no possibility of <wbr> (at least that I know...)
				}
			}
		}
		else{
			//This is the normal case: we get the children and replace the first text-only node.
			//We don't break and replace the next text-only nodes with empty strings instead.
			//This is done because some item titles contain <wbr> and therefore are divided in multiple nodes.
			var childNodes = currentElement.childNodes;
			var done = false;
			for (var j=0;j<childNodes.length;j++){
				if (childNodes[j].nodeType===3){
					if (!done){
						done = true;
						childNodes[j].nodeValue=untranslatedText;
						//Let's remove the attribute so it's not processed again.
						//Also, this disables eBay's original title tooltip.
						currentElement.removeAttribute('data-mtdes');
					}
					else{
						childNodes[j].nodeValue='';
					}
				}
			}
		}
	}
}

//Run on first load
untranslateNow();

//And also run when anything in the DOM changes (for Ajax requests)
observeDOM(document, function(){ 
	untranslateNow();
});
