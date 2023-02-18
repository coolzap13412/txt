function convertImageToBase64(imgUrl, callback) {
  const image = new Image();
  image.crossOrigin='anonymous';
  image.onload = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.height = image.naturalHeight;
    canvas.width = image.naturalWidth;
    ctx.drawImage(image, 0, 0);
    const dataUrl = canvas.toDataURL();
    callback && callback(dataUrl)
  }
  image.src = imgUrl;
}


document.querySelector('.clipboard').onclick = async function parseClipboardImageData() {
  const items = await navigator.clipboard.read()
  for (let item of items) {
    for (let type of item.types) {
      if (type.startsWith("image/")) {
        return item
          .getType(type)
          .then(blob => {
            return new Promise((resolve) => {
              const fileReader = new FileReader();
              fileReader.onload = () => {
                const srcData = fileReader.result;
                resolve(srcData);
              };
              fileReader.readAsDataURL(blob);
            })
          }).then(console.log)
      }
    }
  }
}