import { ArrowDown, Checked, Delete, UnChecked } from '../../assets/Icons';  

interface Props {
  name: string;
  size?: number;
}
// 타입 나누기 
const SvgIcon = ({ name, size = 24 }: Props) => {
  let IconSrc: string | null = null;
  
  switch (name) {
    case 'arrow_down':
      IconSrc = ArrowDown;
      break;
    case 'checked':
      IconSrc = Checked;
      break;
    case 'delete':
      IconSrc = Delete;
      break;
    case 'unchecked':
      IconSrc = UnChecked;
      break;
    default:
      IconSrc = null;
      break;
  }

  if (!IconSrc) return null;

  return (
    <img
      src={IconSrc}
      alt={name}
      width={size}
      height={size}
    />
  );
};

export const Icon = SvgIcon;
