var WindowWidth = window.innerWidth;
if(WindowWidth<480){
	document.getElementById('viewport').content = 'width=480, user-scalable=yes';
	//document.write('<meta name="viewport" content="width=480, user-scalable=yes">');
} else{
	//document.write('<meta name="viewport" content="width=device-width, user-scalable=no">');
}