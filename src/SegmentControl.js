/**@jsx jsx */
import { jsx } from "@emotion/core";
import React, {
  useState,
  useCallback,
  useMemo,
  useContext,
  useEffect
} from "react";

const SegmentContext = React.createContext();

// segment Hook
export const useSegment = allowMultiSelect => {
  const [selectedSegments, setselectedSegment] = useState([]);

  const handleSegmentClick = useCallback(
    (label, value) => {
      const isSelected = !!selectedSegments.find(
        el => el.label === label && el.value === value
      );

      let newSelectedSegments;

      if (allowMultiSelect) {
        newSelectedSegments = isSelected
          ? selectedSegments.filter(
              el => el.label !== label && el.value !== value
            )
          : [...selectedSegments, { label, value }];
      } else {
        newSelectedSegments = isSelected ? [] : [{ label, value }];
      }
      setselectedSegment(newSelectedSegments);
    },
    [selectedSegments, allowMultiSelect]
  );

  return [selectedSegments, handleSegmentClick];
};

export const SegmentController = ({
  allowMultiSelect = false,
  onChange,
  children,
  ...props
}) => {
  const [selectedSegments, handleSegmentClick] = useSegment(allowMultiSelect);

  useEffect(() => {
    // call the onChange handler when selectedSegments changes
    onChange(selectedSegments);
  }, [selectedSegments, onChange]);

  const value = useMemo(
    () => ({
      handleSegmentClick,
      selectedSegments
    }),
    [selectedSegments, handleSegmentClick]
  );
  return (
    <div>
      <SegmentContext.Provider value={value} children={children} {...props} />
    </div>
  );
};

export const useSegmentCtx = () => useContext(SegmentContext);

export const SegmentButton = ({
  label,
  value,
  children,
  defaultSelect,
  disabled,
  ...props
}) => {
  const { selectedSegments, handleSegmentClick } = useSegmentCtx();

  const isSelected = !!selectedSegments.find(
    el => el.label === label && el.value === value
  );

  useEffect(() => {
    if (defaultSelect) {
      handleSegmentClick(label, value);
    }
    // eslint-disable-next-line
  }, [defaultSelect]);

  return (
    <div
      css={{
        border: 0,
        backgroundColor: disabled ? "#A9A9A9" : isSelected ? "blue" : "none",
        cursor: "pointer",
        height: "2rem",
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        pointerEvents: disabled ? "none" : null,
        ":lastChild": {
          borderRight: 0
        }
      }}
      {...props}
      onClick={() => handleSegmentClick(label, value)}
    >
      {label && label}
      {children && children}
    </div>
  );
};
