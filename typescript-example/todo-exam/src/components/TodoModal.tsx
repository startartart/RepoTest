type TodoProps = {
  id: number;
  text: string;
  isChecked: boolean;
};

type TodoModalProps = {
  show: boolean;
  todo: TodoProps | null;
  handleClose: () => void;
};
export default function TodoModal({ show, todo, handleClose }: TodoModalProps) {
  return (
    <div>
      {show && (
        <div onClick={handleClose} style={{ border: '1px solid' }}>
          <h2>Modal heading</h2>
          <p>{todo?.text}</p>
        </div>
      )}
    </div>
  );
}
