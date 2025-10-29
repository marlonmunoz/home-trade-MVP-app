// Simple footer placeholder

import React from "react";

const Footer = () => {
    return (
        <footer className="bg-gradient-to-t from-gray-100 to-blue-50 dark:from-gray-800 dark:to-gray-900 py-6 text-center text-gray-600 dark:text-gray-300 transition-colors">
            <p>© {new Date().getFullYear()} Home Trade Technologies. All rights reserved.</p>
        </footer>
    )
}

export default Footer;