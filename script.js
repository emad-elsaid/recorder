document.getElementById("start").addEventListener("click", async function(evt) {
  var stream = await navigator.mediaDevices.getDisplayMedia({
    video: {
      cursor: "always"
    },
    audio: false
  });

  record(stream)
}, false);


function record(stream) {
  var options = { mimeType: "video/webm; codecs=vp9" };
  mediaRecorder = new MediaRecorder(stream, options);
  mediaRecorder.ondataavailable = function(event) {
    if (event.data.size > 0) {
      download(event.data);
    }
  }
  mediaRecorder.start();
}

function download(recording) {
  var blob = new Blob([recording], {
    type: "video/webm"
  });
  var url = URL.createObjectURL(blob);
  var a = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none";
  a.href = url;
  a.download = "Recording.webm";
  a.click();
  window.URL.revokeObjectURL(url);
}
