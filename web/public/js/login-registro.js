		

		//Funcion que rellena la barra de navegacion de la pagina, segun el usuario este logeado o no.
		var rellenaCabecera = function(){
			if(localStorage.login === undefined){
                document.getElementById('listaCabecera').innerHTML=
                '<li><a href="javascript:showLoginLightbox()">Login</a></li>'+
                '<li><a href="javascript:showLightbox();">Registrarse</a></li>'
            } else {
                if(document.getElementById('nombreConectado') == undefined){
                    document.getElementById('listaCabecera').innerHTML=
                    '<li> <a data-toggle="modal" data-target="#overPeticion">Crear petición</a> </li>'+
                    '<li class="dropdown">'+
                    '<a class="dropdown-toggle" data-toggle="dropdown" id="nombreConectado" href="#"></a>'
                    +'<ul class="dropdown-menu">'+
                    '<li><a href=usuario?login='+localStorage["login"]+'>Mi perfil</a></li>'+
                    '<li><a href="javascript:logout()">Logout</a></li>'+
                    '</li>'
                    nombreUserReq(localStorage["login"])
                }
            }
		}

		//Muestra el nombre del usuario logueado en la cabecera.
		var insertaNombre = function(){
			if(req.readyState == 4){
				if(req.status == 200){
					var usuario = JSON.parse(req.responseText)
					document.getElementById('nombreConectado').innerHTML = usuario.nombre+
					' <b class="caret"></b>'
				}
			}
		}

		//Peticion GET de los datos del usuario logueado para obtener su nombre e insertarlo en la cabecera de la pagina.
		var nombreUserReq = function(login) {
			req = new XMLHttpRequest();
			req.open('GET', 'api/usuarios/'+login, true)
			req.onreadystatechange = insertaNombre;
			req.send()
		}		

		//Desloguea al usuario actualmente logueado y redirige a la pagina principal.
		function logout() {
			localStorage.removeItem('login');
			window.location = "index";
		}

		//Muestra el lightbox para registrar a un nuevo usuario.
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

	    //Oculta el lightbox para registrar a un nuevo usuario.
	    function hideRegistroLightbox() {
	        document.getElementById('over').style.display='none';
	        document.getElementById('fade').style.display='none';
	    }

	    //Muestra el lightbox para loguearse en la aplicacion.
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

	    //Oculta el lightbox para loguearse en la aplicacion.
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
	    // Error de que faltan datos
	    var showRegistroAlert400 = function() {
	    	document.getElementById('alertRegistro400').style.display = "block"
	    	document.getElementById('closeRegistroAlert400').onclick = function()
	    	{
	    		document.getElementById('alertRegistro400').style.display = "none"
	    	}
	    }

	    var showRegistroError = function() {
	    	document.getElementById('alertRegistroErrorBD').style.display = "block"
	    	document.getElementById('closeRegistroErrorBD').onclick = function()
	    	{
	    		document.getElementById('alertRegistroErrorBD').style.display = "none"
	    	}
	    }

	    var showRegistroEmailError = function() {
	    	document.getElementById('alertRegistroErrorEmail').style.display = "block"
	    	document.getElementById('closeRegistroErrorEmail').onclick = function()
	    	{
	    		document.getElementById('alertRegistroErrorEmail').style.display = "none"
	    	}
	    }

	    //Manejador para el boton enviar del lightbox de login.
	    //Envia una peticion GET al api de login con los datos del formulario.
	    document.getElementById("botonLogin").onclick=function(){
	    	var inLogin = document.getElementById('inputLogin')
	    	var inPass = document.getElementById('inputPassword')

	    	if(inLogin.value != "" && inputPassword.value != ""){
	    		req = new XMLHttpRequest();
		    	var id = document.getElementById('inputLogin').value;
		    	var pass = document.getElementById('inputPassword').value;
		    	req.open('POST', 'auth/login', true);
		    	req.setRequestHeader('content-type', 'application/x-www-form-urlencoded')
		    	req.onreadystatechange = callbackLogin;
		    	req.send('login='+id+'&password='+pass);
	    	} else {
	    		showAlert400();
	    	}
	    }

	    //Callback de la peticion anterior, que añade al localstorage los datos del usuario logueado si
	    //no se ha producido ningun error o muestra un mensaje de error en su defecto.
	    var callbackLogin = function(){
	    	if (req.readyState == 4){
	    		switch(req.status){
	    			case 200:
	    				localStorage.login = document.getElementById('inputLogin').value;
	    				hideLoginLightbox();
	    				showAlert200();
	    				window.onload();
	    				break;
	    			case 403:
	    				showAlert403();
	    				break;
	    		}
	    	}
	    }

	    //Manejador del boton enviar del lightbox registro, realiza una peticion POST al api registro,
	    //para registrar un nuevo usuario.
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
	  			//Elementos a enviar
	  			var usuario = new Object();
	  			usuario.login = document.getElementById('inputEmail').value;
	  			usuario.password = new String(document.getElementById('inputRePassword').value);
	  			usuario.nombre = document.getElementById('inputNombre').value;
	  			usuario.apellidos = document.getElementById('inputApellidos').value;
	  			usuario.email = document.getElementById('inputEmail').value;
	  			usuario.rol = 'registrado';
	  			req = new XMLHttpRequest();
	  			// URL: api/usuarios
	  			// true == asincronaon
	  			req.open('POST', 'api/usuarios', true);
	  			// Indicamos al servidor que le llegan datos en formato JSON
		    	req.setRequestHeader("Content-type", "application/json")
		    	req.onreadystatechange = callbackRegistro;
				req.send(JSON.stringify(usuario));
	  		}
	  		else
	  		{
	  			showRegistroAlert400();
	  		}
	    }

	    /*Lógica del registro*/
	    var callbackRegistro = function() {
	    	// Estado 4 -> !Completado!
	    	if(req.readyState == 4) { 
	    		if(req.status == 201) {
	    			localStorage.login = document.getElementById('inputLogin').value;
	    			hideRegistroLightbox();
	    			showRegistroAlert201();
	    			window.onload();
	    		}
	    		else {
	    			//Error de que no se han procesado bien los datos
	    			showRegistroError();
	    		}
	    	}
	    }

	    //Los siguientes manejadores cambian los colores de los input en el lightbox login,
	    //si pierden el foco y no tienen nada escrito para alertar al usuario. O los vuelven a
	    //poner normales si el usuario ha escrito algo.
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

	    //Semejante a las anteriores funciones pero con los input del lightbox registro.
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
	    	// Compruebo uno a uno
	    	if(document.getElementById("inputNombre").value == "")
	    	{
	    		document.getElementById("divNombre").className += " has-warning"
	    	}
	    	else if(document.getElementById("inputApellidos").value == "")
	    	{
	    		document.getElementById("divApellidos").className += " has-warning"
	    	}
    		// Compruebo los 2 label anteriores
	    	else if(document.getElementById("inputApellidos").value == "" &&
	    		document.getElementById("inputNombre").value == "") 
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
	    	//Si el email no es NULL y los demas SI
	    	if(document.getElementById("inputEmail").value != "" &&
	    		document.getElementById("inputApellidos").value == "" &&
	    		document.getElementById("inputNombre").value == "")
	    	{
	    		document.getElementById("divNombre").className += " has-warning"
		    	document.getElementById("divApellidos").className += " has-warning"
	    	}
	    	else 
	    	{
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
	    }
	    
	    document.getElementById("inputRePassword2").onfocus = function() {
	    	// Compruebo email+pass
	    	if(document.getElementById("inputEmail").value != "" &&
	    		document.getElementById("inputRePassword").value != "" &&
	    		document.getElementById("inputNombre").value == "" &&
	    		document.getElementById("inputApellidos").value == "")
	    	{
	    		document.getElementById("divNombre").className += " has-warning"
	    		document.getElementById("divApellidos").className += " has-warning"
	    	} 
	    	// Compruebo si el email no es NULL y los demás si
	    	else if(document.getElementById("inputEmail").value != "" &&
	    		document.getElementById("inputNombre").value == "" &&
	    		document.getElementById("inputApellidos").value == "" &&
	    		document.getElementById("inputRePassword").value == "")
	    	{
	    		document.getElementById("divNombre").className += " has-warning"
	    		document.getElementById("divApellidos").className += " has-warning"
	    		document.getElementById("divRePassword").className += " has-warning"
	    	}
	    	else 
	    	{
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
	    }

	    // Se lanza cuando pierdo el foco
	    document.getElementById("inputRePassword2").onblur = function() {
	    	if(document.getElementById("inputRePassword2").value == "") 
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

	   	// Comprobar si el login(email) ya está en uso
	   	document.getElementById("inputEmail").onchange = function() {
	   		// Compruebo los 2 label anteriores despues de escribir
	   		if(document.getElementById("inputApellidos").value == "" &&
	    		document.getElementById("inputNombre").value == "")
	    	{
	    		document.getElementById("divApellidos").className += " has-warning"
	    		document.getElementById("divNombre").className += " has-warning"
	    	}
	    	else 
	    	{
		   		var email = document.getElementById('inputEmail').value;
		   		req = new XMLHttpRequest();
		   		req.open('GET','api/loginDisponible/'+ email, true);
		   		req.onreadystatechange = callbackBusqueda;
		   		req.send();
	    	}
	   		
	   	}

	   	// Callback de busqueda del login (email)
	   	var callbackBusqueda = function() {
	   		// El servidor siempre devuelve con status 200 una cadena
   			var mensaje = req.responseText;
   			if(mensaje == "no")
   				showRegistroEmailError();
	   	}

	   	/* CREAR PETICION */

	   	// LightBox para mostrar y ocultar la petición 
	   	function showCrearPeticion() {
	   		// Muestra lightbox.
	    	document.getElementById('overLogin').style.display='block';
	    	document.getElementById('fadeLogin').style.display='block';
	   	}

	   	function hideCrearPetición() {
	   		// Oculta lightbox
	   		document.getElementById('overPeticion').style.display='none';
	        document.getElementById('fadePeticion').style.display='none';
	   	}

		




