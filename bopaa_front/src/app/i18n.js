import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        fallbackLng: "es",
        resources: {
            es: {
                translation: {
                    pie: "Participación en la bolsa",
                    pieTooltip: "Participación",
                    index: "Indice MERV",
                    copyright1: "Copyright",
                    copyright2: "Todos los derechos reservados por ",
                    lang: {
                        spanish: "Español",
                        english: "Inglés",
                    },
                    toggleChart: {
                        day: "Día",
                        month: "Mes",
                    },
                },
            },
            en: {
                translation: {
                    pie: "Participation in stock exchange",
                    pieTooltip: "Participation",
                    index: "MERV Index",
                    copyright1: "Derechos de autor",
                    copyright2: "All rights reserved by ",
                    lang: {
                        spanish: "Spanish",
                        english: "English",
                    },
                    toggleChart: {
                        day: "Day",
                        month: "Month",
                    },
                }
            }
        }
    });