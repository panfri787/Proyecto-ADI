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
	    }
	    function hideLightbox() {
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
	    /*
	    document.getElementById("Enviar").onclick = function() {
	    	if(document.getElementById("inputNombre").value == "") {
	    		document.getElementById("divNombre").className += " has-warning";
	    	}
	    	if(document.getElementById("inputApellidos").value == "") {
	    		document.getElementById("divApellidos").className += " has-warning";
	    	}
	    	if(document.getElementById("inputEmail").value == "") {
	    		document.getElementById("divEmail").className += " has-warning";
	    	}
	    	if(document.getElementById("inputPassword").value == "") {
	    		document.getElementById("divPassword").className += " has-warning";
	    	}
	    	if(document.getElementById("inputRepeatPassword").value == "") {
	    		document.getElementById("divRePassword").className += " has-warning";
	    	}
	    }*/

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

	    /*Logica del login*/
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
	    document.getElementById("inputApellidos").onfocus = function() {
	    	if(document.getElementById("inputNombre").value == "") {
	    		document.getElementById("divNombre").className += " has-warning"
	    	}
	    	else {
	    		document.getElementById("divNombre").className = "form-group"
	    	}
	    }

	    document.getElementById("inputEmail").onfocus = function() {
	    	if(document.getElementById("inputApellidos").value == "") {
	    		document.getElementById("divApellidos").className += " has-warning"
	    	}
	    	else {
	    		document.getElementById("divApellidos").className = "form-group"
	    	}
	    }

	    //Pablo te comento esta linea porque no existen estos input en la vista y fallan cosas.
	    //Descomentalo cuando lo arregles.

	    /*document.getElementById("inputPassword2").onfocus = function() {
	    	if(document.getElementById("inputEmail").value == "") {
	    		document.getElementById("divEmail").className += " has-warning"
	    	}
	    	else {
	    		document.getElementById("divEmail").className = "form-group"
	    	}
	    }

	    document.getElementById("inputPassword2").onfocus = function() {
	    	if(document.getElementById("inputEmail").value == "") {
	    		document.getElementById("divEmail").className += " has-warning"
	    	}
	    	else {
	    		document.getElementById("divEmail").className = "form-group"
	    	}
	    }

	    document.getElementById("inputRepeatPassword").onfocus = function() {
	    	if(document.getElementById("inputPassword2").value == "") {
	    		document.getElementById("divPassword2").className += " has-warning"
	    	}
	    	else {
	    		document.getElementById("divPassword2").className = "form-group"
	    	}
	    }*/