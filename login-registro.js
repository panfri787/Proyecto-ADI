		

		//Funcion que rellena la barra de navegacion de la pagina.
		var rellenaCabecera = function(){
			if(localStorage.login === undefined){
                document.getElementById('listaCabecera').innerHTML=
                '<li><a href="javascript:showLoginLightbox()">Login</a></li>'+
                '<li><a href="javascript:showLightbox();">Registrarse</a></li>'
            } else {
                if(document.getElementById('nombreConectado') == undefined){
                    nombreUserReq(localStorage["login"])
                    document.getElementById('listaCabecera').innerHTML=
                    '<li class="dropdown">'+
                    '<a class="dropdown-toggle" data-toggle="dropdown" id="nombreConectado" href="#"></a>'
                    +'<ul class="dropdown-menu">'+
                    '<li><a href=usuario?login='+localStorage["login"]+'>Mi perfil</a></li>'+
                    '<li><a href="javascript:logout()">Logout</a></li>'+
                    '</li>'
                }
            }
		}

		//Muestran nombre en la cabecera
		var insertaNombre = function(){
			if(req.readyState == 4){
				if(req.status == 200){
					var usuario = JSON.parse(req.responseText)
					document.getElementById('nombreConectado').innerHTML = usuario.nombre+
					' <b class="caret"></b>'
				}
			}
		}

		var nombreUserReq = function(login) {
			req = new XMLHttpRequest();
			req.open('GET', 'api/usuarios/'+login, true)
			req.onreadystatechange = insertaNombre
			req.send()
		}		

		function logout() {
			localStorage.removeItem('login');
			window.location = "index";
		}

	    function showLightbox() {
	        document.getElementById('over').style.display='block';
	        document.getElementById('fade').style.display='block';
	        // Vacio y normalizo los campos del registro
	    	document.getElementById('inputNombre').value = '';
	    	document.getElementById('inputApellidos').value = '';
	    	document.getElementById('inputEmail').value = '';
	    	document.getElementById('inputRePassword').value = '';
	    	document.getElementById('inputRePassword2').value = '';
	    	document.getElementById('divNombre').className = 'form-group';
	    	document.getElementById('divApellidos').className = 'form-group';
	    	document.getElementById('divEmail').className = 'form-group';
	    	document.getElementById('divRePassword').className = 'form-group';
	    	document.getElementById('divRePassword2').className = 'form-group';
	    }
	    function hideRegistroLightbox() {
	        document.getElementById('over').style.display='none';
	        document.getElementById('fade').style.display='none';
	    }
	    function showLoginLightbox() {
	    	//Visualiza lightbox.
	    	document.getElementById('overLogin').style.display='block';
	    	document.getElementById('fadeLogin').style.display='block';
	    	//Vacia campos anteriores y normaliza clases.
	    	document.getElementById('inputLogin').value = '';
	    	document.getElementById('inputPassword').value = '';
	    	document.getElementById('divLogin1').className = 'form-group';
	    	document.getElementById('divPassword1').className = 'form-group';
	    }
	    function hideLoginLightbox() {
	    	document.getElementById('overLogin').style.display='none';
	    	document.getElementById('fadeLogin').style.display='none';
	    }

	    /*Mensajes de alerta para el login*/
	    var showAlert200 = function(){
	    	document.getElementById('alertLogin200').style.display="block"
	    	document.getElementById('closeAlert200').onclick = function () {
	    		document.getElementById('alertLogin200').style.display="none"
	    	}
	    }

	    var showAlert400 = function(){
	    	document.getElementById('alertaLogin400').style.display="block"
	    	document.getElementById('closeAlertaLogin').onclick = function () {
	    		document.getElementById('alertaLogin400').style.display="none"
	    	}
	    }

	    var showAlert403 = function(){
	    	document.getElementById('alertaLogin403').style.display="block"
	    	document.getElementById('closeAlerta403').onclick = function () {
	    		document.getElementById('alertaLogin403').style.display="none"
	    	}
	    }

	    /* Mensajes de alerta para el registro */
	    var showRegistroAlert201 = function() {
	    	document.getElementById('alertRegistro201').style.display = "block"
	    	document.getElementById('closeRegistroAlert201').onclick = function() 
	    	{
	    		document.getElementById('alertRegistro201').style.display = "none"
	    	}
	    }
	    // Warning de repetir password
	    var showRegistroWarning = function() {
	    	document.getElementById('alertRegistroWarning').style.display = "block"
	    	document.getElementById('closeRegistroWarning').onclick = function()
	    	{
	    		document.getElementById('alertRegistroWarning').style.display = "none"
	    	}
	    }
	    //TODO: PREGUNTAME POR ESTO VERDU Y TE COMENTO
	    var showRegistroAlert400 = function() {
	    	document.getElementById('alertRegistro400').style.display = "block"
	    	document.getElementById('closeRegistroAlert400').onclick = function()
	    	{
	    		document.getElementById('alertRegistro400').style.display = "none"
	    	}
	    }

	    document.getElementById("botonLogin").onclick=function(){
	    	var inLogin = document.getElementById('inputLogin')
	    	var inPass = document.getElementById('inputPassword')

	    	if(inLogin.value != "" && inputPassword.value != ""){
	    		req = new XMLHttpRequest();
		    	var id = document.getElementById('inputLogin').value;
		    	var pass = document.getElementById('inputPassword').value;
		    	req.open('POST', 'login', true);
		    	req.setRequestHeader('content-type', 'application/x-www-form-urlencoded')
		    	req.onreadystatechange = callbackLogin;
		    	req.send('login='+id+'&password='+pass);
	    	} else {
	    		showAlert400();
	    	}
	    }

	    document.getElementById("botonRegistro").onclick = function() {
	    	var inNombre = document.getElementById('inputNombre')
	    	var inApellidos = document.getElementById('inputApellidos')
	    	var inEmail = document.getElementById('inputEmail')
	    	var inPass = document.getElementById('inputRePassword')
	    	var inPass2 = document.getElementById('inputRePassword2')

	  		if(inputNombre.value != "" && inputApellidos.value != "" &&
	  			inputEmail.value != "" && inputRePassword.value != "" &&
	  			inputRePassword2.value != "")
	  		{
	    		var email = document.getElementById('inputEmail').value;
	    		var password = document.getElementById('inputRePassword').value;
	    		var apellidos = document.getElementById('inputApellidos').value;
	    		var nombre = document.getElementById('inputNombre').value;
	    		// TODO: ¿rol a null?
	  			req = new XMLHttpRequest();
	  			// URL: api/usuarios
	  			req.open('POST', 'usuarios', true);
	  			req.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
		    	req.onreadystatechange = callbackLogin;
		    	req.send('login=' + email + '&email=' + email + '&password=' + password + 
		    		'&apellidos=' + apellidos + '&nombre=' + nombre);
	  		}
	  		else
	  		{
	  			showRegistroAlert400();
	  		}
	    }

	    /*Controles del lightbox login*/
	    document.getElementById("inputLogin").onblur = function () {
	    	if(document.getElementById("inputLogin").value == ""){
	    		document.getElementById("divLogin1").className += " has-warning"
	    	} else {
	    		document.getElementById("divLogin1").className = "form-group"
	    	}
	    }

	    document.getElementById("inputPassword").onblur = function () {
	    	if(document.getElementById("inputPassword").value == ""){
	    		document.getElementById("divPassword1").className += " has-warning"
	    	} else {
	    		document.getElementById("divPassword1").className = "form-group"
	    	}
	    }

	    document.getElementById("inputPassword").onfocus = function () {
	    	if(document.getElementById("inputLogin").value == "") {
	    		document.getElementById("divLogin1").className += " has-warning"
	    	} else {
	    		document.getElementById("divLogin1").className = "form-group"
	    	}
	    }

	    /*Controles del lightbox registro*/
	    // onBlur == outside
	    // onFocus == inside
	    document.getElementById("inputApellidos").onfocus = function() {
	    	if(document.getElementById("inputNombre").value == "") 
	    	{
	    		document.getElementById("divNombre").className += " has-warning"
	    	}
	    	else 
	    	{
	    		document.getElementById("divNombre").className = "form-group"
	    	}
	    }

	    document.getElementById("inputEmail").onfocus = function() {
	    	// Compruebo los 2 label anteriores
	    	if(document.getElementById("inputApellidos").value == "" &&
	    		document.getElementById("inputEmail").value == "") 
	    	{
	    		document.getElementById("divApellidos").className += " has-warning"
	    		document.getElementById("divNombre").className += " has-warning"
	    	}
	    	else 
	    	{
	    		document.getElementById("divApellidos").className = "form-group"
	    		document.getElementById("divNombre").className = "form-group"
	    	}
	    }

	    document.getElementById("inputRePassword").onfocus = function() {
	    	// Compruebo los 3 label anteriores
	    	if(document.getElementById("inputNombre").value == "" &&
	    		document.getElementById("inputApellidos").value == "" &&
	    		document.getElementById("inputEmail").value == "") 
	    	{
	    		document.getElementById("divNombre").className += " has-warning"
	    		document.getElementById("divApellidos").className += " has-warning"
	    		document.getElementById("divEmail").className += " has-warning"
	    	}
	    	else 
	    	{
	    		document.getElementById("divNombre").className = "form-group"
	    		document.getElementById("divApellidos").className = "form-group"
	    		document.getElementById("divEmail").className = "form-group"
	    	}
	    }
	    
	    document.getElementById("inputRePassword2").onfocus = function() {
	    	// Compruebo los 4 label anteriores
	    	if( document.getElementById("inputNombre").value == "" &&
	    		document.getElementById("inputApellidos").value == "" &&
	    		document.getElementById("inputEmail").value == "" &&
	    		document.getElementById("inputPassword").value == "") 
	    	{
	    		document.getElementById("divNombre").className += " has-warning"
	    		document.getElementById("divApellidos").className += " has-warning"
	    		document.getElementById("divEmail").className += " has-warning"
	    		document.getElementById("divRePassword").className += " has-warning"
	    	}
	    	else 
	    	{
	    		document.getElementById("divNombre").className = "form-group"
	    		document.getElementById("divApellidos").className = "form-group"
	    		document.getElementById("divEmail").className = "form-group"
	    		document.getElementById("divRePassword").className = "form-group"
	    	}
	    }

	    document.getElementById("inputRePassword2").onblur = function() {
	    	if(document.getElementById("inputRePassword2") == "") 
	    	{
	    		document.getElementById("divRePassword2").className += " has-warning"
	    	}
	    	else {
	    		if(document.getElementById("inputRePassword").value !=
	    			document.getElementById("inputRePassword2").value) {
	    			document.getElementById("divRePassword2").className += " has-warning"
	    			showRegistroWarning();
	    		}

	    	}
	    }