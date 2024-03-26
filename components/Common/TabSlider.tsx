import { useEffect, useRef, useState } from "react";

let allTabs = [
    {
      id: "home",
      name: "Tất cả",
    },
    {
      id: "blog",
      name: "Đang xử lý",
    },
  ];
  interface CustomDropdownProps {
    allTabs: any
    onSelectOption: (option: any) => void;
  }
  export const TabSlider:React.FC<CustomDropdownProps> = ({
    allTabs,
    onSelectOption,
  }) => { 
    const tabsRef = useRef<(HTMLElement | null)[]>([]);
    const [activeTabIndex, setActiveTabIndex] = useState<number | null>(null);
    const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
    const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);
  
    useEffect(() => {
      if (activeTabIndex === null) {
        return;
      }
  
      const setTabPosition = () => {
        const currentTab = tabsRef.current[activeTabIndex] as HTMLElement;
        setTabUnderlineLeft(currentTab?.offsetLeft ?? 0);
        setTabUnderlineWidth(currentTab?.clientWidth ?? 0);
      };
  
      setTabPosition();
    }, [activeTabIndex]);

    const handleSelect =(index, status) => {
        console.log(status)
        setActiveTabIndex(index)
        onSelectOption(status)
    }
  
    return (
      <div className="flew-row relative mx-auto flex h-12 rounded-3xl border border-white/40 dark:border-black/40 bg-neutral-300 dark:bg-neutral-800 px-2 backdrop-blur-sm">
        <span
          className="absolute bottom-0 top-0 -z-10 flex overflow-hidden rounded-3xl py-2 transition-all duration-300"
          style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}
        >
          <span className="h-full w-full rounded-3xl bg-gray-400/30 dark:bg-gray-200/30" />
        </span>
        {allTabs.map((tab) => {
          const isActive = activeTabIndex === tab.id;
  
          return (
            <button
              key={tab.id}
              ref={(el) => (tabsRef.current[tab.id] = el)}
              className={`${
                isActive ? `` : `hover:text-neutral-500 dark:hover:text-neutral-300`
              } my-auto cursor-pointer select-none rounded-full px-4 text-center font-medium text-black dark:text-white`}
              onClick={() => handleSelect(tab.id, tab.status)}
            >
              {tab.name}
            </button>
          );
        })}
      </div>
    );
  };