const Checkbox = ({ checked, onChange }) => (
  <label>
    <input type="checkbox" checked={checked} onChange={onChange} />
  </label>
);

export default Checkbox;
