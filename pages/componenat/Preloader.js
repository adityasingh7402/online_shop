import React from 'react';

const Preloader = () => {
  return (
    <div className="preloader flex-col">
      <div className="loader"></div>
      <div className="logo logo-mob flex justify-center items-center mt-16 ml-11">
      <div className="logo w-40">
          <img src="/logopn.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Preloader;