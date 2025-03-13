 // Función que manejará la respuesta JSONP de la hoja de cálculo
 function handleResponse(data) {
  const thead = document.getElementById("tabla-encabezado");
  const tbody = document.getElementById("tabla-datos");
  // Limpiar contenido previo
  thead.innerHTML = "";
  tbody.innerHTML = "";
  
  if (Array.isArray(data) && data.length > 0) {
    // La primera fila se asume que son los encabezados
    const headerRow = document.createElement("tr");
    data[0].forEach(headerText => {
      const th = document.createElement("th");
      th.textContent = headerText;
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);

    // Crear las filas de datos
    data.slice(1).forEach(row => {
      const tr = document.createElement("tr");
      row.forEach(cell => {
        const td = document.createElement("td");
        td.textContent = cell;
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
  } else {
    tbody.innerHTML = "<tr><td colspan='100%'>No se encontraron datos</td></tr>";
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  const filtro = urlParams.get("filtro");
  
  // Actualizar título si se envía un filtro
  if (filtro) {
    document.getElementById("tittle").innerText = `Reportes ${filtro}`;
  }
  
  // Si se provee un "id", se busca en el JSON el enlace del PDF y se carga en el iframe
  if (id) {
    try {
      const response = await fetch("../listado.json");
      const data = await response.json();
      const documento = data.listado.find(doc => doc.nombre === id);
      if (documento) {
        // Mostrar el contenedor del PDF
        document.getElementById("pdf-container").style.display = "block";
        // Convertir el enlace a modo "preview" para visualizar el PDF sin forzar descarga
        let pdfLink = documento.PDF;
        pdfLink = pdfLink.replace("/view", "/preview");
        document.getElementById("pdf-viewer").src = pdfLink;
        console.log(pdfLink,1212122112);
        
      } else {
        console.error("Documento no encontrado.");
      }
    } catch (error) {
      console.error("Error al cargar el JSON de documentos:", error);
    }
  }
  
  // Cargar la solicitud JSONP para los reportes desde la hoja de cálculo
  const scriptUrl = "https://script.google.com/macros/s/AKfycbws1-wj6AAhR0zHl0qctFsJcRefokHCdCpf5WCHmYV2KEFBGV2bE8keGhkgWhphYA_ZcQ/exec";
  let jsonpUrl = scriptUrl + "?callback=handleResponse";
  if (filtro) {
    jsonpUrl += "&filtro=" + encodeURIComponent(filtro);
  }
  console.log("JSONP URL:", jsonpUrl);
  
  const script = document.createElement("script");
  script.src = jsonpUrl;
  document.body.appendChild(script);
});