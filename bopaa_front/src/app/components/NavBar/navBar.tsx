import { LanguageIcon } from "@heroicons/react/16/solid";
import { CheckIcon } from "@heroicons/react/16/solid";
import { Bars3Icon, CurrencyDollarIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { useToggle } from "@/app/context/toggle.context";
import './navBar.css';
import { useState } from "react";

export const NavBar = () => {
    const { toggle } = useToggle();
    const [currency, setCurrency] = useState("ARG");
    const [language, setLanguage] = useState("Español");

    const handleCurrencyChange = (newCurrency: string) => {
        setCurrency(newCurrency);
    };

    const handleLanguageChange = (newLanguage: string) => {
        setLanguage(newLanguage);
    };
    return (
        <div>
            <div className="navbar bg-white items-center">
                <div className="flex-1">
                    <button className="btn btn-ghost" onClick={toggle}>
                        <Bars3Icon className="size-6 text-[#140004] "></Bars3Icon>
                    </button>
                    <a className="btn btn-ghost block mb-[5px] text-4xl text-[#D6002A]">
                        S&P MERVAL
                        <hr className=" w-full h-1 bg-[#D6002A]"></hr>
                    </a>
                </div>
                <div className="flex-1 flex-row-reverse">
                    <ul className="menu menu-horizontal px-1 justify-end">
                        {/* <div className="flex-row form-control justify-end">
                            <label className="input rounded-badge flex items-center gap-2 h-9 bg-white shadow-md shadow-[#2C1A1D]/25 placeholder-[#140004] text-[#140004]">
                                <input type="text" placeholder="Buscar" className="grow" />
                                <button>
                                    <XMarkIcon className="size-5 text-[#140004] " />
                                </button>
                                <a href="">
                                    <MagnifyingGlassIcon className="size-5 text-[#140004] " />
                                </a>
                            </label>
                        </div> */}
                        <li className="">
                            <details className="hover:bg-none">
                                <summary className=" hover:bg-none text-[#140004]">
                                    <CurrencyDollarIcon className="size-6 text[#999999]" />
                                    {currency}
                                </summary>
                                <ul className="bg-white rounded-t-none p-2 text-[#140004] border-stone-300">
                                    <li>
                                        <a onClick={() => handleCurrencyChange("ARG")}>
                                            ARG {currency === "ARG" && <CheckIcon className="size-5" />}
                                        </a>
                                    </li>
                                    <li>
                                        <a onClick={() => handleCurrencyChange("USD")}>
                                            USD {currency === "USD" && <CheckIcon className="size-5" />}
                                        </a>
                                    </li>
                                </ul>
                            </details>
                        </li>
                        <li>
                            <details>
                                <summary className="text-[#140004]">
                                    <LanguageIcon className="size-6 text[#999999]" />
                                    {language}
                                </summary>
                                <ul className="bg-white rounded-t-none p-2 text-[#140004]">
                                    <li>
                                        <a onClick={() => handleLanguageChange("Español")}>
                                            Español {language === "Español" && <CheckIcon className="size-4" />}
                                        </a>
                                    </li>
                                    <li>
                                        <a onClick={() => handleLanguageChange("Inglés")}>
                                            Inglés {language === "Inglés" && <CheckIcon className="size-4" />}
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
