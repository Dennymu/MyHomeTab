// Importing react related
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Importing store
import { selectGlobals } from '../store/Globals';

function Shortcuts() {
  // Required
  const dispatch = useDispatch();

  // Store
  const globals = useSelector(selectGlobals);

  // State
  const [shortcuts, setShortcuts] = useState(globals.shortcuts || []);

  useEffect(() => {
    setShortcuts(globals.shortcuts);
  }, [globals]);

  const renderShortcuts = () => {
    return shortcuts.map((s, i) => {
      const imgUrl = s.icon || 'images/shortcut_icon.png';

      return (
        <a
          href={s.url}
          className="flex m-4 hover:pb-1 hover:mt-3 transition-all"
          key={i}
        >
          <div>
            <div className="flex justify-center">
              <img src={imgUrl} alt={`${s.name} logo`} className="h-14 w-14" />
            </div>
            {globals.shortcuts_show_name && (
              <div className="text-center mt-2 text-white tracking-wider drop-shadow">
                {s.name || ''}
              </div>
            )}
          </div>
        </a>
      );
    });
  };
  return (
    <div className="flex items-center fixed top-0 h-screen p-10 overflow-auto z-0">
      <div className="flex flex-wrap justify-center">{renderShortcuts()}</div>
    </div>
  );
}

export default Shortcuts;
