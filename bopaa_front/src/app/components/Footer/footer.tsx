import { LanguageIcon } from "@heroicons/react/24/solid"
import { useTranslation } from "next-i18next";

export const Footer = () => {
    const { t } = useTranslation();
    return (
        <div>
            <hr className=" w-full h-2 bg-divider bg-cover"></hr>
            <footer className="footer footer-center bg-white text-black p-4">
                <aside>
                    <div className="flex items-center">
                        <div className="">{t('copyright1')} © {new Date().getFullYear()} - {t('copyright2')}</div>
                        {' '}
                        <a href="https://github.com/Guada-Chojo" className="flex items-center">
                            <img src="/imagenes/gitHub.svg" className="size-6"></img>
                            <div>Guada-Chojo</div>
                        </a>
                    </div>
                </aside>
            </footer>
        </div>
    )
}