let paintingAnimalRecorder = null;
let paintingAnimalRecordingChunks = [];

function getSupportedRecordingType() {
  const options = [
    'video/mp4;codecs=h264',
    'video/webm;codecs=vp9',
    'video/webm;codecs=vp8',
    'video/webm'
  ];

  return options.find((type) => MediaRecorder.isTypeSupported(type)) || '';
}

function setRecordingControls(isRecording, message) {
  const startButton = document.querySelector('[data-record-start]');
  const stopButton = document.querySelector('[data-record-stop]');
  const status = document.querySelector('[data-record-status]');

  if (startButton) startButton.disabled = isRecording;
  if (stopButton) stopButton.disabled = !isRecording;
  if (status) status.textContent = message;
}

function downloadRecording(blob, mimeType) {
  const extension = mimeType.includes('mp4') ? 'mp4' : 'webm';
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = `painting-animal-${Date.now()}.${extension}`;
  document.body.appendChild(link);
  link.click();
  link.remove();

  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function startPaintingAnimalRecording() {
  if (paintingAnimalRecorder && paintingAnimalRecorder.state === 'recording') {
    return;
  }

  if (!window.MediaRecorder) {
    setRecordingControls(false, 'Recording is not supported in this browser.');
    return;
  }

  const drawingCanvas = document.querySelector('canvas');

  if (!drawingCanvas || !drawingCanvas.captureStream) {
    setRecordingControls(false, 'Canvas is not ready.');
    return;
  }

  const mimeType = getSupportedRecordingType();
  const stream = drawingCanvas.captureStream(30);

  paintingAnimalRecordingChunks = [];
  paintingAnimalRecorder = new MediaRecorder(
    stream,
    mimeType ? { mimeType } : undefined
  );

  paintingAnimalRecorder.ondataavailable = (event) => {
    if (event.data && event.data.size > 0) {
      paintingAnimalRecordingChunks.push(event.data);
    }
  };

  paintingAnimalRecorder.onstop = () => {
    const blob = new Blob(paintingAnimalRecordingChunks, {
      type: paintingAnimalRecorder.mimeType || mimeType || 'video/webm'
    });

    downloadRecording(blob, blob.type);
    setRecordingControls(false, 'Saved');
    paintingAnimalRecorder = null;
    paintingAnimalRecordingChunks = [];
  };

  paintingAnimalRecorder.start();
  setRecordingControls(true, 'Recording');
}

function stopPaintingAnimalRecording() {
  if (paintingAnimalRecorder && paintingAnimalRecorder.state === 'recording') {
    paintingAnimalRecorder.stop();
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const stopButton = document.querySelector('[data-record-stop]');

  if (stopButton) stopButton.disabled = true;
});

window.addEventListener('keydown', (event) => {
  if (event.key.toLowerCase() === 'r') {
    startPaintingAnimalRecording();
  } else if (event.key.toLowerCase() === 's') {
    stopPaintingAnimalRecording();
  }
});
