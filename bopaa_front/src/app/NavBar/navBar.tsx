import { LanguageIcon } from "@heroicons/react/16/solid";
import { CheckIcon } from "@heroicons/react/16/solid";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";

export default function NavBar() {
    return (
        <div className="navbar bg-white">
            {/* <div className="flex-1">
                <a className="btn btn-ghost text-xl text-white">daisyUI</a>
            </div> */}
            <div className="flex-1 flex-row-reverse">
                <ul className="menu menu-horizontal px-1 justify-end">
                    <div className="flex-row form-control justify-end ">
                        <input type="text" placeholder="Buscar" className="input rounded-badge w-36 h-9 md:w-auto bg-white shadow-md shadow-[#2C1A1D]/25 placeholder-[#140004]" />
                        <MagnifyingGlassIcon className="size-5 text-[#140004] absolute self-center mr-3 mb-1"/>
                    </div>
                    <li>
                        <details>
                            <summary className="text-[#140004]">
                                <CurrencyDollarIcon className="size-6 text[#999999]" /> 
                                ARG
                            </summary>
                            <ul className="bg-white rounded-t-none p-2 text-[#140004] border-stone-300">
                                <li><a>ARG <CheckIcon className="size-5" /></a></li>
                                <li><a>USD</a></li>
                            </ul>
                        </details>
                    </li>
                    <li>
                        <details>
                            <summary className="text-[#140004]">
                                <LanguageIcon className="size-5 text[#999999]" />
                                Español
                            </summary>
                            <ul className="bg-white rounded-t-none p-2 text-[#140004]">
                                <li><a>Español <CheckIcon className="size-4" /></a></li>
                                <li><a>Inglés</a></li>
                            </ul>
                        </details>
                    </li>
                </ul>
            </div>
        </div>
    )
}
