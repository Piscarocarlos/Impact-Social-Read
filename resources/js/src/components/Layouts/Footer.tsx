const Footer = () => {
    return (
        <div>
            <p className="dark:text-white-dark text-center ltr:sm:text-left rtl:sm:text-right pt-6">
            Copyright © {new Date().getFullYear()} Tous droits reservés.
            </p>
        </div>
    );
};

export default Footer;
