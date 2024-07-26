import { Input, FormHeader, Button, FormContainer } from '../components';
import { ChromePicker } from 'react-color';
import useHandleUpdateColumn from '../hooks/board/useHandleUpdateColumn';

const UpdateColumn = ({ columnItem, updateColumn, handleDrawerClose }) => {
  const {title, color, handleTitleChange, handleManualColorChange, handleColorChange, handleSubmitUpdate} = useHandleUpdateColumn(columnItem,updateColumn);

  const inputFieldRow = (
    <>
      <Input
          label="Column Color"
          type="text"
          value={color}
          onChange={handleManualColorChange}
          placeholder="Enter preferred column color"
          validation="You can modify the column color"
      />
      <Input
          type="Text"
          label="Column Title"
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter Column Title"
          validation="Enter the column title"
      />
    </>
  )
  
  
  return (
    <div className="bg-white0 min-w-fit min-h-full p-7">
      <form onSubmit={handleSubmitUpdate}>
        <FormHeader title="Update Board Column" />
        <FormContainer gridColsClass="grid-cols-2">{inputFieldRow}</FormContainer>
      
        <div className="flex flex-col justify-center items-start mt-2">
          <ChromePicker color={color} onChangeComplete={handleColorChange} />
          <p className="mt-2 text-xs text-gray1 w-fit">Pick a shade of color for the column color</p>
        </div>
        
        <div className="flex justify-end mt-4 gap-2.5 p-2.5">
          <Button type="button" variant="secondary" onClick={handleDrawerClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Update
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateColumn;
