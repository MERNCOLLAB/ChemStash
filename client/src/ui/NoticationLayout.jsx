export const NoticationLayout = ({ maker, text, title }) => {
  let action;

  if (text === '1') {
    action = 'create a task';
  } else if (text === 2) {
    action = 'deleted a task';
  } else {
    action = 'moved a task';
  }

  return (
    <div className="p-0 w-full flex flex-wrap ">
      <div className="font-semibold">{maker} </div>
      <div>{action} </div>
      <div> {title}</div>
    </div>
  );
};
