import React from 'react';
import Button from '../atoms/button';

interface ModeSwitchProps {
  viewMode: string;
  onChange: (mode: string) => void;
}
const modes = [
  { label: '텃밭보기', value: 'farm' },
  { label: '리스트 보기', value: 'list' },
];
const ModeSwitch = ({ viewMode, onChange }: ModeSwitchProps) => {
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

export default ModeSwitch;
