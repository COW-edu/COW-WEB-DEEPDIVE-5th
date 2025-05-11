import React from 'react';

interface FarmPanelProps {
  text: string;
}

const FarmPanel = (props: FarmPanelProps) => {
  return <div>{props.text}</div>;
};

export default FarmPanel;
