import React from 'react';
import Input from '../atoms/input';
import Button from '../atoms/button';

interface TodoInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  onCheckedAll: () => void;
}

const TodoInput = ({
  value,
  onCheckedAll,
  onChange,
  onSubmit,
}: TodoInputProps) => {
  return (
    <div>
      <Button variant="primary" onClick={onCheckedAll}>
        완료 ˖◛⁺˖
      </Button>
      <Input
        type="text"
        placeholder="오늘의 퀘스트는 무엇인가요?"
        value={value}
        onChange={onChange}
      />
      <Button
        variant="submit"
        onClick={onSubmit}
        className="w-[50px] h-10 bg-primary-green m-3 rounded-sm"
      >
        심기
      </Button>
    </div>
  );
};

export default TodoInput;
