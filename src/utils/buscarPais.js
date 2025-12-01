import { MapAPI } from "@/plugins/api";

export async function buscarPais(nome) {
  const { data } = await MapAPI.get("/search", {
    params: {
      q: nome,
      limit: 1,
      addressdetails: 1
    }
  });

  if (!data || data.length === 0) return null;

  const item = data[0];

  const codigo = item.address.country_code.toUpperCase();

  const tradutor = new Intl.DisplayNames(["pt"], { type: "region" });

  const nomePt = tradutor.of(codigo);

  return {
    nome_original: item.display_name,
    nome_pt: nomePt,
    codigo_iso: codigo,
    lat: item.lat,
    lng: item.lon
  };
}
