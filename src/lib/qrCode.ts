import QRCode from 'qrcode';

export function createDownloadQrSvg(url: string) {
  let svg = '';
  let renderError: Error | null | undefined;

  QRCode.toString(
    url,
    {
      type: 'svg',
      errorCorrectionLevel: 'M',
      margin: 2,
      width: 168,
      color: {
        dark: '#020617',
        light: '#ffffff',
      },
    },
    (error, result) => {
      renderError = error;
      svg = result;
    },
  );

  if (renderError) {
    throw renderError;
  }

  return svg;
}
