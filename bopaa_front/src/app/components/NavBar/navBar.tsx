import { LanguageIcon } from "@heroicons/react/16/solid";
import { CheckIcon } from "@heroicons/react/16/solid";
import { Bars3Icon, CurrencyDollarIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useToggle } from "@/app/context/toggle.context";
import './navBar.css';
import { useTranslation } from "next-i18next";
import '@/app/i18n';
import { useState } from "react";
import { useCurrency } from "@/app/context/currency.context";

export const NavBar = () => {
    /* const { toggle } = useToggle(); */
    const {t, i18n} = useTranslation();
    const {currency, changeCurrency} = useCurrency();
    const [language, setLanguage] = useState("Español");

    /* const handleCurrencyChange = (newCurrency: string) => {
        setCurrency(newCurrency);
        if (newCurrency === "USD") {
            setConversionRate(1); // Assume 1 ARG = 1 ARG
          } else if (newCurrency === "ARG") {
            setConversionRate(1000); // Example: 1 ARG = 0.01 USD
          }
    }; */

    const handleLanguageChange = (newLanguage: string) => {
        setLanguage(newLanguage);
        if (newLanguage === 'Español') {
            i18n.changeLanguage('es');
        } else {
            i18n.changeLanguage('en');
        }
    };
    return (
        <div>
            <div className="navbar bg-white items-center">
                <div className="flex-1">
                    {/* <button className="btn btn-ghost" onClick={toggle}>
                        <Bars3Icon className="size-6 text-[#140004] "></Bars3Icon>
                    </button> */}
                    <a className="btn btn-ghost block mb-[5px] text-4xl font-bold text-[#D6002A]">
                        S&P MERVAL
                        <hr className=" w-full h-1.5 bg-[#D6002A]"></hr>
                    </a>
                </div>
                <div className="flex-1 flex-row-reverse">
                    <ul className="menu menu-horizontal px-1 justify-end">
                        <li className="">
                            <details className="hover:bg-none">
                                <summary className=" hover:bg-none text-[#140004]">
                                    <CurrencyDollarIcon className="size-6 text[#999999]" />
                                    {currency}
                                </summary>
                                <ul className="bg-white rounded-t-none p-2 text-[#140004] border-stone-300 z-10">
                                    <li>
                                        <a onClick={() => changeCurrency("USD")}>
                                            USD {currency === "USD" && <CheckIcon className="size-5" />}
                                        </a>
                                    </li>
                                    <li>
                                        <a onClick={() => changeCurrency("ARG")}>
                                            ARG {currency === "ARG" && <CheckIcon className="size-5" />}
                                        </a>                                      
                                    </li>
                                </ul>
                            </details>
                        </li>
                        <li>
                            <details>
                                <summary className="text-[#140004]">
                                    <LanguageIcon className="size-6 text[#999999]" />
                                    {language == "Español" ? t('lang.spanish') : t('lang.english')}
                                </summary>
                                <ul className="bg-white rounded-t-none p-2 text-[#140004] z-10">
                                    <li>
                                        <a onClick={() => handleLanguageChange("Español")}>
                                            {t('lang.spanish')} {language === "Español" && <CheckIcon className="size-4" />}
                                        </a>
                                    </li>
                                    <li>
                                        <a onClick={() => handleLanguageChange("Inglés")}>
                                        {t('lang.english')} {language === "Inglés" && <CheckIcon className="size-4" />}
                                        </a>
                                    </li>
                                </ul>
                            </details>
                        </li>
                    </ul>
                </div>
            </div>
            <hr className=" w-full h-2 bg-divider bg-cover"></hr>
        </div>
    )
}
