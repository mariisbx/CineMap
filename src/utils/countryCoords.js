export const countryCoords = {
  BR: [-14.235, -51.9253],
  US: [37.0902, -95.7129],
  FR: [46.2276, 2.2137],
  JP: [36.2048, 138.2529],
  IT: [41.8719, 12.5674],
  GB: [55.3781, -3.4360],
  CA: [56.1304, -106.3468],
  KR: [35.9078, 127.7669],
  ES: [40.4637, -3.7492],
  DE: [51.1657, 10.4515],
  IN: [20.5937, 78.9629],
};

export function getCountryLatLng(code) {
  return countryCoords[code] || [0, 0];
}