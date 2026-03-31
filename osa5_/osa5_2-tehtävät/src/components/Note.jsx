
const Note = ({ note, onDelete }) => {
  return (
    <li className="note">
      {note.name} {note.number}
      <button onClick={onDelete}>delete</button>
    </li>
  )
}

export default Note