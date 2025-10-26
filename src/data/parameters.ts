import { IParameters } from "@/types";

export const PARAMETERS: IParameters = {
  factors: {
    frequentie: {
      label: "Frequentie van gelegenheid",
      options: [
        {
          key: "uniek",
          value: "Unieke gebeurtenis",
          description: "Bv. huwelijk, eerste kind, jubileum, ...",
          factor: 1.3,
        },
        {
          key: "terugkerend",
          value: "Terugkerend",
          description: "Bv. verjaardag, jaarlijks etentje, Kerstmis, ...",
          factor: 0.8,
        },
        {
          key: "niet_van_toepassing",
          value: "Niet van toepassing",
          factor: 1.0,
        },
      ],
    },
    relatie: {
      label: "Relatie tot persoon",
      options: [
        {
          key: "dichte_familie",
          value: "Dichte familie",
          factor: 1.5,
        },
        {
          key: "verre_familie",
          value: "Verre familie",
          factor: 1.3,
        },
        {
          key: "beste_vriend",
          value: "Beste vriend",
          factor: 1.5,
        },
        {
          key: "goede_vriend",
          value: "Goede vriend",
          factor: 1.1,
        },
        {
          key: "vriend",
          value: "Vriend",
          factor: 0.9,
        },
        {
          key: "collega",
          value: "Collega",
          factor: 0.8,
        },
        {
          key: "kennis",
          value: "Kennis",
          factor: 0.6,
        },
        {
          key: "andere",
          value: "Andere",
          factor: 0.5,
        },
        {
          key: "niet_van_toepassing",
          value: "Niet van toepassing",
          factor: 1.0,
        },
      ],
    },
    relatieduur: {
      label: "Relatieduur / Contactfrequentie",
      options: [
        {
          key: "vaak",
          value: "Zie je vaak",
          description: "Bv. dagelijks/wekelijks",
          factor: 1.2,
        },
        {
          key: "af_en_toe",
          value: "Zie je af en toe",
          description: "Bv. maandelijks",
          factor: 1.0,
        },
        {
          key: "zelden",
          value: "Zie je zelden",
          description: "Bv. jaar of langer niet gezien",
          factor: 0.8,
        },
        {
          key: "niet_van_toepassing",
          value: "Niet van toepassing",
          factor: 1.0,
        },
      ],
    },
    type_cadeau: {
      label: "Type cadeau",
      options: [
        {
          key: "gewoon_cadeau",
          value: "Gewoon cadeau",
          factor: 1.0,
        },
        {
          key: "klein_gebaar",
          value: "Klein gebaar",
          factor: 0.5,
        },
        {
          key: "niet_van_toepassing",
          value: "Niet van toepassing",
          factor: 1.0,
        },
      ],
    },
    budget: {
      label: "Financiële draagkracht",
      options: [
        {
          key: "hoog",
          value: "Ruim budget",
          factor: 1.25,
        },
        {
          key: "gemiddeld",
          value: "Gemiddeld budget",
          factor: 1.0,
        },
        {
          key: "laag",
          value: "Beperkt budget",
          factor: 0.75,
        },
        {
          key: "niet_van_toepassing",
          value: "Niet van toepassing",
          factor: 1.0,
        },
      ],
    },
    rol: {
      label: "Rol in de gelegenheid",
      options: [
        {
          key: "speciale_rol",
          value: "Speciale rol",
          description: "Bv. peter/meter, getuige, ...",
          factor: 1.5,
        },
        {
          key: "belangrijke_gast",
          value: "Belangrijke gast",
          description: "Bv. daggast, groot feest, ...",
          factor: 1.3,
        },
        {
          key: "gewone_gast",
          value: "Gewone gast",
          description: "Bv. avondgast, kleine receptie, ...",
          factor: 1.0,
        },
        {
          key: "niet_van_toepassing",
          value: "Niet van toepassing",
          factor: 1.0,
        },
      ],
    },
  },
};
