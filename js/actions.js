//actions
var jQT = new $.jQTouch({
	themeSelectionSelector: '#jqt'
});

$(function(){
     $('#archivos .individual li').tap(function(){
		 if($(this).index()==0){
		      leerArchivos();
		 }else{
			 escribirArchivos($('#aEscribir').val());
		 }
	 });
	 
	 $('#ncEnv').tap(function (){
		  nuevoContacto($('#ncNom').val(),$('#ncTel').val(),$('#ncMail').val());
	 });
});

function leerArchivos(){
    document.addEventListener("deviceready", onDeviceReady, false);

    // device APIs are available
    //
    function onDeviceReady() {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
    }

    function gotFS(fileSystem) {
		alert(1);
        fileSystem.root.getFile("readme.txt", null, gotFileEntry, fail);
    }

    function gotFileEntry(fileEntry) {
		alert(2);
        fileEntry.file(readAsText, fail);//llamam a readAsText
    }


    function readAsText(file) {
		alert(3);
        var reader = new FileReader();
        reader.onloadend = function(evt) { //contiene el evento cuando termino de cargar el archivo
          	$('#aLeer').text(evt.target.result); //el resultado es el texto leido
        };
       alert(reader.readAsText(file));
    }

    function fail(evt) {
       alert(evt.target.error.code);
    }	
}


function escribirArchivos(texto){
	   document.addEventListener("deviceready", onDeviceReady, false);

    // device APIs are available
    //
    function onDeviceReady() {
		alert(1);
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
    }

    function gotFS(fileSystem) {
		alert(2);
        fileSystem.root.getFile("readme.txt", {create: true, exclusive: false}, gotFileEntry, fail);
    }

    function gotFileEntry(fileEntry) {
		alert(3);
        fileEntry.createWriter(gotFileWriter, fail);
    }

    function gotFileWriter(writer) {
		alert(4);
        writer.onwriteend = function(evt) {
         
                navigator.notification.alert('Escrito satisfactorio', null, 'Escribir', 'Aceptar');
                             
        };
        writer.write(texto);
    }

    function fail(error) {
        alert(error.code);
    }
	}

function nuevoContacto(nom,tel,mail){
    document.addEventListener("devideready",function(){
		 var contacto = navigator.contacts.create();
		 contacto.displayname = nom;//solo funciona en IOS o android
		 contacto.nickname = nom;//solo funciona en IOS o android
		 var nombre = new ContactName();
		 nombre.givenName = nom;
		 nombre.familyName = 'Prueba';
		 contacto.name = nombre; //se creo el objeto name
		 
		 var telefonos = [];
		 telefonos[0] = new ContactField("home", tel, true);
		 telefonos[1] = new ContactField("office", '123-456-7890', false);
		 contacto.phoneNumbers = telefonos; //se creo un arreglo de objetos telefonos
		 
		 var correos = [];
		 correos[0] = new ContactField("home", mail, false);
		 correos[1] = new ContactField("office", 'ejemplo@cenet.mx', true);
		 contacto.emails = correos;//se creo un arreglo de objetos correos
		 
		 contacto.save(function (){ //funcion para guardar los contactos
			 navigator.notification.alert("Contacto Guardado Satisfactoriamente", function(){
				 window.history.back();
			 },"Crear Contacto","Aceptar");
		 }, function(err){
			alert(err.code); 
		 }); 
	},false);
}