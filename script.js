// Datei erstellt von: @TadanoKun33
var htmlEditor = CodeMirror.fromTextArea(document.getElementById("html"), {
  lineNumbers: true,
  mode: "htmlmixed",
  autoCloseTags: true,
  indentUnit: 2,
  smartIndent: true
});

var cssEditor = CodeMirror.fromTextArea(document.getElementById("css"), {
  lineNumbers: true,
  mode: "css",
  indentUnit: 2,
  smartIndent: true
});

var jsEditor = CodeMirror.fromTextArea(document.getElementById("js"), {
  lineNumbers: true,
  mode: "javascript",
  indentUnit: 2,
  smartIndent: true
});

// Função para carregar códigos salvos
function loadSavedCode(event) {
  var file = event.target.files[0];
  var reader = new FileReader();
  reader.onload = function(e) {
    var content = e.target.result;
    var fileType = file.type;
    
    if (fileType === "text/html") {
      htmlEditor.setValue(content);
    } else if (fileType === "text/css") {
      cssEditor.setValue(content);
    } else if (fileType === "text/javascript") {
      jsEditor.setValue(content);
    } else {
      alert("Tipo de arquivo não suportado. Por favor, selecione um arquivo HTML, CSS ou JavaScript.");
    }
  };
  
  reader.readAsText(file);
}

// Função para executar o código
function runCode() {
  var htmlCode = htmlEditor.getValue();
  var cssCode = cssEditor.getValue();
  var jsCode = jsEditor.getValue();
  var output = document.getElementById("output");
  output.innerHTML = "";
  var iframe = document.createElement("iframe");
  output.appendChild(iframe);

  var combinedCode = `<html><head><style>${cssCode}</style></head><body>${htmlCode}<script>${jsCode}</script></body></html>`;

  iframe.contentWindow.document.open();
  iframe.contentWindow.document.write(combinedCode);
  iframe.contentWindow.document.close();
}

// Função para alternar a visibilidade das seções de código
function toggleCode(type) {
  var codeDiv = document.getElementById(type + "Code");
  if (codeDiv.style.display === "none") {
    codeDiv.style.display = "block";
  } else {
    codeDiv.style.display = "none";
  }
}

// Função para salvar o código
function saveCode() {
  var htmlCode = htmlEditor.getValue();
  var cssCode = cssEditor.getValue();
  var jsCode = jsEditor.getValue();

  var zip = new JSZip();
  zip.file("index.html", htmlCode);
  zip.file("styles.css", cssCode);
  zip.file("script.js", jsCode);

  var fileName = prompt("Digite o nome do arquivo a ser baixado (sem a extensão .zip):");
  if (fileName) {
    zip.generateAsync({ type: "blob" })
      .then(function(content) {
        saveAs(content, fileName + ".zip");
      });
  } else {
    alert("Nome do arquivo inválido. O arquivo será baixado como CodeEditor.zip.");
    zip.generateAsync({ type: "blob" })
      .then(function(content) {
        saveAs(content, "CodeEditor.zip");
      });
  }
}

// Função para limpar o código
function clearCode(type) {
  switch (type) {
    case 'html':
      htmlEditor.setValue(""); // Limpar o código HTML
      break;
    case 'css':
      cssEditor.setValue(""); // Limpar o código CSS
      break;
    case 'js':
      jsEditor.setValue(""); // Limpar o código JavaScript
      break;
    default:
      break;
  }

  // Limpar o conteúdo executado
  var output = document.getElementById("output");
  output.innerHTML = "";
}
