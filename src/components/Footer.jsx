import React from "react";
import './Footer.css';

export default function Footer() {
    return (
        <footer className="main-footer">
            <p>© {new Date().getFullYear()} Weather Wizard Made with ☀️ + 🌧️ by HAIDAR ABI HAIDAR</p>
        </footer>
    )
}