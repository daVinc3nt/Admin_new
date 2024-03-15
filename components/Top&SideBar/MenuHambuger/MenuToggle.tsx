import { motion, useCycle } from 'framer-motion';

const MenuToggle = ({ toggle1, toggle2, IconColor }: { toggle1: any, toggle2: any, IconColor:string }) => {
  const handleClick = () => {
    toggle1();
    toggle2();
  };

  return (
    <button
      onClick={handleClick}
      className="pointer-events-auto z-50 pl-3 pt-2.5"
    >
      <svg width="28" height="28" viewBox="0 0 24 24">
        <Path
          variants={{
            closed: { d: 'M 2 2.5 L 20 2.5' },
            open: { d: 'M 3 16.5 L 17 2.5' },
          }}
          color={IconColor}
        />
        <Path
          d="M 2 9.423 L 20 9.423"
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
          transition={{ duration: 0.1 }}
          color={IconColor}
        />
        <Path
          variants={{
            closed: { d: 'M 2 16.346 L 20 16.346' },
            open: { d: 'M 3 2.5 L 17 16.346' },
          }}
          color={IconColor}
        />
      </svg>
    </button>

  );
}
  const Path = (props: any) => (
    <motion.path
      fill="transparent"
      strokeWidth="2"
      stroke={props.color}
      strokeLinecap="round"
      {...props}
    />
  );
export default MenuToggle;