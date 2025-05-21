import * as Tabs from '@radix-ui/react-tabs';
import { useTodoStore } from '../../store/useTodoStore';
import { ShowContent } from '../../types/todoType';

//props 할당을 해줘야했다.. useTodo의 상태는 각 컴포넌트 호출에 있어서 매우 독립적이기에
const TabContent = () => {
  const { setShowTodoContent, showTodoContent } = useTodoStore();

  const isShowContent = (val: string): val is ShowContent => {
    return val === 'all' || val === 'complete' || val === 'incomplete';
  };
  const test = () => {
    console.log(showTodoContent);
  };

  return (
    <div>
      <Tabs.Root
        value={showTodoContent}
        onValueChange={(val) => {
          if (isShowContent(val)) {
            setShowTodoContent(val);
          }
        }}
        className="w-full"
      >
        <Tabs.List className="flex space-x-4 mb-4">
          <Tabs.Trigger
            value="all"
            onClick={test}
            className="px-4 py-2 rounded bg-gray-200 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
          >
            All
          </Tabs.Trigger>
          <Tabs.Trigger
            value="complete"
            onClick={test}
            className="px-4 py-2 rounded bg-gray-200 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
          >
            완료
          </Tabs.Trigger>
          <Tabs.Trigger
            value="incomplete"
            onClick={test}
            className="px-4 py-2 rounded bg-gray-200 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
          >
            미완료
          </Tabs.Trigger>
        </Tabs.List>
      </Tabs.Root>
    </div>
  );
};

export default TabContent;
