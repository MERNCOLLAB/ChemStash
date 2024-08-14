import { useState, useEffect } from "react";

const useHandleUpdateColumn = (columnItem, updateColumnContent) => {
  const [title, setTitle] = useState(columnItem.title);
  const [color, setColor] = useState(columnItem.color);

  useEffect(() => {
    setTitle(columnItem.title);
    setColor(columnItem.color);
  }, [columnItem]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleManualColorChange = (event) =>{
      setColor(event.target.value);
  }

  const handleColorChange = (updatedColor) => {
    setColor(updatedColor.hex);
  };

  const handleSubmitUpdate = (event) => {
    event.preventDefault();
    updateColumnContent(columnItem.id, title, color);
  };

  return {title, color,setColor, handleTitleChange,handleManualColorChange, handleColorChange, handleSubmitUpdate}

}

export default useHandleUpdateColumn;
