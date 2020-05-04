import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Hamburger from '../Hamburger/Hamburger';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { motion } from "framer-motion";
import { ulVariants, liVariants, navVariant, svgVariants } from './variants.js';
import './nav.scss';
import  Seal  from '../../resources/assets/Seal.svg';

const Nav = () => {
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(true);
  const [t] = useTranslation();
  // 0 = mobile, 1 = desktop
  const [screenBreak, setScreenBreak] = useState(0);
  const BREAK_POINT = 1024;
  const handleOnClick = () => {
    setOpen(!open);
  }

  // only update on mobile / desktop screen break
  useEffect(() => {
    const handleResize = () => {
      let updatedWidth = window.innerWidth;
      // update to desktop
      if(screenBreak === 0  && updatedWidth >= BREAK_POINT) {
        setOpen(false);
        setScreenBreak(1);
        setMobile(false);
      
      // update to mobile
      } else if (screenBreak === 1 && updatedWidth < BREAK_POINT) {
        setScreenBreak(0);
        setMobile(true);
      }
     
    }
    window.onresize = handleResize;
  },[screenBreak]);

  useEffect(() => {
    let screenWidth = window.innerWidth;
    setScreenBreak(screenWidth < BREAK_POINT ? 0 : 1);
    setMobile( screenBreak ? false : true);
  }, [screenBreak]);

  return (
    <>
    <motion.nav 
      id='nav-section'
      className='nav'
      initial={false}
      animate={mobile ? (open ? 'open' : 'closed') : 'desktop'}
    >
        <button className='hamburger' onClick={handleOnClick}>
          <Hamburger open={open}/>
        </button>
        <motion.a className='mail-icon' whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }} href="mailto:bryaument@gmail.com?subject=I saw your website, let's connect!" >
          <FontAwesomeIcon icon={faEnvelope} />
        </motion.a>
        <motion.div  variants={navVariant} className={`menu ${mobile ? (open ? 'open': 'closed') : 'desktop'}`}>
        <motion.svg  variants={svgVariants} width="90" height="110">
          <rect className='rect-nav' x="87" y="0" width="10" height="150"/>
        </motion.svg>
          <img className='seal' src={Seal} alt='seal'/>
          <motion.ul className='nav-menu-ul' variants={ulVariants}>
            {
              // return objects allow i18n items to be iterated
              t('nav.items' , { returnObjects: true }).map((key, index) => {
                for(var k in key) {
                  return(
                    <motion.li
                      variants={ liVariants }
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.99 }}
                      key={index + 1}
                      className='nav-list-item'
                    > 
                      <a href={`#${key[k].id}`} className='nav-item'>
                        {t(`${key[k].desc}`)}
                      </a>
                    </motion.li>
                  )
                }
                return null
              })
            }
          </motion.ul>
        </motion.div>
    </motion.nav>
    </>
  );
};

export default Nav; 