import * as Tabs from '@radix-ui/react-tabs';
import useTodo from '../../hooks/useTodo';
const TabContent = () => {
  const { setShowTodoContent } = useTodo();
  const handleAllTabClick = () => {
    setShowTodoContent('all');
  };

  const handleCompleteTabClick = () => {
    setShowTodoContent('complete');
  };

  const handleNotCompleteTabClick = () => {
    setShowTodoContent('incomplete');
  };
  return (
    <div>
      <Tabs.Root defaultValue="all" className="w-full ">
        <Tabs.List className="flex space-x-4 mb-4">
          <Tabs.Trigger
            onClick={handleAllTabClick}
            value="all"
            className="px-4 py-2 rounded bg-gray-200 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
          >
            All
          </Tabs.Trigger>
          <Tabs.Trigger
            onClick={handleCompleteTabClick}
            value="completed"
            className="px-4 py-2 rounded bg-gray-200 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
          >
            완료
          </Tabs.Trigger>
          <Tabs.Trigger
            onClick={handleNotCompleteTabClick}
            value="incomplete"
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
