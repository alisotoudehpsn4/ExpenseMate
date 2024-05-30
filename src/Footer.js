import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8 px-6 text-center">
            <p>&copy; 2024 ExpenseMate. All rights reserved. by Ali Sotoudeh</p>
            <div className="mt-4 flex justify-center">
                <div className="flex items-center"> {/* Container for buttons */}
                    <a href="https://www.linkedin.com/in/ali-sotoudeh-0aaa562b9/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank" rel="noopener noreferrer" className="mr-4">
                        <FontAwesomeIcon icon={faLinkedin} className="text-xl text-blue-800 hover:text-blue-900 transition duration-300" />
                    </a>
                    
                    <a href="mailto:alisotoudehpsn4@gmail.com" className="text-xl text-blue-800 hover:text-blue-900 transition duration-300">
                        ✉️
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
