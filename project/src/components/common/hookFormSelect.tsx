import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

const HookFormSelect = ({ name, label, defaultValue, errors, children, ...props }: any) => {
  const labelId = `${name}-label`;
  return (
    <FormControl {...props}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select labelId={labelId} label={label} error={errors}>
        {children}
      
      </Select>
    </FormControl>
  );
};
export default HookFormSelect;
