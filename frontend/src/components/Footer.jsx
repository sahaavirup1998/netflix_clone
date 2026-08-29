import React from 'react'

const Footer = () => {
  return (
    <div className="text-[#737373] md:px-10">
      <div className="py-20 flex flex-col space-y-3 text-md">
        <p className="">Developed by Avirup Saha</p>
        <p className="">Read about Netflix TV shows, movies and watch bounus videos on Tudum.com</p>
        <p className="">Netflix, the Netflix logo, and Tudum are trademarks of Netflix, Inc.</p>
        <p className="">This site is not affiliated with Netflix, Inc. or any of itsaffiliates.</p>
        <p className="">Any questions? Contact Us.</p>
        <p className="">© 2025 My Website. All rights reserved.</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-md pb-10 w-full">
        <ul className="flex flex-col space-y-3">
          <li className="">FAQ</li>
          <li className="">Investor Relation</li>
          <li className="">Privacy</li>
          <li className="">Speed test</li>
        </ul>
        <ul className="flex flex-col space-y-3">
          <li className="">Help Center</li>
          <li className="">Jobs</li>
          <li className="">Cookie Preference</li>
          <li className="">Legal Notices</li>
        </ul>
        <ul className="flex flex-col space-y-3">
          <li className="">Account</li>
          <li className="">Way to Watch</li>
          <li className="">Corporate Information</li>
          <li className="">Only on Netflix</li>
        </ul>
        <ul className="flex flex-col space-y-3">
          <li className="">Media Center</li>
          <li className="">Terms of Use</li>
          <li className="">Contact Us</li>
        </ul>
      </div>
    </div>
  );
}

export default Footer
