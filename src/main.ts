function createImgElement(imgSrc: string): HTMLImageElement {
  const img: HTMLImageElement = document.createElement("img");
  img.src = imgSrc;
  img.height = 36;
  img.width = 36;
  img.style.flex = "0 0 0";
  img.style.border = "none";
  img.style.marginRight = "5px";
  img.classList.add('simply-portraits-img');
  return img;
}

function getTokenSrc(message: ChatMessage): string | null {
  const speaker = message.speaker;
  if (!speaker.token)
    return null;
  const scene = game.scenes.get(speaker.scene);
  const token = scene.tokens.get(speaker.token);
  return token.texture.src;
}

Hooks.on(
  "renderChatMessage", (message, html, data) => {
    const header = html.find('.message-header')?.[0]
    const imgSrc = getTokenSrc(message);

    if (!header || !imgSrc)
      return;

    const img = createImgElement(imgSrc);
    header.prepend(img);
    header.style.paddingBottom = "3px";

    const sender = html.find('.message-sender')?.[0]
    if (!sender)
      return;
    sender.style.alignSelf = "center";
  }
)
