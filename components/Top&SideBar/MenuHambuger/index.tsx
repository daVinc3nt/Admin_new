import { useState,useRef } from 'react'
import  MenuToggle  from './MenuToggle'
import { motion, useCycle } from 'framer-motion';

const MenuHambuger = ({ toggle}: { toggle: any}) => {
    const [isOpen, toggleOpen] = useCycle(true, false);
    const containerRef = useRef(null);
    return (
        <motion.nav
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        className={`w-full z-50 lg:hidden ${
            isOpen ? '' : 'pointer-events-none'
            }`}
        ref={containerRef}
        >
        <MenuToggle IconColor={"white"} toggle1={toggleOpen} toggle2={toggle} />
        </motion.nav>
    )
}

export default MenuHambuger
