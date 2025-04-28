"use strict";

// Make ESLint happy.
/* global Prism, logpaste */

const baseUrl = document.location.origin;

const curlCmd = document.getElementById("curl-cmd");
if (curlCmd) {
  curlCmd.innerHTML = `
<span class="str">echo "some text I want to upload"</span> <span class="cmd">|</span> \\
  &nbsp;curl <span class="cmd">-F</span> '_=<-' <span class="url">${baseUrl}</span>`.trim();
}

const curlFileCmd = document.getElementById("curl-file-cmd");
if (curlFileCmd) {
  curlFileCmd.innerHTML =`
curl <span class="cmd">-F</span> <span class="str">"_=@/path/to/file.txt</span>" <span class="url">${baseUrl}</span>
  `.trim();
}

const jsExample = document.getElementById("js-example");
if (jsExample) {
  jsExample.innerHTML = `
<span class="cmd">&lt;</span>script src<span class="cmd">=</span><span class="str">"${baseUrl}/js/logpaste.js"</span><span class="cmd">&gt;</span><span class="cmd">&lt;/</span>script<span class="cmd">&gt;</span>
<span class="cmd">&lt;</span>script<span class="cmd">&gt;</span>
<span class="kwd">const</span> text <span class="cmd">=</span> <span class="str">"some text I want to upload"</span>;

logpaste.uploadText(text).then((id) <span class="cmd">=></span> {
&nbsp;&nbsp;console.log(<span class="str">\`uploaded to ${baseUrl}/</span>\${id}\`);
});
<span class="cmd">&lt;/</span>script<span class="cmd">&gt;</span>
    `.trim();
}

function displayResult(resultId) {
  clearError();
  clearResult();

  const resultDiv = document.getElementById("result");

  const resultUrl = `${document.location}${resultId}`;

  const header = document.createElement("h3");
  header.innerText = "Shareable link";
  resultDiv.appendChild(header);

  const anchor = document.createElement("a");
  anchor.href = `/${resultId}`;
  anchor.innerText = resultUrl;
  resultDiv.appendChild(anchor);

  resultDiv.style.visibility = "visible";
}

function clearResult() {
  const resultDiv = document.getElementById("result");
  while (resultDiv.firstChild) {
    resultDiv.removeChild(resultDiv.lastChild);
  }
  resultDiv.style.visibility = "hidden";
}

function clearError() {
  const uploadError = document.getElementById("form-upload-error");
  uploadError.innerText = " ";
  uploadError.style.visibility = "hidden";
}

function displayError(error) {
  const uploadError = document.getElementById("form-upload-error");
  uploadError.innerText = error;
  uploadError.style.visibility = "visible";
}

document.getElementById("upload").addEventListener("click", () => {
  const textToUpload = document.getElementById("upload-textarea").value;
  logpaste
    .uploadText(textToUpload)
    .then((id) => {
      displayResult(id);
    })
    .catch((error) => {
      clearResult();
      displayError(error);
    });
});
