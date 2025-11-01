import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <div className="bg-slate-800 p-8 rounded-2xl shadow-lg max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-100 mb-4">About PetConnect</h1>
      <div className="space-y-4 text-slate-300">
        <p>
          Welcome to PetConnect, the premier online destination for connecting loving homes with pets in need of a family. Our mission is to make the process of finding, buying, and selling pets simple, safe, and enjoyable for everyone involved.
        </p>
        <p>
          We believe that every pet deserves a happy home, and every person deserves the joy a pet can bring. Our platform leverages technology to help you find pets available in your local area, complete with detailed profiles and care instructions to ensure a perfect match.
        </p>
        <p>
          Whether you're looking to add a new furry, feathery, or scaly member to your family, or you're a responsible breeder or owner looking to find a great home for your animals, PetConnect is here to help.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;