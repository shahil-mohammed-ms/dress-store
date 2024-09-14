import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1 */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Company</h3>
            <ul>
              <li><a href="#" className="hover:underline">About Us</a></li>
              <li><a href="#" className="hover:underline">Careers</a></li>
              <li><a href="#" className="hover:underline">Blog</a></li>
              <li><a href="#" className="hover:underline">Contact Us</a></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Support</h3>
            <ul>
              <li><a href="#" className="hover:underline">Help Center</a></li>
              <li><a href="#" className="hover:underline">Safety Center</a></li>
              <li><a href="#" className="hover:underline">Community Guidelines</a></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Legal</h3>
            <ul>
              <li><a href="#" className="hover:underline">Privacy Policy</a></li>
              <li><a href="#" className="hover:underline">Terms of Service</a></li>
              <li><a href="#" className="hover:underline">Cookie Policy</a></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Facebook</span>
                {/* You can replace with icons */}
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  {/* Facebook SVG */}
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  {/* Twitter SVG */}
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  {/* Instagram SVG */}
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="mt-8 border-t border-gray-700 pt-6 text-center text-sm">
          <p>&copy; 2024 Your Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
