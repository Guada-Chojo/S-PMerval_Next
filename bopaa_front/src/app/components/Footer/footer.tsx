import { LanguageIcon } from "@heroicons/react/24/solid"
export const Footer = () => {
    return (
        <footer className="footer footer-center bg-white text-base-content p-4">
            <aside>
                <p>Copyright © {new Date().getFullYear()} - All right reserved by ACME Industries Ltd </p>
            </aside>
        </footer>
    )
}