// Simple footer placeholder

import React from "react";

const Footer = () => {
    return (
        <footer className="bg-gray-100 dark:bg-gray-800 py-6 text-center text-gray-600 dark:text-gray-300 mt-8 transition-colors">
            <p>© {new Date().getFullYear()} Home Trade Technologies. All rights reserved.</p>
        </footer>
    )
}

export default Footer;