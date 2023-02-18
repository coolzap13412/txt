function disableCtrlKeyCombination(e)
{
var forbiddenKeys = new Array('a', 'n', 'c', 'x', 'j' , 'w', 's');
var key;
var isCtrl;
if(window.event)
{
key = window.event.keyCode;
if(window.event.ctrlKey)
isCtrl = true;
else
isCtrl = false;
}
else
{
key = e.which;
if(e.ctrlKey)
isCtrl = true;
else
isCtrl = false;
}
if(isCtrl)
{
for(i=0; i<forbiddenKeys.length; i++)
{
if(forbiddenKeys[i].toLowerCase() == String.fromCharCode(key).toLowerCase())
{
alert('Key combination CTRL + '+String.fromCharCode(key) +' has been disabled.');
return false;
}
}
}
return true;
}