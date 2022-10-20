function createImgElement(imgSrc: string): HTMLImageElement {
  const img: HTMLImageElement = document.createElement("img");
  img.src = imgSrc;
  img.classList.add('simply-portraits');
  return img;
}

function getTokenSrc(message: ChatMessage): string | null {
  const speaker = message.speaker;
  const actor = game.actors.get(speaker.actor);
  return actor?.prototypeToken?.texture?.src;
}

function isVideo(imgSrc: string): boolean {
  const re = /(?:\.([^.]+))?$/;
  const ext = re.exec(imgSrc)?.[1];
  return ext === "webm";
}

function createVideoElement(videoSrc: string): HTMLVideoElement {
  const video = document.createElement('video');
  video.src = videoSrc;
  video.autoplay = false;
  video.controls = false;
  video.muted = true;
  video.classList.add('simply-portraits');
  return video;
}

Hooks.on(
  "renderChatMessage", (message, html, data) => {
    const header = html.find('.message-header')?.[0];
    const src = getTokenSrc(message);

    if (!header || !src)
      return;

    const portrait = isVideo(src) ? createVideoElement(src) : createImgElement(src);
    header.prepend(portrait);
    header.style.paddingBottom = '3px'

    const sender = html.find('.message-sender')?.[0];
    if (!sender)
      return;
    sender.style.alignSelf = 'center';
  }
)
