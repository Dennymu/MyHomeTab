// Importing react related
import { MouseEvent, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Importing store
import { selectGlobals, setGlobals } from "../store/Globals";

// Importing others
import _ from "lodash";
import { ReactSortable } from "react-sortablejs";

const Shortcuts = () => {
  // Required
  const dispatch = useDispatch();

  // Store
  const globals = useSelector(selectGlobals);

  // State
  const [shortcuts, setShortcuts] = useState<
    { [key: string]: string; id: string }[]
  >([]);

  useEffect(() => {
    const tempShortcuts = _.cloneDeep(globals.shortcuts || []);

    if (globals.shortcuts && globals.shortcuts.length > 0) {
      globals.shortcuts.forEach((s, i) => {
        if (!s.id) {
          tempShortcuts[i].id = i.toString();
        }
      });
    }

    setShortcuts(tempShortcuts);
  }, [globals]);

  const onClickEdit = (e: MouseEvent<Element>, i: number) => {
    console.log("Shortcuts, onClickEdit");
    e.preventDefault();
    dispatch(
      setGlobals({
        shortcuts_open_modal: true,
        shortcuts_active_index: i,
        modal_type: "addEditShortcut",
      })
    );
  };

  const onClickDelete = (e: MouseEvent<Element>, i: number) => {
    console.log("Shortcuts, onClickDelete");
    e.preventDefault();
    const tempShortcuts = _.cloneDeep(globals.shortcuts || []);

    tempShortcuts.splice(i, 1);

    dispatch(setGlobals({ shortcuts: tempShortcuts }));
  };

  const renderShortcuts = () => {
    return shortcuts.map((s, i) => {
      const imgUrl = s.icon || "images/shortcut_icon.png";

      return (
        <a
          href={s.url}
          className="flex m-4 hover:pb-1 hover:mt-3 transition-all relative"
          key={i}
        >
          {globals.shortcuts_show_edit && (
            <div className="absolute -right-3 -top-3">
              <span
                className="material-symbols-outlined text-xs rounded-full bg-white text-cyan-500 drop-shadow-2xl z-10 px-1 py-0.5 mr-1 relative"
                onClick={(e) => onClickEdit(e, i)}
              >
                edit
              </span>
              <span
                className="material-symbols-outlined text-xs rounded-full bg-white text-cyan-500 shadow-2xl z-10 px-1 py-0.5 relative"
                onClick={(e) => onClickDelete(e, i)}
              >
                delete
              </span>
            </div>
          )}
          <div className="grid justify-items-center">
            <div className="flex justify-center rounded-lg overflow-hidden h-14 w-14">
              <img src={imgUrl} alt={`${s.name} logo`} className="h-14 w-14" />
            </div>
            {globals.shortcuts_show_name && (
              <div className="text-center mt-2 text-white tracking-wider drop-shadow">
                {s.name || ""}
              </div>
            )}
          </div>
        </a>
      );
    });
  };
  return (
    <div className="flex items-center fixed top-0 h-screen p-32 overflow-auto z-0">
      <ReactSortable
        list={shortcuts}
        setList={(newState) => {
          if (newState.length > 0) {
            dispatch(setGlobals({ shortcuts: [...newState] }));
          }

          setShortcuts(newState);
        }}
        className="flex w-full flex-wrap justify-center"
      >
        {renderShortcuts()}
      </ReactSortable>
    </div>
  );
};

export default Shortcuts;
