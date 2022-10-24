import { registerSettings } from "./settings.js"

function createImgElement(imgSrc: string): HTMLImageElement {
  const img: HTMLImageElement = document.createElement("img");
  const size = game.settings.get('simply-portraits', 'size')
  img.src = imgSrc;
  img.width = size;
  img.height = size;
  img.classList.add('simply-portraits');
  return img;
}

function createVideoElement(videoSrc: string): HTMLVideoElement {
  const video = document.createElement('video');
  const size = game.settings.get('simply-portraits', 'size')
  video.src = videoSrc;
  video.width = size;
  video.height = size;
  video.autoplay = false;
  video.controls = false;
  video.muted = true;
  video.classList.add('simply-portraits');
  return video;
}

function isVideo(imgSrc: string): boolean {
  const re = /(?:\.([^.]+))?$/;
  const ext = re.exec(imgSrc)?.[1];
  return ext === "webm";
}

function getTokenSrc(message: ChatMessage): string | null {
  const speaker = message.speaker;
  const scene = game.scenes.get(speaker.scene);
  const token = scene.tokens.get(speaker.token);
  return token?.texture?.src;
}

Hooks.on("init", registerSettings)

Hooks.on(
  "preCreateChatMessage",
  (message: ChatMessage, options: any, render: any, userId: string) => {
    const src = getTokenSrc(message);
    if (src)
      message.updateSource({
        flags: {
          'simply-portraits': {
            src: src
          }
        }
      });
  }
);

Hooks.on(
  "renderChatMessage", (message, html, data) => {
    const header = html.find('.message-header')?.[0];
    const src = message.flags?.['simply-portraits']?.src;

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
);
