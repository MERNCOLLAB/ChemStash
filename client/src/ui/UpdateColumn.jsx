import { useState, useEffect } from 'react';
import { ChromePicker } from 'react-color';

const UpdateColumn = ({ columnItem, updateColumn }) => {
  const [title, setTitle] = useState(columnItem.title);
  const [color, setColor] = useState(columnItem.color);

  useEffect(() => {
    setTitle(columnItem.title);
    setColor(columnItem.color);
  }, [columnItem]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleColorChange = (updatedColor) => {
    setColor(updatedColor.hex);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateColumn(columnItem.id, title, color);
  };

  return (
    <div className="bg-white p-4">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter Title"
          className="border rounded p-2 mb-2"
        />
        <input
          type="text"
          value={color}
          onChange={(event) => setColor(event.target.value)}
          placeholder="Enter Color"
          className="border rounded p-2"
        />

        <ChromePicker color={color} onChangeComplete={handleColorChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UpdateColumn;
