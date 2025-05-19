import React from 'react';
import Button from '../atoms/button';
import ViewMode from '../../types/viewMode';

interface ViewSwitchProps {
  viewMode: ViewMode;
  onChange: (mode: ViewMode) => void;
}
const modes: { label: string; value: ViewMode }[] = [
  { label: '텃밭보기', value: 'farm' },
  { label: '리스트 보기', value: 'list' },
];
const ViewSwitch = ({ viewMode, onChange }: ViewSwitchProps) => {
  return (
    <>
      {modes.map((mode) => (
        <Button
          key={mode.value}
          variant="toggle"
          active={viewMode === mode.value}
          onClick={() => onChange(mode.value)}
        >
          {mode.label}
        </Button>
      ))}
    </>
  );
};

export default ViewSwitch;
