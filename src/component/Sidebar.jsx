export const DesktopSidebar = ({ components }) => {
    return (
      <div className="hidden sm:flex w-20 lg:w-24 bg-white shadow-lg flex-col items-center py-6 sticky top-0 h-screen">
        <div className="mb-8 font-bold text-lg lg:text-xl text-gray-700">
          Cerebral
        </div>
        {components.map((component) => (
          <div 
            key={component.id} 
            className={`
              w-14 h-14 lg:w-16 lg:h-16 rounded-xl mb-4 flex items-center justify-center 
              ${component.color} text-white cursor-pointer
              hover:scale-110 transition-transform
            `}
          >
            {component.icon()}
          </div>
        ))}
      </div>
    );
  };
  
  export const MobileSidebar = ({ components, isOpen, onClose }) => {
    return (
      <>
        <div className={`
          sm:hidden fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          transition duration-300 ease-in-out z-40 bg-white shadow-lg w-64 flex flex-col items-center py-6
        `}>
          <div className="mb-8 font-bold text-xl text-gray-700">
            Cerebral
          </div>
          {components.map((component) => (
            <div 
              key={component.id} 
              className="flex items-center w-full px-6 py-3 hover:bg-gray-100"
              onClick={onClose}
            >
              <div className={`
                w-12 h-12 rounded-xl flex items-center justify-center 
                ${component.color} text-white mr-4
              `}>
                {component.icon()}
              </div>
              <span className="text-gray-700 font-medium">{component.name}</span>
            </div>
          ))}
        </div>
        
        {/* Overlay for mobile sidebar */}
        {isOpen && (
          <div 
            className="sm:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={onClose}
          ></div>
        )}
      </>
    );
  };

