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
