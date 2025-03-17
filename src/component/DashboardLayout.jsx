import { Menu, X } from "lucide-react";
import { COMPONENTS } from "../utils/dataConstant";
import { DesktopSidebar, MobileSidebar } from "./Sidebar";

const DashboardLayout = ({ 
    sidebarOpen, 
    toggleSidebar, 
    renderComponent, 
  }) => {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col sm:flex-row">
        {/* Mobile Menu Button */}
        <div className="sm:hidden fixed top-4 left-4 z-50">
          <button 
            onClick={toggleSidebar}
            className="bg-white p-2 rounded-lg shadow-lg"
          >
            {sidebarOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>
  
        {/* Sidebar Components */}
        <DesktopSidebar components={COMPONENTS} />
        <MobileSidebar 
          components={COMPONENTS} 
          isOpen={sidebarOpen} 
          onClose={() => toggleSidebar(false)} 
        />
  
        {/* Main Content Area */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto pt-16 sm:pt-6 lg:pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Component 1 */}
            <div className="lg:col-span-1">
              {renderComponent('component1', 1)}
            </div>
  
            {/* Component 2 - Sales Chart */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 h-full">
                <h2 className="text-xl sm:text-2xl font-bold mb-4">Component 2</h2>
                <div className="h-64 sm:h-80">
                  <canvas id="salesChart"></canvas>
                </div>
              </div>
            </div>
  
            {/* Component 3 */}
            <div className="lg:col-span-1">
              {renderComponent('component3', 3)}
            </div>
  
            {/* Component 4 */}
            <div className="lg:col-span-1">
              {renderComponent('component4', 4)}
            </div>
  
            {/* Component 5 */}
            <div className="lg:col-span-1">
              {renderComponent('component5', 5)}
            </div>
  
            {/* Component 6 */}
            <div className="md:col-span-2 lg:col-span-3">
              {renderComponent('component6', 6)}
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default DashboardLayout